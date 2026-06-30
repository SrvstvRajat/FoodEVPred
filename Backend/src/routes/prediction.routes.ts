import { Router } from 'express';
import { predictSingle, predictBatch, getPredictionStatus } from '../controllers/prediction.controller';

const router = Router();

// POST /api/predict          — { sequence: "CCO" }
router.post('/', predictSingle);


router.get('/status/:jobId', getPredictionStatus);

// POST /api/predict/batch    — { sequence: ["CCO", "c1ccccc1"] }
router.post('/batch', predictBatch);

export default router;