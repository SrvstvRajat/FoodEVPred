import { Request, Response } from "express";
import nodemailer from "nodemailer";
import axios from "axios";

// ── Types ──────────────────────────────────────────────────────────────────────
interface BatchJobRequest {
  name: string;
  email: string;
}

interface PredictionResult {
  smiles: string;
  result: any;
  error?: string;
}

// ── Mailer setup ───────────────────────────────────────────────────────────────
const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

// ── Helper: extract SMILES from uploaded file ──────────────────────────────────
const extractSmiles = (buffer: Buffer, filename: string): string[] => {
  const content = buffer.toString("utf-8").trim();
  const ext = filename.split(".").pop()?.toLowerCase();

  if (ext === "fasta") {
    // Extract sequences (lines not starting with ">")
    return content
      .split("\n")
      .filter((l) => l.trim() && !l.startsWith(">"))
      .map((l) => l.trim());
  }
  if (ext === "csv") {
    // Assumes first column is SMILES, skip header row
    const lines = content.split("\n").filter((l) => l.trim());
    return lines
      .slice(1)
      .map((l) => l.split(",")[0].trim())
      .filter(Boolean);
  }
  // .txt: one SMILES per line
  return content
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
};

// ── Helper: count sequences (kept for quick validation before extraction) ──────
const countSequences = (buffer: Buffer, filename: string): number => {
  return extractSmiles(buffer, filename).length;
};

// ── Helper: run SMILES through ML service in chunks of 50 ─────────────────────
// const runPredictions = async (
//   smilesList: string[]
// ): Promise<PredictionResult[]> => {
//   const ML_URL = process.env.ML_SERVICE_URL || "http://localhost:8000";
//   const ML_TIMEOUT = parseInt(process.env.ML_TIMEOUT_MS || "30000", 10);
//   const CHUNK_SIZE = 50; // matches the existing batch endpoint limit
//   const results: PredictionResult[] = [];

//   for (let i = 0; i < smilesList.length; i += CHUNK_SIZE) {
//     const chunk = smilesList.slice(i, i + CHUNK_SIZE);
//     try {
//       const { data } = await axios.post(
//         `${ML_URL}/predict/batch`,
//         { smiles: chunk },
//         { timeout: ML_TIMEOUT * 3 }
//       );

//       // data.predictions should be an array aligned with the chunk.
//       // Adjust the key below if your ML service returns a different shape.
//       chunk.forEach((smi, idx) => {
//         results.push({
//           smiles: smi,
//           result: data.predictions?.[idx] ?? data[idx] ?? null,
//         });
//       });
//     } catch (err: any) {
//       // If a whole chunk fails, mark every SMILES in it as errored
//       chunk.forEach((smi) => {
//         results.push({
//           smiles: smi,
//           result: null,
//           error: err?.message || "Prediction failed",
//         });
//       });
//     }
//   }

//   return results;
// };

const runPredictions = async (smilesList: string[]): Promise<PredictionResult[]> => {
  const ML_URL = process.env.ML_SERVICE_URL || "http://localhost:8000";
  const ML_TIMEOUT = parseInt(process.env.ML_TIMEOUT_MS || "3000000", 10);
  const CHUNK_SIZE = 50;
  const results: PredictionResult[] = [];

  for (let i = 0; i < smilesList.length; i += CHUNK_SIZE) {
    const chunk = smilesList.slice(i, i + CHUNK_SIZE);
    try {
      const { data } = await axios.post(
        `${ML_URL}/predict/batch`,
        { smiles: chunk },
        { timeout: ML_TIMEOUT * 3 }
      );

      // Validate ML response before accepting it
      if (!data.predictions || !Array.isArray(data.predictions)) {
        throw new Error("ML service returned unexpected response shape");
      }

      chunk.forEach((smi, idx) => {
        const pred = data.predictions[idx];

        // Only accept if both required fields are present
        if (pred?.predicted_class && typeof pred?.confidence === "number") {
          results.push({ smiles: smi, result: pred });
        } else {
          results.push({ smiles: smi, result: null, error: "Incomplete prediction returned" });
        }
      });

    } catch (err: any) {
      chunk.forEach((smi) => {
        results.push({ smiles: smi, result: null, error: err.message || "Prediction failed" });
      });
    }
  }

  // If EVERY single prediction failed, don't send an email at all — throw instead
  const allFailed = results.every((r) => r.result === null);
  if (allFailed) {
    throw new Error("All predictions failed — ML pipeline returned no valid results");
  }

  return results;
};

// ── Helper: convert results array to CSV string ────────────────────────────────

// const buildResultsCsv = (results: PredictionResult[]): string => {
//   const header = ["smiles", "predicted_class", "confidence"];

//   const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;

//   const rows = results.map(({ smiles, result, error }) => [
//     escape(smiles),
//     escape(result?.predicted_class ?? error ?? "ERROR"),
//     escape(result?.confidence ?? ""),
//   ]);

//   return [header.map(escape), ...rows]
//     .map((r) => r.join(","))
//     .join("\n");
// };


const buildResultsCsv = (results: PredictionResult[]): string => {
  const header = ["smiles", "predicted_class", "confidence"];
  const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;

  // Only include rows where prediction actually succeeded
  const validResults = results.filter((r) => r.result !== null);

  const rows = validResults.map(({ smiles, result }) => [
    escape(smiles),
    escape(result!.predicted_class),
    escape(result!.confidence),
  ]);

  return [header.map(escape), ...rows]
    .map((r) => r.join(","))
    .join("\n");
};


// ── Helper: send submission confirmation to user ───────────────────────────────
const sendUserConfirmation = async (
  transporter: nodemailer.Transporter,
  toEmail: string,
  toName: string,
  filename: string,
  sequenceCount: number
) => {
  await transporter.sendMail({
    from: `"multiev" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: "multiev — Batch Job Received ✅",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:32px;border-radius:12px;">
        <div style="background:linear-gradient(135deg,#2563eb,#7c3aed);padding:24px;border-radius:8px;text-align:center;margin-bottom:24px;">
          <h1 style="color:#fff;margin:0;font-size:24px;">multiev</h1>
          <p style="color:#bfdbfe;margin:8px 0 0;">multievicity Prediction Platform</p>
        </div>

        <h2 style="color:#1e293b;">Hello ${toName},</h2>
        <p style="color:#475569;">Your batch prediction job has been <strong>successfully submitted</strong>.</p>

        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:20px 0;">
          <p style="margin:0 0 8px;color:#64748b;font-size:14px;">📄 <strong>File:</strong> ${filename}</p>
          <p style="margin:0;color:#64748b;font-size:14px;">🧬 <strong>Sequences submitted:</strong> ${sequenceCount}</p>
        </div>

        <p style="color:#475569;">Our models are now processing your sequences. You will receive another email with your prediction results (CSV file) shortly.</p>

        <p style="color:#94a3b8;font-size:13px;margin-top:32px;border-top:1px solid #e2e8f0;padding-top:16px;">
          If you did not submit this request, please ignore this email or contact us at
          <a href="mailto:bagler+multiev@iiitd.ac.in" style="color:#2563eb;">bagler+multiev@iiitd.ac.in</a>.
        </p>
      </div>
    `,
  });
};

// ── Helper: send prediction results CSV to user ────────────────────────────────
const sendUserResults = async (
  transporter: nodemailer.Transporter,
  toEmail: string,
  toName: string,
  filename: string,
  csvContent: string
) => {
  const resultFilename = filename.replace(/\.[^.]+$/, "_results.csv");

  await transporter.sendMail({
    from: `"multiev" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: "multiev — Your Batch Prediction Results Are Ready 🎉",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:32px;border-radius:12px;">
        <div style="background:linear-gradient(135deg,#2563eb,#7c3aed);padding:24px;border-radius:8px;text-align:center;margin-bottom:24px;">
          <h1 style="color:#fff;margin:0;font-size:24px;">multiev</h1>
          <p style="color:#bfdbfe;margin:8px 0 0;">multievicity Prediction Platform</p>
        </div>

        <h2 style="color:#1e293b;">Hello ${toName}, your results are ready!</h2>
        <p style="color:#475569;">
          The batch prediction for <strong>${filename}</strong> has completed.
          Please find your results attached as <strong>${resultFilename}</strong>.
        </p>

        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:20px 0;">
          <p style="margin:0;color:#64748b;font-size:14px;">
            📊 The CSV contains one row per SMILES with columns: 
            <code>smiles</code>, <code>prediction</code>, <code>confidence</code>, and <code>error</code>.
            Rows with a non-empty <code>error</code> column indicate sequences the model could not process.
          </p>
        </div>

        <p style="color:#475569;">
          If you have questions about your results, feel free to reach out.
        </p>

        <p style="color:#94a3b8;font-size:13px;margin-top:32px;border-top:1px solid #e2e8f0;padding-top:16px;">
          Contact us at
          <a href="mailto:bagler+multiev@iiitd.ac.in" style="color:#2563eb;">bagler+multiev@iiitd.ac.in</a>.
        </p>
      </div>
    `,
    attachments: [
      {
        filename: resultFilename,
        content: Buffer.from(csvContent, "utf-8"),
        contentType: "text/csv",
      },
    ],
  });
};

// ── Helper: send job notification to admin ─────────────────────────────────────
const sendAdminNotification = async (
  transporter: nodemailer.Transporter,
  userName: string,
  userEmail: string,
  filename: string,
  fileBuffer: Buffer,
  mimetype: string,
  sequenceCount: number
) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER!;

  await transporter.sendMail({
    from: `"multiev Jobs" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `[multiev] New Batch Job from ${userName}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;">
        <h2>New Batch Prediction Job</h2>
        <p><strong>Submitted by:</strong> ${userName} &lt;${userEmail}&gt;</p>
        <p><strong>File:</strong> ${filename}</p>
        <p><strong>Sequences:</strong> ${sequenceCount}</p>
        <p><strong>Submitted at:</strong> ${new Date().toISOString()}</p>
        <hr/>
        <p>The system is processing this job automatically and will email results to <a href="mailto:${userEmail}">${userEmail}</a>.</p>
      </div>
    `,
    attachments: [
      {
        filename,
        content: fileBuffer,
        contentType: mimetype,
      },
    ],
  });
};

// ── Controller ─────────────────────────────────────────────────────────────────
export const submitBatchJob = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email }: BatchJobRequest = req.body;
    console.log("Received batch job request:", {
      name,
      email,
      file: req.file?.originalname,
    });

    // ── Validation ──────────────────────────────────────────────────────────────
    if (!name || !name.trim()) {
      res.status(400).json({ success: false, message: "Full name is required." });
      return;
    }
    if (!email || !email.trim()) {
      res.status(400).json({ success: false, message: "Email address is required." });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ success: false, message: "Please provide a valid email address." });
      return;
    }
    if (!req.file) {
      res.status(400).json({ success: false, message: "Please upload a sequence file." });
      return;
    }

    const { originalname, buffer, mimetype } = req.file;
    const smilesList = extractSmiles(buffer, originalname);
    const sequenceCount = smilesList.length;

    if (sequenceCount === 0) {
      res.status(400).json({ success: false, message: "The uploaded file contains no valid sequences." });
      return;
    }
    if (sequenceCount > 50) {
      res.status(400).json({
        success: false,
        message: `Your file contains ${sequenceCount} sequences. Maximum allowed is 50 per batch job.`,
      });
      return;
    }

    const transporter = createTransporter();

    // ── Step 1: Confirm receipt + notify admin (in parallel) ───────────────────
    await Promise.all([
      sendUserConfirmation(transporter, email, name, originalname, sequenceCount),
      sendAdminNotification(transporter, name, email, originalname, buffer, mimetype, sequenceCount),
    ]);

    // ── Step 2: Respond immediately so the user isn't kept waiting ─────────────
    res.status(200).json({
      success: true,
      message: `Batch job submitted! A confirmation has been sent to ${email}. Your results will follow in a separate email once processing is complete.`,
      data: {
        filename: originalname,
        sequenceCount,
        submittedAt: new Date().toISOString(),
      },
    });

    // ── Step 3: Process predictions + email results asynchronously ─────────────
    // Fire-and-forget: runs after response is sent, errors are logged not thrown.
    (async () => {
      try {
        console.log(`[BatchJob] Starting predictions for ${sequenceCount} sequences (${originalname}) → ${email}`);
        const predictions = await runPredictions(smilesList);
        const csv = buildResultsCsv(predictions);
        await sendUserResults(transporter, email, name, originalname, csv);
        console.log(`[BatchJob] Results sent to ${email} for job: ${originalname}`);
      } catch (err) {
        console.error(`[BatchJob] Failed to process/send results for ${email} (${originalname}):`, err);
      }
    })();

  } catch (error: any) {
    console.error("Batch job error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit batch job. Please try again or contact support.",
    });
  }
};