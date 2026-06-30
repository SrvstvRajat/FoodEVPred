# """
# ml_service.py  –  FastAPI wrapper around the ESM2 + stacked-ensemble pipeline.
# Run with:  uvicorn ml_service:app --host 0.0.0.0 --port 8000
# """

# import os
# import sys
# import time
# import logging
# from contextlib import asynccontextmanager
# from typing import List

# import numpy as np
# import uvicorn
# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel, field_validator

# # ── Logging ───────────────────────────────────────────────────────────────────

# logging.basicConfig(
#     level=logging.INFO,
#     format="%(asctime)s  %(levelname)-8s  %(message)s",
#     datefmt="%Y-%m-%d %H:%M:%S",
# )
# log = logging.getLogger(__name__)

# # ── Config ────────────────────────────────────────────────────────────────────

# # Directory where ALL model artefacts live (adapter files + .pkl/.keras/.json).
# # Override via env var MODEL_DIR if your files are stored elsewhere.
# MODEL_DIR = os.environ.get("MODEL_DIR", os.path.dirname(os.path.abspath(__file__)))

# # ── Lazy globals (populated during startup) ───────────────────────────────────

# _extractor = None   # callable: sequence -> (1, 1280) numpy array
# _predictor = None   # callable: array   -> (label, confidence)


# # ── Startup / shutdown ────────────────────────────────────────────────────────

# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     """Load all heavy models once at startup so every request is fast."""
#     global _extractor, _predictor

#     log.info("=== ML Service starting up ===")
#     log.info(f"Model directory: {MODEL_DIR}")

#     # ── 1. ESM2 + LoRA ────────────────────────────────────────────────────────
#     log.info("Loading ESM2 base model + LoRA adapter …  (this may take a minute)")
#     t0 = time.time()

#     import torch
#     from transformers import AutoTokenizer, EsmModel
#     from peft import PeftModel

#     BASE_MODEL_NAME = "facebook/esm2_t33_650M_UR50D"
#     tokenizer   = AutoTokenizer.from_pretrained(BASE_MODEL_NAME)
#     base_model  = EsmModel.from_pretrained(BASE_MODEL_NAME)
#     lora_model  = PeftModel.from_pretrained(base_model, MODEL_DIR)
#     lora_model.eval()

#     log.info(f"ESM2 + LoRA loaded in {time.time()-t0:.1f}s")

#     def extract_features(sequence: str) -> np.ndarray:
#         """Return a (1, 1280) float32 numpy array for a protein sequence."""
#         inputs = tokenizer(sequence, return_tensors="pt", padding=True, truncation=True)
#         with torch.no_grad():
#             outputs = lora_model(**inputs)
#         embeddings     = outputs.last_hidden_state
#         attention_mask = inputs["attention_mask"].unsqueeze(-1)
#         sum_emb  = torch.sum(embeddings * attention_mask, dim=1)
#         sum_mask = torch.clamp(attention_mask.sum(dim=1), min=1e-9)
#         return (sum_emb / sum_mask).numpy()

#     _extractor = extract_features

#     # ── 2. Stacked ensemble ───────────────────────────────────────────────────
#     log.info("Loading stacked-ensemble artefacts …")
#     t1 = time.time()

#     import joblib
#     import xgboost as xgb
#     from tensorflow.keras.models import load_model as keras_load

#     def _path(filename: str) -> str:
#         return os.path.join(MODEL_DIR, filename)

#     scaler    = joblib.load(_path("scaler.pkl"))
#     base_svm  = joblib.load(_path("base_svm.pkl"))
#     meta_svm  = joblib.load(_path("meta_svm.pkl"))
#     base_lstm = keras_load(_path("base_bilstm.keras"))

#     base_xgb = xgb.XGBClassifier()
#     base_xgb.load_model(_path("base_xgb.json"))

#     CLASS_NAMES = {0: "Negative", 1: "Milk-based", 2: "Plant-based"}

#     log.info(f"Ensemble loaded in {time.time()-t1:.1f}s")

#     def predict(features_array: np.ndarray):
#         """Run the full stacked pipeline. Returns (label: str, confidence: float)."""
#         scaled = scaler.transform(features_array)

#         pred_svm  = base_svm.predict_proba(scaled)
#         pred_lstm = base_lstm.predict(scaled, verbose=0)
#         pred_xgb  = base_xgb.predict_proba(scaled)

#         meta_input      = np.hstack((pred_svm, pred_lstm, pred_xgb))
#         final_num_class = meta_svm.predict(meta_input)[0]
#         confidence      = float(meta_svm.predict_proba(meta_input).max())
#         label           = CLASS_NAMES.get(int(final_num_class), "Unknown")

#         return label, confidence

#     _predictor = predict

#     log.info("=== ML Service ready ===")
#     yield
#     log.info("=== ML Service shutting down ===")


# # ── FastAPI app ───────────────────────────────────────────────────────────────

# app = FastAPI(
#     title="Protein EV Classifier – ML Service",
#     version="1.0.0",
#     lifespan=lifespan,
# )

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],   # tighten in production
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# # ── Schemas ───────────────────────────────────────────────────────────────────

# class SingleRequest(BaseModel):
#     sequence: str

#     @field_validator("sequence")
#     @classmethod
#     def must_not_be_blank(cls, v: str) -> str:
#         v = v.strip()
#         if not v:
#             raise ValueError("sequence must not be blank")
#         # Basic amino-acid check – only standard + ambiguous residue letters
#         allowed = set("ACDEFGHIKLMNPQRSTVWYBXZUO")
#         invalid = set(v.upper()) - allowed
#         if invalid:
#             raise ValueError(f"sequence contains invalid characters: {invalid}")
#         return v.upper()


# class SingleResponse(BaseModel):
#     prediction: str
#     confidence: float
#     sequence_length: int


# class BatchRequest(BaseModel):
#     sequences: List[str]

#     @field_validator("sequences")
#     @classmethod
#     def validate_list(cls, v: List[str]) -> List[str]:
#         if not v:
#             raise ValueError("sequences list must not be empty")
#         if len(v) > 50:
#             raise ValueError("max 50 sequences per batch")
#         return [s.strip().upper() for s in v]


# class BatchItem(BaseModel):
#     index: int
#     sequence_length: int
#     prediction: str
#     confidence: float
#     error: str | None = None


# class BatchResponse(BaseModel):
#     results: List[BatchItem]
#     total: int
#     succeeded: int
#     failed: int


# # ── Health check ──────────────────────────────────────────────────────────────

# @app.get("/health")
# def health():
#     ready = _extractor is not None and _predictor is not None
#     return {"status": "ok" if ready else "loading", "models_loaded": ready}


# # ── POST /predict ─────────────────────────────────────────────────────────────

# @app.post("/predict", response_model=SingleResponse)
# def predict_single(req: SingleRequest):
#     if _extractor is None or _predictor is None:
#         raise HTTPException(503, detail="Models are still loading, please retry in a moment.")

#     try:
#         features = _extractor(req.sequence)
#         label, confidence = _predictor(features)
#     except Exception as exc:
#         log.exception("Prediction failed")
#         raise HTTPException(500, detail=f"Prediction error: {exc}") from exc

#     return SingleResponse(
#         prediction=label,
#         confidence=round(confidence, 4),
#         sequence_length=len(req.sequence),
#     )


# # ── POST /predict/batch ───────────────────────────────────────────────────────

# @app.post("/predict/batch", response_model=BatchResponse)
# def predict_batch(req: BatchRequest):
#     if _extractor is None or _predictor is None:
#         raise HTTPException(503, detail="Models are still loading, please retry in a moment.")

#     results: List[BatchItem] = []
#     succeeded = 0
#     failed    = 0

#     for idx, seq in enumerate(req.sequences):
#         try:
#             features = _extractor(seq)
#             label, confidence = _predictor(features)
#             results.append(BatchItem(
#                 index=idx,
#                 sequence_length=len(seq),
#                 prediction=label,
#                 confidence=round(confidence, 4),
#             ))
#             succeeded += 1
#         except Exception as exc:
#             log.error(f"Batch item {idx} failed: {exc}")
#             results.append(BatchItem(
#                 index=idx,
#                 sequence_length=len(seq),
#                 prediction="",
#                 confidence=0.0,
#                 error=str(exc),
#             ))
#             failed += 1

#     return BatchResponse(
#         results=results,
#         total=len(req.sequences),
#         succeeded=succeeded,
#         failed=failed,
#     )


# # ── Entrypoint ────────────────────────────────────────────────────────────────

# if __name__ == "__main__":
#     uvicorn.run("ml_service:app", host="0.0.0.0", port=8000, reload=False)







"""
ml_service.py  –  FastAPI wrapper around the ESM2 + stacked-ensemble pipeline.

────────────────────────────────────────────────────────────
  MODE A – Local files (for professor demo / dev):
    Just place all model files next to app.py and run:
      uvicorn app:app --host 0.0.0.0 --port 8000

  MODE B – HuggingFace Hub (for production deployment):
    Set these env vars and model files download automatically:
      HF_REPO_ID=your-username/ev-classifier
      HF_TOKEN=hf_xxxx   (only needed if repo is private)
      uvicorn app:app --host 0.0.0.0 --port 8000
────────────────────────────────────────────────────────────
"""

import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"  # prevent OpenMP crash when XGBoost + TensorFlow share the same process

import time
import logging
from contextlib import asynccontextmanager
from typing import List

import numpy as np
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator

# ── Logging ───────────────────────────────────────────────────────────────────

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger(__name__)

# ── Config ────────────────────────────────────────────────────────────────────

# HuggingFace repo that holds your model files.
# Leave blank (default) → MODE A: loads from local directory next to app.py
# Set to "your-username/ev-classifier" → MODE B: downloads from HuggingFace
HF_REPO_ID = os.environ.get("HF_REPO_ID", "").strip()
HF_TOKEN   = os.environ.get("HF_TOKEN", "").strip() or None  # needed for private repos

def resolve_model_dir() -> str:
    """
    Returns the local directory that contains all model artefacts.
    MODE A: the folder where app.py lives (model files placed manually).
    MODE B: a HuggingFace snapshot cache directory (auto-downloaded).
    """
    if HF_REPO_ID:
        # ── MODE B ────────────────────────────────────────────────────────────
        log.info(f"HF_REPO_ID is set → downloading models from HuggingFace: {HF_REPO_ID}")
        try:
            from huggingface_hub import snapshot_download
        except ImportError:
            raise RuntimeError(
                "huggingface_hub is not installed. "
                "Run:  pip install huggingface_hub"
            )
        local_dir = snapshot_download(
            repo_id=HF_REPO_ID,
            token=HF_TOKEN or None,
            # Only download the artefacts we actually need (skip .py / .md etc.)
            ignore_patterns=["*.py", "*.md", "*.txt", ".gitattributes"],
        )
        log.info(f"Models downloaded/cached at: {local_dir}")
        return local_dir
    else:
        # ── MODE A ────────────────────────────────────────────────────────────
        local_dir = os.environ.get(
            "MODEL_DIR",
            os.path.dirname(os.path.abspath(__file__))
        )
        log.info(f"HF_REPO_ID not set → using local model directory: {local_dir}")
        return local_dir

# ── Lazy globals (populated during startup) ───────────────────────────────────

_extractor = None   # callable: sequence -> (1, 1280) numpy array
_predictor = None   # callable: array   -> (label, confidence)


# ── Startup / shutdown ────────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load all heavy models once at startup so every request is fast."""
    global _extractor, _predictor

    log.info("=== ML Service starting up ===")
    MODEL_DIR = resolve_model_dir()  # figures out local vs HuggingFace automatically

    # ── 1. ESM2 + LoRA ────────────────────────────────────────────────────────
    log.info("Loading ESM2 base model + LoRA adapter …  (this may take a minute)")
    t0 = time.time()

    import torch
    from transformers import AutoTokenizer, EsmModel
    from peft import PeftModel

    BASE_MODEL_NAME = "facebook/esm2_t33_650M_UR50D"
    tokenizer   = AutoTokenizer.from_pretrained(BASE_MODEL_NAME)
    base_model  = EsmModel.from_pretrained(BASE_MODEL_NAME)
    lora_model  = PeftModel.from_pretrained(base_model, MODEL_DIR)
    lora_model.eval()

    log.info(f"ESM2 + LoRA loaded in {time.time()-t0:.1f}s")

    def extract_features(sequence: str) -> np.ndarray:
        """Return a (1, 1280) float32 numpy array for a protein sequence."""
        inputs = tokenizer(sequence, return_tensors="pt", padding=True, truncation=True)
        with torch.no_grad():
            outputs = lora_model(**inputs)
        embeddings     = outputs.last_hidden_state
        attention_mask = inputs["attention_mask"].unsqueeze(-1)
        sum_emb  = torch.sum(embeddings * attention_mask, dim=1)
        sum_mask = torch.clamp(attention_mask.sum(dim=1), min=1e-9)
        return (sum_emb / sum_mask).numpy()

    _extractor = extract_features

    # ── 2. Stacked ensemble ───────────────────────────────────────────────────
    log.info("Loading stacked-ensemble artefacts …")
    t1 = time.time()

    import joblib
    import xgboost as xgb

    def _path(filename: str) -> str:
        return os.path.join(MODEL_DIR, filename)

    log.info("Loading scaler")
    scaler = joblib.load(_path("scaler.pkl"))

    log.info("Loading base_svm")
    base_svm = joblib.load(_path("base_svm.pkl"))

    log.info("Loading meta_svm")
    meta_svm = joblib.load(_path("meta_svm.pkl"))

    # nthread=1 prevents XGBoost from initialising its OpenMP runtime,
    # which segfaults on macOS when PyTorch's libiomp5 is already loaded.
    log.info("Loading xgb")
    base_xgb = xgb.XGBClassifier(nthread=1)
    log.info("Before xgb.load_model")
    base_xgb.load_model(_path("base_xgb.json"))
    log.info("After xgb.load_model")

    # Load Keras/TensorFlow after XGBoost
    from tensorflow.keras.models import load_model as keras_load
    log.info("Loading lstm")
    base_lstm = keras_load(_path("base_bilstm.keras"))

    log.info("All ensemble artifacts loaded")

    CLASS_NAMES = {0: "Negative", 1: "Milk-based", 2: "Plant-based"}

    log.info(f"Ensemble loaded in {time.time()-t1:.1f}s")

    def predict(features_array: np.ndarray):
        """Run the full stacked pipeline. Returns (label: str, confidence: float)."""
        scaled = scaler.transform(features_array)

        pred_svm  = base_svm.predict_proba(scaled)
        pred_lstm = base_lstm.predict(scaled, verbose=0)
        pred_xgb  = base_xgb.predict_proba(scaled)

        meta_input      = np.hstack((pred_svm, pred_lstm, pred_xgb))
        final_num_class = meta_svm.predict(meta_input)[0]
        confidence      = float(meta_svm.predict_proba(meta_input).max())
        label           = CLASS_NAMES.get(int(final_num_class), "Unknown")

        return label, confidence

    _predictor = predict

    log.info("=== ML Service ready ===")
    yield
    log.info("=== ML Service shutting down ===")


# ── FastAPI app ───────────────────────────────────────────────────────────────

app = FastAPI(
    title="Protein EV Classifier – ML Service",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # tighten in production
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Schemas ───────────────────────────────────────────────────────────────────

class SingleRequest(BaseModel):
    sequence: str

    @field_validator("sequence")
    @classmethod
    def must_not_be_blank(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("sequence must not be blank")
        # Basic amino-acid check – only standard + ambiguous residue letters
        allowed = set("ACDEFGHIKLMNPQRSTVWYBXZUO")
        invalid = set(v.upper()) - allowed
        if invalid:
            raise ValueError(f"sequence contains invalid characters: {invalid}")
        return v.upper()


class SingleResponse(BaseModel):
    prediction: str
    confidence: float
    sequence_length: int


class BatchRequest(BaseModel):
    sequences: List[str]

    @field_validator("sequences")
    @classmethod
    def validate_list(cls, v: List[str]) -> List[str]:
        if not v:
            raise ValueError("sequences list must not be empty")
        if len(v) > 50:
            raise ValueError("max 50 sequences per batch")
        return [s.strip().upper() for s in v]


class BatchItem(BaseModel):
    index: int
    sequence_length: int
    prediction: str
    confidence: float
    error: str | None = None


class BatchResponse(BaseModel):
    results: List[BatchItem]
    total: int
    succeeded: int
    failed: int


# ── Health check ──────────────────────────────────────────────────────────────

@app.get("/health")
def health():
    ready = _extractor is not None and _predictor is not None
    return {"status": "ok" if ready else "loading", "models_loaded": ready}


# ── POST /predict ─────────────────────────────────────────────────────────────

@app.post("/predict", response_model=SingleResponse)
def predict_single(req: SingleRequest):
    if _extractor is None or _predictor is None:
        raise HTTPException(503, detail="Models are still loading, please retry in a moment.")

    try:
        features = _extractor(req.sequence)
        label, confidence = _predictor(features)
    except Exception as exc:
        log.exception("Prediction failed")
        raise HTTPException(500, detail=f"Prediction error: {exc}") from exc

    return SingleResponse(
        prediction=label,
        confidence=round(confidence, 4),
        sequence_length=len(req.sequence),
    )


# ── POST /predict/batch ───────────────────────────────────────────────────────

@app.post("/predict/batch", response_model=BatchResponse)
def predict_batch(req: BatchRequest):
    if _extractor is None or _predictor is None:
        raise HTTPException(503, detail="Models are still loading, please retry in a moment.")

    results: List[BatchItem] = []
    succeeded = 0
    failed    = 0

    for idx, seq in enumerate(req.sequences):
        try:
            features = _extractor(seq)
            label, confidence = _predictor(features)
            results.append(BatchItem(
                index=idx,
                sequence_length=len(seq),
                prediction=label,
                confidence=round(confidence, 4),
            ))
            succeeded += 1
        except Exception as exc:
            log.error(f"Batch item {idx} failed: {exc}")
            results.append(BatchItem(
                index=idx,
                sequence_length=len(seq),
                prediction="",
                confidence=0.0,
                error=str(exc),
            ))
            failed += 1

    return BatchResponse(
        results=results,
        total=len(req.sequences),
        succeeded=succeeded,
        failed=failed,
    )


# ── Entrypoint ────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    uvicorn.run("ml_service:app", host="0.0.0.0", port=8000, reload=False)