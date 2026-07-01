# MultiEV — Food-Derived EV Protein Source Classifier

A web server for multi-class classification of food-derived extracellular vesicle (EV) cargo proteins. Given a protein sequence, MultiEV predicts whether it originates from a **Milk EV**, **Plant EV**, or **Non-EV** source.

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  Browser (React / TypeScript)  :3000                │
└────────────────────┬────────────────────────────────┘
                     │ HTTP
┌────────────────────▼────────────────────────────────┐
│  Backend (Node.js / Express / TypeScript)  :5001    │
│  Redis job queue · nodemailer · multer              │
└────────────────────┬────────────────────────────────┘
                     │ HTTP
┌────────────────────▼────────────────────────────────┐
│  ML Service (Python / FastAPI)  :8000               │
│  ProtT5-XL → RFE-256 → LR/SVM/MLP → XGBoost        │
└─────────────────────────────────────────────────────┘
```

---

## ML Pipeline

| Stage             | Detail                                                           |
| ----------------- | ---------------------------------------------------------------- |
| Embedding         | ProtT5-XL (`Rostlab/prot_t5_xl_uniref50`), mean-pooled, 1024-dim |
| Feature selection | Recursive Feature Elimination → 256 dimensions                   |
| Scaling           | StandardScaler fit on training distribution                      |
| Base learners     | Logistic Regression · SVM (RBF) · MLP                            |
| Meta-model        | XGBoost classifier                                               |
| Output classes    | `Non-EV` · `Milk-based EV` · `Plant-based EV`                    |

---

## Project Structure

```
MultiEV/
├── start.sh                     # Development launcher (this repo root)
├── Frontend/                    # React + TypeScript frontend
│   └── src/
│       ├── pages/
│       │   ├── Home.tsx
│       │   ├── Predict.tsx
│       │   ├── About.tsx
│       │   ├── HowToUse.tsx
│       │   ├── Search.tsx
│       │   ├── FAQs.tsx
│       │   └── Contact.tsx
│       └── images/
├── Backend/                     # Node.js / Express backend
│   ├── server.ts
│   ├── routes/
│   │   ├── prediction.routes.ts
│   │   └── batch.routes.ts
│   ├── controllers/
│   │   ├── prediction.controller.ts
│   │   └── batch.controller.ts
│   └── config/
│       ├── redis.ts
│       └── database.ts
└── ml_service/
    └── fastApi/
        ├── app.py               # FastAPI inference service
        ├── scaler.pkl
        ├── base_models.pkl      # {LR, SVM_RBF, MLP}
        ├── meta_model.pkl       # XGBoost
        ├── label_encoder.pkl
        ├── rfe_256_features.json
        └── meta_feature_layout.json
```

---

## Prerequisites

| Requirement       | Version     | Notes                                       |
| ----------------- | ----------- | ------------------------------------------- |
| Python            | 3.12.2      | via pyenv, virtualenv `myenv312`            |
| Node.js           | 20.x        | via nvm                                     |
| Redis             | any recent  | must be running before backend starts       |
| ProtT5-XL cache   | ~11 GB disk | downloaded on first run, cached permanently |
| GPU (recommended) | ≥6 GB VRAM  | CPU fallback works but is ~35s/sequence     |

---

## Environment Variables

### Backend (`Backend/.env`)

```env
PORT=5001
CORS_ORIGIN=http://localhost:3000

# ML service
ML_SERVICE_URL=http://localhost:8000
ML_TIMEOUT_MS=120000

# Redis
REDIS_URL=redis://localhost:6379

# Email (nodemailer — batch results)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@yourdomain.com
```

### ML Service (`ml_service/fastApi/.env`) — optional overrides

```env
# Set to true to skip ProtT5 load entirely (mock predictions for API dev/testing)
DEV_MOCK_ML=false

# Set to true once the model is cached — prevents any HF Hub network calls
HF_HUB_OFFLINE=1

# Set if pulling your own model artifacts from a private HF repo
HF_REPO_ID=
HF_TOKEN=
```

> **⚠️ `HF_HUB_OFFLINE=1` requires the model to already be cached on _that specific machine_.**
> This flag tells `transformers`/`huggingface_hub` to never make network calls — it will only
> look in the local HF cache (`~/.cache/huggingface/hub/`). It does **not** mean "the model is
> baked into the app somehow" — it means "don't go fetch it, assume it's already here."
>
> On a fresh production host that has never pulled `Rostlab/prot_t5_xl_uniref50` before, setting
> this flag will cause startup to fail (or hang) instead of downloading the model. See
> [Deployment Notes](#deployment-notes) below — **the deployment team must pre-warm the cache
> before enabling this flag**, the same way it's pre-cached on local dev machines.

---

## Running Locally

### First-time setup

**1. Clone and install dependencies**

```bash
git clone <repo-url>
cd MultiEV

# Frontend
npm install

# Backend
cd Backend && npm install && cd ..

# ML service
cd ml_service/fastApi
pip install -r requirements.txt   # inside pyenv myenv312
cd ../..
```

**2. Start Redis**

```bash
redis-server
```

**3. Download the ProtT5-XL model (first run only)**

The model (~11 GB) is downloaded automatically from Hugging Face on first startup. This only happens once — it is cached at `~/.cache/huggingface/hub/`.

To pre-download without starting the full server:

```bash
cd ml_service/fastApi
HF_HUB_DISABLE_XET=1 ~/.pyenv/versions/3.12.2/envs/myenv312/bin/python -c "
from transformers import T5Tokenizer, T5EncoderModel
T5Tokenizer.from_pretrained('Rostlab/prot_t5_xl_uniref50', do_lower_case=False)
T5EncoderModel.from_pretrained('Rostlab/prot_t5_xl_uniref50')
print('Model cached successfully.')
"
```

**4. Configure environment variables**

Copy and fill in the `.env` files described above.

**5. Launch all services**

```bash
chmod +x start.sh
./start.sh
```

All three services start in a single terminal with colour-coded log prefixes (`[ML]`, `[BE]`, `[FE]`). Press `Ctrl+C` to stop everything cleanly.

| Service         | URL                          |
| --------------- | ---------------------------- |
| Frontend        | http://localhost:3000        |
| Backend API     | http://localhost:5001        |
| ML Service      | http://localhost:8000        |
| ML Health check | http://localhost:8000/health |

---

## API Reference

### `POST /api/predict`

Submit a single sequence for async prediction.

**Request**

```json
{ "sequence": "MKTAYIAKQRQISFVKSHFSRQLEERLGLIEVQAPILSRVGDGTQDNLSG" }
```

**Response `202`**

```json
{ "success": true, "jobId": "uuid-here", "status": "QUEUED" }
```

### `GET /api/predict/status/:jobId`

Poll for job result.

**Response — completed**

```json
{
  "success": true,
  "data": {
    "status": "COMPLETED",
    "result": {
      "prediction": "Non-EV",
      "confidence": 0.932,
      "probabilities": {
        "Non-EV": 0.932,
        "Milk-based EV": 0.06,
        "Plant-based EV": 0.008
      },
      "sequence_length": 50
    }
  }
}
```

### `POST /api/batch/submit`

Submit a file for batch prediction. Results are emailed as a CSV.

**Request** — `multipart/form-data`

| Field   | Type   | Description                                                 |
| ------- | ------ | ----------------------------------------------------------- |
| `name`  | string | Submitter's full name                                       |
| `email` | string | Email address for results delivery                          |
| `file`  | file   | `.txt`, `.csv`, or `.fasta` — one sequence per line, max 50 |

**Response `202`**

```json
{
  "success": true,
  "message": "Job submitted. Results will be emailed to you@example.com."
}
```

**Results CSV columns**

| Column            | Description                                       |
| ----------------- | ------------------------------------------------- |
| `sequence`        | Original input sequence                           |
| `predicted_class` | `Non-EV` · `Milk-based EV` · `Plant-based EV`     |
| `confidence`      | Model confidence for the top class (0–1)          |
| `non_ev_prob`     | Probability for Non-EV                            |
| `milk_ev_prob`    | Probability for Milk-based EV                     |
| `plant_ev_prob`   | Probability for Plant-based EV                    |
| `error`           | Non-empty if this sequence could not be processed |

### `GET /health` (ML Service direct)

```json
{ "status": "ok", "models_loaded": true, "mock_mode": false }
```

---

## Development Mode (without GPU)

To develop and test the API layer without loading the 3B-parameter ProtT5 model:

```bash
cd ml_service/fastApi
DEV_MOCK_ML=true ~/.pyenv/versions/3.12.2/envs/myenv312/bin/python -m uvicorn app:app --port 8000
```

The service starts instantly and returns correctly-shaped mock predictions. Use this when iterating on the frontend or backend — **not** for validating ML output.

---

## Deployment Notes

- **GPU strongly recommended** — ProtT5-XL requires ~6 GB VRAM in fp16. CPU inference works but takes ~35s per sequence and ~11–12 GB RAM.
- The `--reload` flag in `start.sh` is for development only — remove it in production.
- Redis must be running before the backend starts or job submissions will fail silently.
- All three services must be running for the platform to function — a health check on `/health` (ML) and `/api/predict/status/:id` (Backend) is recommended before serving traffic.

### ⚠️ ProtT5-XL model caching — read before setting `HF_HUB_OFFLINE=1` in production

`HF_HUB_OFFLINE=1` prevents _any_ network calls to Hugging Face Hub at startup. It only works if
the model is **already present in the local HF cache on that exact host**
(`~/.cache/huggingface/hub/` by default, or wherever `HF_HOME`/`TRANSFORMERS_CACHE` points on
that machine). It does not bundle the model with the app — it just skips the "go fetch it" step.

This matters for deployment because:

- A brand-new production host / container has an **empty cache** unless one is explicitly
  provisioned. Deploying with `HF_HUB_OFFLINE=1` on such a host will make the ML service fail to
  start (or hang) instead of downloading the ~11 GB model, since it's forbidden from reaching out.
- Local dev machines "just work" because the model was pulled once, interactively, and cached —
  production needs the equivalent of that same one-time step, done deliberately, _before_ the
  offline flag is turned on.

**Before enabling `HF_HUB_OFFLINE=1` on a new production host, the deployment team must do one of:**

1. **Pre-warm the cache on that host/image**, once, with network access allowed (i.e. with
   `HF_HUB_OFFLINE` unset or `false`):

   ```bash
   HF_HUB_DISABLE_XET=1 python -c "
   from transformers import T5Tokenizer, T5EncoderModel
   T5Tokenizer.from_pretrained('Rostlab/prot_t5_xl_uniref50', do_lower_case=False)
   T5EncoderModel.from_pretrained('Rostlab/prot_t5_xl_uniref50')
   print('Model cached successfully.')
   "
   ```

   Then set `HF_HUB_OFFLINE=1` for all subsequent restarts.

2. **Bake the HF cache directory into the deploy image/volume** (e.g. a Docker layer or a
   persistent volume mounted at `HF_HOME`) as part of the build/provisioning pipeline, so every
   new instance starts with the model already present — no first-boot download, no offline-flag
   failure.

3. If neither is set up yet, **leave `HF_HUB_OFFLINE` unset for the first production boot** so it
   downloads normally, confirm the cache directory persists across restarts/redeploys (it won't on
   an ephemeral container filesystem unless explicitly mounted), then set the flag afterward.

Skipping this step is the most likely cause of a working-locally-but-broken-in-production ML
service — please don't assume "it was cached on the dev machine" carries over to a new host.

---

## Citation

```
[Author(s)]. MultiEV: Multi-Class Classification of Food-Derived Extracellular
Vesicle Proteins. [Journal / Conference], [Year]. doi: [your-doi-here]
```

Contact: [bagler+multiev@iiitd.ac.in](mailto:bagler+multiev@iiitd.ac.in)  
CoSyLab · IIIT Delhi · https://cosylab.iiitd.edu.in/
