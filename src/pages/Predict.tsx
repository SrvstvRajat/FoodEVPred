import React, { useState, useRef, useEffect } from "react";
import {
  Dna, Upload, Loader2, X, FlaskConical, AlertCircle, CheckCircle2, FileText, ArrowRight,
} from "lucide-react";


const FontLoader: React.FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
    .font-display { font-family: 'Space Grotesk', sans-serif; }
    .font-body { font-family: 'Inter', sans-serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

const T = {
  ink: "#F4F8F5",
  surface: "#FFFFFF",
  hairline: "rgba(15,23,42,0.08)",
  hairlineStrong: "rgba(15,23,42,0.14)",
  text: "#16211C",
  muted: "#5F6E66",
  primary: "#1F9E88",
  primaryDim: "rgba(31,158,136,0.10)",
  accent: "#D98A46",
  accentDim: "rgba(217,138,70,0.12)",
  slate: "#8A97A6",
  slateDim: "rgba(138,151,166,0.12)",
  danger: "#C0392B",
  dangerDim: "#FBEAE7",
  success: "#1F9E88",
};

const cardClass = "rounded-2xl";
const cardStyle: React.CSSProperties = { background: T.surface, border: `1px solid ${T.hairline}` };

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "single" | "batch";

interface Toast {
  type: "success" | "error";
  message: string;
}

interface PredictionResult {
  predicted_class: string;
  confidence?: number;
  sequence_length?: number;
  probabilities?: Record<string, number>;
  processing_time_ms?: number;
}

// ─── Constants — matches LABEL_MAP in app.py exactly ──────────────────────────

const API = process.env.REACT_APP_API_URL || "http://localhost:5001/api";



//To remember the class info for the three classes, we can use a record with the class name as the key and an object containing the color and background color as the value.
// 0. `Non-EV`
// 1. `Milk-based EV`
// 2. `Plant-based EV`
const CLASS_INFO: Record<string, { color: string; bg: string }> = {
  "Non-EV": { color: T.slate, bg: T.slateDim },
  "Milk-based EV": { color: T.primary, bg: T.primaryDim },
  "Plant-based EV": { color: T.accent, bg: T.accentDim },
};

const SAMPLE_SEQUENCES = [
  "MAGILFEDIFEDVKDIDPEGKKFDRVSLHCESESFKMDLILDVNIQIYPVDLGDKFRLVIASTLYEDGTLDDGEYNPTDDRPSRADQFEYVMYGKVYRIEGDETSAEAATRLSAYVASYGGLLMRLQGDANNLHGFEVDSRVYLLMKKLAF",
  "MALKSLVLLSLLVLVLLLVRVQPSLGKETAAAKFERQHMDSSTSAASSSYNCNQMMKSRNLTKDRCKPVNTFVHESLADVEQAVCSQKNVACKNGNQTNCYQSYSTMSITDCRETGSSKYPNCAYKTQANKNIIVACEGNPYVPVHFDASV",
  "MSKRKTEKPKVETVTLGPSVREGERQVFGVVHIFASFNDTFIHVTDLSGRERTLVRITGGMKVKADRDSSRPYAAMLAAQDVAQRCKRLGITAMHVKLRATGGNKTKPGPGAQSALRALRSGMKIGRIERDVTPIPTDSTRRRKGGRRGRRL",
  "MPKNKGKGGKNRKRGKNEADDEKRELIFIKDEDGQEYAQVLRMLGNGKRCDVMCIDGVKRLCHIRGKMHKKVWIAAGDIILVGLRDYQDRKADVILKYMSDEARLLKAYGELRPENTRELNREGIVGDLDDDDRDVFVFVVGSLFQLVLSNLRYISS",
  "MKDEVALLASVTLLGVLLQAYFSRLQVISARRAFRVSRPPLTTGPPREFEQRIYRAQVNCSREYFPLFLRRAMLWVAGIFRHEGAARALCGLVYLFARRLRYFQGYARSAQQRLAPLYASARRALWLLVALARALGLRLAHFLPAELRAALRLGQLRKLLLRS",
];

// Labels matching SAMPLE_SEQUENCES order (for Load Sample display only)
const SAMPLE_LABELS = [
  "Milk-based EV",
  "Milk-based EV",
  "Plant-based EV",
  "Plant-based EV",
  "Non-EV",
];

// ─── Sample file download helpers ─────────────────────────────────────────────
const buildFasta = () =>
  SAMPLE_SEQUENCES.map((seq, i) => `>sample_${i + 1} | ${SAMPLE_LABELS[i]}\n${seq}`).join("\n\n");
const buildTxt = () => SAMPLE_SEQUENCES.join("\n");
const buildCsv = () =>
  ["sequence,label", ...SAMPLE_SEQUENCES.map((seq, i) => `${seq},${SAMPLE_LABELS[i]}`)].join("\n");

const SAMPLE_FILES = [
  { label: "FASTA Format",  ext: ".fasta", Icon: Dna,      filename: "multiev_sample.fasta", content: buildFasta() },
  { label: "Text Format",   ext: ".txt",   Icon: FileText,  filename: "multiev_sample.txt",   content: buildTxt()   },
  { label: "CSV Format",    ext: ".csv",   Icon: FileText,  filename: "multiev_sample.csv",   content: buildCsv()   },
];

const downloadSample = (filename: string, content: string) => {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// ─── Toast ────────────────────────────────────────────────────────────────────

const ToastMessage: React.FC<{ toast: Toast; onClose: () => void }> = ({ toast, onClose }) => {
  const ok = toast.type === "success";
  return (
    <div
      className="flex items-start gap-3 rounded-xl px-4 py-3.5 mb-6"
      style={{
        background: ok ? T.primaryDim : T.dangerDim,
        border: `1px solid ${ok ? "rgba(31,158,136,0.3)" : "rgba(192,57,43,0.25)"}`,
        color: ok ? "#166534" : T.danger,
      }}
    >
      {ok ? <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" /> : <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />}
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button onClick={onClose} className="opacity-50 hover:opacity-100 transition-opacity" aria-label="Dismiss">
        <X size={14} />
      </button>
    </div>
  );
};

// ─── Result panel ───────────────────────────────────────────────────────────────

const ResultPanel: React.FC<{ result: PredictionResult }> = ({ result }) => {
  const info = CLASS_INFO[result.predicted_class] || { color: T.slate, bg: T.slateDim };
  const entries = result.probabilities
    ? Object.entries(result.probabilities).sort(([, a], [, b]) => b - a)
    : [];

  return (
    <div className="mt-8 space-y-5">
      {/* Headline result */}
      <div
        className="rounded-2xl p-7 flex items-center gap-6"
        style={{ background: info.bg, border: `1px solid ${info.color}30` }}
      >
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: T.surface }}>
          <FlaskConical size={28} style={{ color: info.color }} />
        </div>
        <div className="flex-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-1.5" style={{ color: T.muted }}>Predicted Class</p>
          <p className="font-display text-3xl font-semibold mb-2" style={{ color: info.color }}>
            {result.predicted_class}
          </p>
          {result.confidence !== undefined && (
            <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full text-white" style={{ background: info.color }}>
              {(result.confidence * 100).toFixed(1)}% confidence
            </span>
          )}
        </div>
      </div>

      {/* Probability bars */}
      {entries.length > 0 && (
        <div className={`p-6 ${cardClass}`} style={cardStyle}>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-5" style={{ color: T.muted }}>
            Class Probabilities
          </p>
          <div className="space-y-4">
            {entries.map(([cls, prob]) => {
              const c = CLASS_INFO[cls]?.color || T.slate;
              const isTop = cls === result.predicted_class;
              return (
                <div key={cls}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold" style={{ color: isTop ? c : T.text }}>{cls}</span>
                    <span className="text-sm font-bold tabular-nums" style={{ color: isTop ? c : T.muted }}>
                      {(prob * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: T.ink }}>
                    <div
                      className="h-2.5 rounded-full transition-all duration-700"
                      style={{ width: `${prob * 100}%`, background: c }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex items-center gap-5 px-1 text-xs font-medium" style={{ color: T.muted }}>
        {result.sequence_length !== undefined && <span>{result.sequence_length} residues</span>}
        {result.processing_time_ms !== undefined && <span>{(result.processing_time_ms / 1000).toFixed(1)}s elapsed</span>}
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Predict: React.FC = () => {
  const [tab, setTab] = useState<Tab>("single");
  const [sequence, setSequence] = useState("");
  const [seqLoading, setSeqLoading] = useState(false);
  const [seqResult, setSeqResult] = useState<PredictionResult | null>(null);
  const [seqToast, setSeqToast] = useState<Toast | null>(null);
  const [seqElapsed, setSeqElapsed] = useState(0);

  const [batchFile, setBatchFile] = useState<File | null>(null);
  const [batchName, setBatchName] = useState("");
  const [batchEmail, setBatchEmail] = useState("");
  const [batchLoading, setBatchLoading] = useState(false);
  const [batchToast, setBatchToast] = useState<Toast | null>(null);
  // Batch is fire-and-forget (results emailed) — no inline results state needed
  const [batchSubmitted, setBatchSubmitted] = useState(false);

  const batchFileRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (pollRef.current) clearInterval(pollRef.current);
  }, []);

  const handleTrySample = () => {
    const s = SAMPLE_SEQUENCES[Math.floor(Math.random() * SAMPLE_SEQUENCES.length)];
    setSequence(s);
    setSeqResult(null);
    setSeqToast(null);
  };

  const handleSequencePredict = async () => {
    if (!sequence.trim()) {
      setSeqToast({ type: "error", message: "Enter a protein sequence to run a prediction." });
      return;
    }

    setSeqLoading(true);
    setSeqResult(null);
    setSeqToast(null);
    setSeqElapsed(0);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSeqElapsed((p) => p + 1), 1000);

    try {
      const submitRes = await fetch(`${API}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sequence: sequence.trim() }),
      });
      const submitJson = await submitRes.json();
      if (!submitRes.ok || !submitJson.success) {
        throw new Error(submitJson.error || `HTTP ${submitRes.status}`);
      }

      const currentJobId = submitJson.jobId;

      pollRef.current = setInterval(async () => {
        try {
          const statusRes = await fetch(`${API}/predict/status/${currentJobId}`);
          const statusJson = await statusRes.json();
          if (!statusRes.ok) throw new Error(statusJson.error || "Failed to fetch job status.");

          const job = statusJson.data;

          if (job.status === "COMPLETED") {
            if (pollRef.current) clearInterval(pollRef.current);
            if (timerRef.current) clearInterval(timerRef.current);
            const raw = job.result;
            setSeqResult({
              predicted_class: raw.prediction,
              confidence: raw.confidence,
              sequence_length: raw.sequence_length,
              probabilities: raw.probabilities,
              processing_time_ms: raw.processing_time_ms,
            });
            setSeqToast({ type: "success", message: "Prediction complete." });
            setSeqLoading(false);
            return;
          }

          if (job.status === "FAILED") {
            if (pollRef.current) clearInterval(pollRef.current);
            if (timerRef.current) clearInterval(timerRef.current);
            setSeqLoading(false);
            setSeqToast({ type: "error", message: job.error || "Prediction failed." });
            return;
          }
        } catch (err: any) {
          if (pollRef.current) clearInterval(pollRef.current);
          if (timerRef.current) clearInterval(timerRef.current);
          setSeqLoading(false);
          setSeqToast({ type: "error", message: err.message || "Prediction failed." });
        }
      }, 3000);
    } catch (e: any) {
      if (timerRef.current) clearInterval(timerRef.current);
      setSeqLoading(false);
      setSeqToast({ type: "error", message: e.message || "Prediction failed." });
    }
  };

  const handleBatchSubmit = async () => {
    if (!batchName.trim()) {
      setBatchToast({ type: "error", message: "Please enter your name." });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!batchEmail.trim() || !emailRegex.test(batchEmail)) {
      setBatchToast({ type: "error", message: "Please enter a valid email address." });
      return;
    }
    if (!batchFile) {
      setBatchToast({ type: "error", message: "Select a sequence file to upload." });
      return;
    }

    setBatchLoading(true);
    setBatchToast(null);
    setBatchSubmitted(false);

    try {
      // Must use multipart/form-data — backend uses multer to parse the file.
      // Do NOT set Content-Type manually; fetch sets it with the correct boundary.
      const formData = new FormData();
      formData.append("name", batchName.trim());
      formData.append("email", batchEmail.trim());
      formData.append("file", batchFile);

      const res = await fetch(`${API}/batch/submit`, {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || json.error || `HTTP ${res.status}`);

      // Results are emailed — show confirmation, don't try to show inline results
      setBatchSubmitted(true);
      setBatchToast({
        type: "success",
        message: json.message || `Job submitted! A confirmation has been sent to ${batchEmail}. Results will follow by email once processing completes.`,
      });
      setBatchFile(null);
      setBatchName("");
      setBatchEmail("");
    } catch (e: any) {
      setBatchToast({ type: "error", message: e.message || "Batch submission failed." });
    } finally {
      setBatchLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl px-5 py-4 text-sm font-medium outline-none transition-all duration-150 resize-none leading-relaxed";
  const inputStyle: React.CSSProperties = { background: T.surface, border: `1px solid ${T.hairlineStrong}`, color: T.text };

  return (
    <div className="min-h-screen pb-24 font-body" style={{ background: T.ink }}>
      <FontLoader />
      <main className="max-w-4xl mx-auto px-5 py-14">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 border" style={{ borderColor: T.hairlineStrong, background: T.primaryDim }}>
            <Dna size={13} style={{ color: T.primary }} />
            <span className="font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: T.primary }}>
              sequence classifier
            </span>
          </div>
          <h1 className="font-display text-4xl font-semibold tracking-tight mb-3" style={{ color: T.text }}>
            Run a Prediction
          </h1>
          <p className="text-base max-w-2xl leading-relaxed" style={{ color: T.muted }}>
            Submit a protein sequence to classify its food-source origin: non-vesicular,
            milk-derived, or plant-derived extracellular vesicle protein.
          </p>
        </div>


        {/* Tabs */}
        <div className="flex gap-2 mb-5" role="tablist">
          {([
            ["single", <Dna size={15} key="i" />, "Single Sequence"],
            ["batch", <Upload size={15} key="i" />, "Batch File"],
          ] as [Tab, React.ReactNode, string][]).map(([id, icon, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={
                tab === id
                  ? { background: T.primary, color: "white", boxShadow: "0 4px 14px rgba(31,158,136,0.25)" }
                  : { background: T.surface, color: T.muted, border: `1px solid ${T.hairline}` }
              }
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className={`p-8 ${cardClass}`} style={cardStyle}>

          {/* ── Single sequence tab ── */}
          {tab === "single" && (
            <>
              {seqToast && <ToastMessage toast={seqToast} onClose={() => setSeqToast(null)} />}

              <label htmlFor="sequence-input" className="font-mono block text-[11px] uppercase tracking-[0.15em] mb-3" style={{ color: T.muted }}>
                Protein Sequence
              </label>
              <textarea
                id="sequence-input"
                value={sequence}
                onChange={(e) => setSequence(e.target.value.toUpperCase())}
                rows={6}
                className={inputClass + " font-mono"}
                style={inputStyle}
                onFocus={(e) => { e.target.style.border = `1px solid ${T.primary}`; e.target.style.boxShadow = "0 0 0 4px rgba(31,158,136,0.12)"; }}
                onBlur={(e) => { e.target.style.border = `1px solid ${T.hairlineStrong}`; e.target.style.boxShadow = "none"; }}
                placeholder="MKTAYIAKQRQISFVKSHFSRQLEERLGLIEVQAPILSRVGDGTQDNLSG..."
                spellCheck={false}
              />
              <p className="text-xs mt-2 font-medium" style={{ color: T.muted }}>
                {sequence.trim().length} residues
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={handleTrySample}
                  className="rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: T.surface, border: `1px solid ${T.hairlineStrong}`, color: T.text }}
                >
                  Load Sample
                </button>
                <button
                  onClick={handleSequencePredict}
                  disabled={seqLoading}
                  className="flex-1 rounded-xl px-6 py-3.5 text-sm font-semibold text-white flex items-center justify-center gap-2.5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  style={{ background: T.primary }}
                >
                  {seqLoading
                    ? <><Loader2 size={15} className="animate-spin" /> Running — {seqElapsed}s</>
                    : <><FlaskConical size={15} /> Classify Sequence</>}
                </button>
              </div>

              {seqLoading && (
                <div className="mt-5 rounded-xl px-5 py-4 flex items-start gap-3" style={{ background: T.primaryDim, border: "1px solid rgba(31,158,136,0.3)" }}>
                  <Loader2 size={15} className="animate-spin flex-shrink-0 mt-0.5" style={{ color: T.primary }} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: T.text }}>
                      Embedding and classifying — {seqElapsed}s elapsed
                    </p>
                    <p className="text-xs mt-1" style={{ color: T.muted }}>
                      {seqElapsed < 15
                        ? "Generating ProtT5-XL embedding…"
                        : seqElapsed < 25
                        ? "Selecting RFE features and scaling…"
                        : seqElapsed < 40
                        ? "Running stacked ensemble classifier…"
                        : "Still working — CPU inference can take up to a minute for longer sequences."}
                    </p>
                  </div>
                </div>
              )}

              {seqResult && <ResultPanel result={seqResult} />}
            </>
          )}

          {/* ── Batch tab ── */}
          {tab === "batch" && (
            <>
              {batchToast && <ToastMessage toast={batchToast} onClose={() => setBatchToast(null)} />}

              {batchSubmitted ? (
                /* ── Confirmation state ── */
                <div className="rounded-xl p-8 text-center" style={{ background: T.primaryDim, border: "1px solid rgba(31,158,136,0.3)" }}>
                  <CheckCircle2 size={32} className="mx-auto mb-3" style={{ color: T.primary }} />
                  <p className="font-display text-lg font-semibold mb-2" style={{ color: T.text }}>Job Submitted!</p>
                  <p className="text-sm" style={{ color: T.muted }}>
                    A confirmation has been sent to your email. Your results CSV will follow once processing completes.
                  </p>
                  <button
                    className="mt-5 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all"
                    style={{ background: T.surface, border: `1px solid ${T.hairlineStrong}`, color: T.text }}
                    onClick={() => { setBatchSubmitted(false); setBatchToast(null); }}
                  >
                    Submit another job
                  </button>
                </div>
              ) : (
                <>
                  {/* Name */}
                  <div className="mb-5">
                    <label htmlFor="batch-name" className="font-mono block text-[11px] uppercase tracking-[0.15em] mb-2" style={{ color: T.muted }}>
                      Full Name
                    </label>
                    <input
                      id="batch-name"
                      type="text"
                      value={batchName}
                      onChange={(e) => setBatchName(e.target.value)}
                      className="w-full rounded-xl px-5 py-3.5 text-sm font-medium outline-none transition-all"
                      style={{ background: T.surface, border: `1px solid ${T.hairlineStrong}`, color: T.text }}
                      onFocus={(e) => { e.target.style.border = `1px solid ${T.primary}`; e.target.style.boxShadow = "0 0 0 4px rgba(31,158,136,0.12)"; }}
                      onBlur={(e) => { e.target.style.border = `1px solid ${T.hairlineStrong}`; e.target.style.boxShadow = "none"; }}
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-5">
                    <label htmlFor="batch-email" className="font-mono block text-[11px] uppercase tracking-[0.15em] mb-2" style={{ color: T.muted }}>
                      Email Address
                    </label>
                    <input
                      id="batch-email"
                      type="email"
                      value={batchEmail}
                      onChange={(e) => setBatchEmail(e.target.value)}
                      className="w-full rounded-xl px-5 py-3.5 text-sm font-medium outline-none transition-all"
                      style={{ background: T.surface, border: `1px solid ${T.hairlineStrong}`, color: T.text }}
                      onFocus={(e) => { e.target.style.border = `1px solid ${T.primary}`; e.target.style.boxShadow = "0 0 0 4px rgba(31,158,136,0.12)"; }}
                      onBlur={(e) => { e.target.style.border = `1px solid ${T.hairlineStrong}`; e.target.style.boxShadow = "none"; }}
                      placeholder="you@example.com"
                    />
                    <p className="text-xs mt-1.5" style={{ color: T.muted }}>
                      Results CSV will be sent to this address once processing completes.
                    </p>
                  </div>

                  {/* File upload */}
                  <label className="font-mono block text-[11px] uppercase tracking-[0.15em] mb-2" style={{ color: T.muted }}>
                    Sequence File (.txt, .csv, .fasta — max 50 sequences)
                  </label>
                  <div
                    role="button"
                    tabIndex={0}
                    className="rounded-xl p-8 text-center cursor-pointer transition-colors duration-150"
                    style={{ background: T.ink, border: `1.5px dashed ${T.hairlineStrong}` }}
                    onClick={() => batchFileRef.current?.click()}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") batchFileRef.current?.click(); }}
                  >
                    {batchFile ? (
                      <div>
                        <p className="text-sm font-bold" style={{ color: T.text }}>{batchFile.name}</p>
                        <p className="text-xs mt-1" style={{ color: T.muted }}>{(batchFile.size / 1024).toFixed(1)} KB</p>
                        <button
                          className="text-xs mt-2 underline"
                          style={{ color: T.muted }}
                          onClick={(e) => { e.stopPropagation(); setBatchFile(null); }}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload size={22} className="mx-auto mb-3" style={{ color: T.muted }} />
                        <p className="text-sm font-semibold" style={{ color: T.text }}>Click to select a file</p>
                        <p className="text-xs mt-1" style={{ color: T.muted }}>.txt, .csv, or .fasta — one sequence per line (CSV: first column)</p>
                      </div>
                    )}
                    <input
                      ref={batchFileRef}
                      type="file"
                      accept=".txt,.csv,.fasta"
                      className="hidden"
                      onChange={(e) => setBatchFile(e.target.files?.[0] || null)}
                    />
                  </div>

                  <button
                    onClick={handleBatchSubmit}
                    disabled={batchLoading}
                    className="w-full mt-6 rounded-xl px-6 py-3.5 text-sm font-semibold text-white flex items-center justify-center gap-2.5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    style={{ background: T.primary }}
                  >
                    {batchLoading
                      ? <><Loader2 size={15} className="animate-spin" /> Submitting…</>
                      : <><Upload size={15} /> Submit Batch Job</>}
                  </button>
                </>
              )}
            </>
          )}
        </div>
           {/* ── Sample Data Downloads ──────────────────────────────────────────── */}
        <div className={`p-6 mb-6 ${cardClass}`} style={cardStyle}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-0.5" style={{ color: T.muted }}>
                Sample Data
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {SAMPLE_FILES.map(({ label, ext, Icon, filename, content }) => (
              <div
                key={ext}
                className="rounded-xl p-4 flex items-center gap-3 group cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: T.ink, border: `1px solid ${T.hairline}` }}
                onClick={() => downloadSample(filename, content)}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: T.primaryDim, color: T.primary }}
                >
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold" style={{ color: T.text }}>{label}</p>
                  <p className="font-mono text-xs mt-0.5" style={{ color: T.muted }}>{ext}</p>
                </div>
                <ArrowRight
                  size={14}
                  style={{ color: T.hairlineStrong }}
                  className="group-hover:translate-x-0.5 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Predict;