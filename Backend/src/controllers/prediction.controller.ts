import { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { redisClient } from '../config/redis';

const ML_URL     = process.env.ML_SERVICE_URL || 'http://localhost:8000';
const ML_TIMEOUT = parseInt(process.env.ML_TIMEOUT_MS || '3000000', 10);

// ── Shared error handler ──────────────────────────────────────────────────────

function handleError(err: unknown, res: Response): void {
  if (err instanceof AxiosError) {
    if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
      res.status(503).json({ success: false, error: 'ML service unavailable.', code: 'ML_UNAVAILABLE' });
      return;
    }
    if (err.code === 'ECONNABORTED') {
      res.status(504).json({ success: false, error: 'ML service timed out.', code: 'ML_TIMEOUT' });
      return;
    }
    if (err.response) {
      // Forward FastAPI's validation errors (422) directly to the client
      res.status(err.response.status).json({
        success: false,
        error: err.response.data?.detail || 'ML service error.',
        code: 'ML_ERROR',
      });
      return;
    }
  }
  res.status(500).json({ success: false, error: 'Internal server error.', code: 'INTERNAL' });
}

// ── POST /api/predict ─────────────────────────────────────────────────────────

// export const predictSingle = async (req: Request, res: Response): Promise<void> => {
//   log('Received /api/predict request with body:', req.body);
//   const { sequence } = req.body;

//   if (!sequence || typeof sequence !== 'string' || !sequence.trim()) {
//     res.status(400).json({ success: false, error: 'Missing required field: sequence', code: 'VALIDATION_ERROR' });
//     return;
//   }

//   try {
//     const { data } = await axios.post(
//       `${ML_URL}/predict`,
//       { sequence: sequence.trim() },
//       { timeout: ML_TIMEOUT },
//     );


//     // to be removed --->
//     setTimeout(() => {    
//       res.status(200).json({ success: true, data });
//     }, 3000);
//     // res.status(200).json({ success: true, data:"Sweet" });
//   } catch (err) {
//     handleError(err, res);
//   }
// };





export const predictSingle = async (
  req: Request,
  res: Response
): Promise<void> => {

  const { sequence } = req.body;

  if (!sequence || typeof sequence !== 'string' || !sequence.trim()) {
    res.status(400).json({
      success: false,
      error: 'Missing required field: sequence'
    });
    return;
  }

  const jobId = uuidv4();

  await redisClient.set(
    `job:${jobId}`,
    JSON.stringify({
      status: 'QUEUED'
    }),
    {
      EX: 3600
    }
  );

  res.status(202).json({
    success: true,
    jobId,
    status: 'QUEUED'
  });

  void (async () => {
    try {

      await redisClient.set(
        `job:${jobId}`,
        JSON.stringify({
          status: 'RUNNING'
        }),
        {
          EX: 3600
        }
      );

      const { data } = await axios.post(
        `${ML_URL}/predict`,
        {
          sequence: sequence.trim()
        },
        {
          timeout: ML_TIMEOUT
        }
      );

      await redisClient.set(
        `job:${jobId}`,
        JSON.stringify({
          status: 'COMPLETED',
          result: data
        }),
        {
          EX: 3600
        }
      );

    } catch (error) {

      await redisClient.set(
        `job:${jobId}`,
        JSON.stringify({
          status: 'FAILED',
          error: 'Prediction failed'
        }),
        {
          EX: 3600
        }
      );
    }
  })();
};



// ── POST /api/predict/batch ───────────────────────────────────────────────────

export const predictBatch = async (req: Request, res: Response): Promise<void> => {
  const { smiles } = req.body;

  if (!Array.isArray(smiles) || smiles.length === 0) {
    res.status(400).json({ success: false, error: 'smiles must be a non-empty array.', code: 'VALIDATION_ERROR' });
    return;
  }

  if (smiles.length > 50) {
    res.status(400).json({ success: false, error: 'Max 50 SMILES per batch.', code: 'BATCH_LIMIT' });
    return;
  }

  try {
    const { data } = await axios.post(
      `${ML_URL}/predict/batch`,
      { smiles: smiles.map((s: string) => String(s).trim()) },
      { timeout: ML_TIMEOUT * 3 },   // batch gets 3× timeout
    );
    res.status(200).json({ success: true, data });
  } catch (err) {
    handleError(err, res);
  }
};

// ── GET /api/predict/status/:jobId ─────────────────────────────────────────


export const getPredictionStatus = async (
  req: Request,
  res: Response
): Promise<void> => {

  const { jobId } = req.params;
  console.log(jobId);

  const data = await redisClient.get(`job:${jobId}`);

  if (!data) {
    res.status(404).json({
      success: false,
      error: 'Job not found'
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: JSON.parse(data)
  });
};