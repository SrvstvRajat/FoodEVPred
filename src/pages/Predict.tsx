// import React, { useState, useRef, useEffect } from "react";
// import {
//   Dna, Upload, Mail, Sparkles, CheckCircle, XCircle,
//   Loader2, X, ArrowRight, FlaskConical,
// } from "lucide-react";

// // ─── Types ────────────────────────────────────────────────────────────────────

// type Tab = "molecule" | "batchFile";

// interface Toast {
//   type: "success" | "error";
//   message: string;
// }

// interface PredictionResult {
//   predicted_class: string;
//   confidence?: number;
//   sequence_length?: number;
//   probabilities?: Record<string, number>;
//   processing_time_ms?: number;
// }

// // ─── Constants ────────────────────────────────────────────────────────────────

// const API = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

// const CLASS_COLORS: Record<string, string> = {
//   Sweet:     "#2563eb",
//   Bitter:    "#dc2626",
//   Umami:     "#d97706",
//   Sour:      "#16a34a",
//   Undefined: "#64748b",
//   "Cow Milk":    "#2563eb",
//   "Human Milk":  "#7c3aed",
//   "Citrus":      "#d97706",
//   "Broccoli":    "#16a34a",
//   "Arabidopsis": "#0d9488",
//   "Negative":    "#64748b",
//   "Milk-based":  "#2563eb",
//   "Plant-based": "#16a34a",
// };

// const CLASS_BG: Record<string, string> = {
//   Sweet:     "#eff6ff",
//   Bitter:    "#fef2f2",
//   Umami:     "#fffbeb",
//   Sour:      "#f0fdf4",
//   Undefined: "#f8fafc",
//   "Cow Milk":    "#eff6ff",
//   "Human Milk":  "#f5f3ff",
//   "Citrus":      "#fffbeb",
//   "Broccoli":    "#f0fdf4",
//   "Arabidopsis": "#f0fdfa",
//   "Negative":    "#f8fafc",
//   "Milk-based":  "#eff6ff",
//   "Plant-based": "#f0fdf4",
// };

// const TASTE_EMOJI: Record<string, string> = {
//   Sweet:     "🍬",
//   Bitter:    "☕",
//   Umami:     "🍖",
//   Sour:      "🍋",
//   Undefined: "❓",
//   "Cow Milk":    "🐄",
//   "Human Milk":  "🤱",
//   "Citrus":      "🍋",
//   "Broccoli":    "🥦",
//   "Arabidopsis": "🌿",
//   "Negative":    "⊖",
//   "Milk-based":  "🥛",
//   "Plant-based": "🌱",
// };

// const SAMPLE_SEQUENCES = [
//   "MKTIIALSYIFCLVFA",
//   "MKVLILACLVAVAVQGASREQLTEWTSSNVMEERWDSTEYQMMEEDQSALEM",
//   "ACDEFGHIKLMNPQRSTVWY",
//   "MGSSHHHHHHSSGLVPRGSHMASMTGGQQMGRDLYDDDDKDPNSSSVDKLAAALEHHHHHH",
// ];

// // ─── Toast ────────────────────────────────────────────────────────────────────

// const ToastMessage: React.FC<{ toast: Toast; onClose: () => void }> = ({ toast, onClose }) => {
//   const ok = toast.type === "success";
//   return (
//     <div
//       className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm mb-5"
//       style={{
//         background: ok ? "#f0fdf4" : "#fef2f2",
//         border: `1px solid ${ok ? "#bbf7d0" : "#fecaca"}`,
//         color: ok ? "#166534" : "#991b1b",
//       }}
//     >
//       {ok
//         ? <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
//         : <XCircle    size={16} className="flex-shrink-0 mt-0.5" />
//       }
//       <p className="flex-1 font-medium">{toast.message}</p>
//       <button onClick={onClose} className="opacity-50 hover:opacity-100 transition-opacity">
//         <X size={14} />
//       </button>
//     </div>
//   );
// };

// // ─── Result Card ──────────────────────────────────────────────────────────────

// const ResultCard: React.FC<{ result: PredictionResult }> = ({ result }) => {
//   const color = CLASS_COLORS[result.predicted_class] || "#64748b";
//   const bg    = CLASS_BG[result.predicted_class]     || "#f8fafc";
//   const emoji = TASTE_EMOJI[result.predicted_class]  || "❓";

//   if (!result.probabilities || typeof result.probabilities !== "object") {
//     return (
//       <div
//         className="mt-6 rounded-xl p-6 flex items-center gap-5"
//         style={{ background: bg, border: `1px solid ${color}30` }}
//       >
//         <div
//           className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
//           style={{ background: `${color}18` }}
//         >
//           {emoji}
//         </div>
//         <div>
//           <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Predicted Class</p>
//           <p className="text-3xl font-bold" style={{ color }}>{result.predicted_class}</p>
//           {result.confidence !== undefined && (
//             <span
//               className="inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full text-white"
//               style={{ background: color }}
//             >
//               {(result.confidence * 100).toFixed(1)}% confidence
//             </span>
//           )}
//           {result.sequence_length !== undefined && (
//             <p className="text-xs text-slate-400 mt-1">{result.sequence_length} amino acids</p>
//           )}
//         </div>
//       </div>
//     );
//   }

//   const sorted  = Object.entries(result.probabilities).sort(([, a], [, b]) => b - a);
//   const maxProb = sorted[0][1];

//   return (
//     <div className="mt-6 space-y-4">
//       <div
//         className="rounded-xl p-6 flex items-center gap-5"
//         style={{ background: bg, border: `1px solid ${color}30` }}
//       >
//         <div
//           className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
//           style={{ background: `${color}18` }}
//         >
//           {emoji}
//         </div>
//         <div className="flex-1">
//           <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Predicted Class</p>
//           <p className="text-2xl font-bold mb-2" style={{ color }}>{result.predicted_class}</p>
//           <div className="flex items-center gap-3 flex-wrap">
//             <span
//               className="text-xs font-semibold px-3 py-1 rounded-full text-white"
//               style={{ background: color }}
//             >
//               {((result.confidence ?? 0) * 100).toFixed(1)}% confidence
//             </span>
//             {result.processing_time_ms !== undefined && (
//               <span className="text-xs text-slate-400">
//                 {result.processing_time_ms.toFixed(0)}ms
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       <div
//         className="rounded-xl p-5"
//         style={{ background: "white", border: "1px solid #e2e8f0" }}
//       >
//         <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Class Probabilities</p>
//         <div className="space-y-3">
//           {sorted.map(([cls, prob]) => {
//             const isTop = cls === result.predicted_class;
//             const barPct = maxProb > 0 ? (prob / maxProb) * 100 : 0;
//             const c = CLASS_COLORS[cls] || "#64748b";
//             return (
//               <div key={cls}>
//                 <div className="flex items-center justify-between mb-1">
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm">{TASTE_EMOJI[cls] || "❓"}</span>
//                     <span className="text-sm font-semibold" style={{ color: isTop ? c : "#475569" }}>
//                       {cls}
//                     </span>
//                     {isTop && (
//                       <span
//                         className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
//                         style={{ background: `${c}15`, color: c }}
//                       >
//                         top
//                       </span>
//                     )}
//                   </div>
//                   <span className="text-sm font-semibold tabular-nums" style={{ color: isTop ? c : "#94a3b8" }}>
//                     {(prob * 100).toFixed(2)}%
//                   </span>
//                 </div>
//                 <div className="h-2 rounded-full overflow-hidden" style={{ background: "#f1f5f9" }}>
//                   <div
//                     className="h-2 rounded-full transition-all duration-700"
//                     style={{ width: `${barPct}%`, background: isTop ? c : `${c}50` }}
//                   />
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── Main Component ───────────────────────────────────────────────────────────

// const Predict: React.FC = () => {
//   const [tab,        setTab]        = useState<Tab>("molecule");
//   const [sequence,   setSequence]   = useState("");
//   const [seqLoading, setSeqLoading] = useState(false);
//   const [seqResult,  setSeqResult]  = useState<PredictionResult | null>(null);
//   const [seqToast,   setSeqToast]   = useState<Toast | null>(null);
//   const [seqElapsed, setSeqElapsed] = useState(0);

//   const [batchName,    setBatchName]    = useState("");
//   const [batchEmail,   setBatchEmail]   = useState("");
//   const [batchFile,    setBatchFile]    = useState<File | null>(null);
//   const [batchLoading, setBatchLoading] = useState(false);
//   const [batchToast,   setBatchToast]   = useState<Toast | null>(null);

//   const batchFileRef = useRef<HTMLInputElement>(null);
//   const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null);

//   useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

//   // ── Handlers ────────────────────────────────────────────────────────────────

//   const handleTrySample = () => {
//     const s = SAMPLE_SEQUENCES[Math.floor(Math.random() * SAMPLE_SEQUENCES.length)];
//     setSequence(s);
//     setSeqResult(null);
//     setSeqToast(null);
//   };

//   const handleSequencePredict = async () => {
//     if (!sequence.trim()) {
//       setSeqToast({ type: "error", message: "Please enter a protein sequence." });
//       return;
//     }
//     setSeqLoading(true);
//     setSeqResult(null);
//     setSeqToast(null);
//     setSeqElapsed(0);
//     timerRef.current = setInterval(() => setSeqElapsed(p => p + 1), 1000);
//     try {
//       const res = await fetch(`${API}/predict`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ sequence: sequence.trim() }),
//       });

//       const json = await res.json();

//       if (!res.ok || !json.success) {
//         throw new Error(json.error || `HTTP ${res.status}`);
//       }

//       const raw = json.data;
//       setSeqResult({
//         predicted_class: raw.prediction,
//         confidence:      raw.confidence,
//         sequence_length: raw.sequence_length,
//         probabilities:   raw.probabilities,
//         processing_time_ms: raw.processing_time_ms,
//       });
//       setSeqToast({ type: "success", message: "Prediction complete!" });
//     } catch (e: any) {
//       setSeqToast({ type: "error", message: e.message || "Prediction failed." });
//     } finally {
//       if (timerRef.current) clearInterval(timerRef.current);
//       setSeqLoading(false);
//     }
//   };

//   const handleBatchSubmit = async () => {
//     if (!batchName.trim() || !batchEmail.trim() || !batchFile) {
//       setBatchToast({ type: "error", message: "Please fill in all fields and select a file." });
//       return;
//     }
//     setBatchLoading(true);
//     setBatchToast(null);
//     try {
//       const fd = new FormData();
//       fd.append("name",  batchName);
//       fd.append("email", batchEmail);
//       fd.append("file",  batchFile);
//       const res = await fetch(`${API}/batch`, { method: "POST", body: fd });
//       if (!res.ok) {
//         const err = await res.json().catch(() => ({}));
//         throw new Error((err as any).error || `HTTP ${res.status}`);
//       }
//       setBatchToast({ type: "success", message: "Job submitted! Results will be emailed within 24–48 hours." });
//       setBatchName(""); setBatchEmail(""); setBatchFile(null);
//     } catch (e: any) {
//       setBatchToast({ type: "error", message: e.message || "Submission failed." });
//     } finally {
//       setBatchLoading(false);
//     }
//   };

//   // ── Shared input styles ─────────────────────────────────────────────────────

//   const inputClass = "w-full rounded-xl px-4 py-3 text-sm outline-none transition-all font-medium";
//   const inputStyle = { background: "#f8fafc", border: "1.5px solid #e2e8f0", color: "#0f172a" };
//   const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     e.target.style.border = "1.5px solid #1a56db";
//     e.target.style.background = "white";
//     e.target.style.boxShadow = "0 0 0 3px rgba(26,86,219,0.1)";
//   };
//   const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     e.target.style.border = "1.5px solid #e2e8f0";
//     e.target.style.background = "#f8fafc";
//     e.target.style.boxShadow = "none";
//   };

//   // ── Render ──────────────────────────────────────────────────────────────────

//   return (
//     <div style={{ background: "#f8fafc" }} className="min-h-screen pb-24">
//       <main className="max-w-6xl mx-auto px-5 py-14">

//         {/* Hero */}
//         <div className="mb-10">
//           <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
//             <Sparkles size={11} className="inline mr-1.5" />
//             EV Protein Analysis
//           </p>
//           <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Run Prediction</h1>
//           <p className="text-slate-500">Enter a protein sequence or upload a batch file to predict the food source.</p>
//         </div>

//         <div className="grid lg:grid-cols-12 gap-6">

//           {/* Sidebar */}
//           <div className="lg:col-span-3 space-y-2">
//             {([
//               ["molecule",  <Dna size={16} />,  "Single Molecule"],
//               ["batchFile", <Mail size={16} />, "Batch File"],
//             ] as [Tab, React.ReactNode, string][]).map(([id, icon, label]) => (
//               <button
//                 key={id}
//                 onClick={() => setTab(id)}
//                 className="w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all"
//                 style={
//                   tab === id
//                     ? { background: "#1a56db", color: "white", boxShadow: "0 4px 14px rgba(26,86,219,0.25)" }
//                     : { background: "white", color: "#475569", border: "1px solid #e2e8f0" }
//                 }
//               >
//                 {icon}
//                 <span>{label}</span>
//               </button>
//             ))}

//             {/* Info box */}
//             <div
//               className="rounded-xl p-4 mt-4"
//               style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}
//             >
//               <p className="text-xs font-semibold text-blue-800 mb-1.5">
//                 {tab === "molecule" ? "Input Format" : "File Format"}
//               </p>
//               <p className="text-xs text-blue-600 leading-relaxed">
//                 {tab === "molecule"
//                   ? "Enter a valid protein sequence using standard amino acid letters (e.g. MKTIIALSYIFCLVFA)."
//                   : "Upload .txt, .csv, or .fasta. Results emailed within 24–48 hours as CSV."
//                 }
//               </p>
//             </div>
//           </div>

//           {/* Content panel */}
//           <div className="lg:col-span-9">
//             <div
//               className="rounded-2xl p-6 md:p-8"
//               style={{ background: "white", border: "1px solid #e2e8f0" }}
//             >

//               {/* ── Molecule tab ── */}
//               {tab === "molecule" && (
//                 <>
//                   {seqToast && <ToastMessage toast={seqToast} onClose={() => setSeqToast(null)} />}

//                   <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
//                     Protein Sequence <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     value={sequence}
//                     onChange={e => setSequence(e.target.value)}
//                     className={`${inputClass} min-h-[140px] resize-y font-mono`}
//                     style={inputStyle}
//                     onFocus={onFocus}
//                     onBlur={onBlur}
//                     placeholder="e.g. MKTIIALSYIFCLVFA"
//                   />

//                   <div className="flex flex-col sm:flex-row gap-3 mt-5">
//                     <button
//                       onClick={handleTrySample}
//                       className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-slate-50 active:scale-[0.98]"
//                       style={{ background: "white", border: "1.5px solid #e2e8f0", color: "#475569" }}
//                     >
//                       Try Sample
//                     </button>
//                     <button
//                       onClick={handleSequencePredict}
//                       disabled={seqLoading}
//                       className="flex-2 py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-60 active:scale-[0.98]"
//                       style={{ background: "linear-gradient(135deg, #1a56db, #1e40af)", minWidth: "160px", flex: 2 }}
//                     >
//                       {seqLoading
//                         ? <><Loader2 size={15} className="animate-spin" /> Analyzing… {seqElapsed}s</>
//                         : <><FlaskConical size={15} /> Predict Source</>
//                       }
//                     </button>
//                   </div>

//                   {/* Loading progress */}
//                   {seqLoading && (
//                     <div
//                       className="mt-4 rounded-xl px-5 py-4 flex items-start gap-3"
//                       style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}
//                     >
//                       <Loader2 size={15} className="animate-spin flex-shrink-0 mt-0.5 text-blue-600" />
//                       <div className="flex-1">
//                         <p className="text-sm font-semibold text-blue-800">
//                           Running inference — {seqElapsed}s elapsed
//                         </p>
//                         <p className="text-xs text-blue-500 mt-0.5">
//                           {seqElapsed < 5
//                             ? "Generating ESM2 embeddings…"
//                             : seqElapsed < 12
//                             ? "Extracting features…"
//                             : seqElapsed < 30
//                             ? "Running stack classifier…"
//                             : "Still working — can take up to 60s on CPU."}
//                         </p>
//                         <div className="mt-2.5 h-1.5 rounded-full overflow-hidden bg-blue-100">
//                           <div
//                             className="h-1.5 rounded-full bg-blue-500 transition-all duration-1000"
//                             style={{ width: `${Math.min((seqElapsed / 60) * 100, 97)}%` }}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {seqResult && <ResultCard result={seqResult} />}
//                 </>
//               )}

//               {/* ── Batch file tab ── */}
//               {tab === "batchFile" && (
//                 <>
//                   {batchToast && <ToastMessage toast={batchToast} onClose={() => setBatchToast(null)} />}

//                   <div className="space-y-5">
//                     <div className="grid sm:grid-cols-2 gap-5">
//                       {[
//                         { label: "Full Name",  value: batchName,  set: setBatchName,  placeholder: "Jane Doe",         type: "text"  },
//                         { label: "Email",      value: batchEmail, set: setBatchEmail, placeholder: "jane@example.com", type: "email" },
//                       ].map(({ label, value, set, placeholder, type }) => (
//                         <div key={label}>
//                           <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
//                             {label} <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type={type}
//                             value={value}
//                             onChange={e => set(e.target.value)}
//                             className={inputClass}
//                             style={inputStyle}
//                             placeholder={placeholder}
//                             onFocus={onFocus}
//                             onBlur={onBlur}
//                           />
//                         </div>
//                       ))}
//                     </div>

//                     <div>
//                       <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
//                         Sequence File (.txt, .csv, .fasta) <span className="text-red-500">*</span>
//                       </label>
//                       <div
//                         className="rounded-xl p-6 text-center cursor-pointer transition-all"
//                         style={{ background: "#f8fafc", border: "2px dashed #e2e8f0" }}
//                         onClick={() => batchFileRef.current?.click()}
//                         onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#1a56db"; }}
//                         onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#e2e8f0"; }}
//                       >
//                         {batchFile ? (
//                           <div>
//                             <p className="text-sm font-semibold text-slate-800">{batchFile.name}</p>
//                             <p className="text-xs text-slate-400 mt-1">{(batchFile.size / 1024).toFixed(1)} KB</p>
//                           </div>
//                         ) : (
//                           <div>
//                             <Upload size={20} className="mx-auto mb-2 text-slate-300" />
//                             <p className="text-sm font-medium text-slate-500">Click to select file</p>
//                             <p className="text-xs text-slate-400 mt-0.5">.txt, .csv, .fasta accepted</p>
//                           </div>
//                         )}
//                         <input
//                           ref={batchFileRef}
//                           type="file"
//                           accept=".txt,.csv,.fasta"
//                           className="hidden"
//                           onChange={e => setBatchFile(e.target.files?.[0] || null)}
//                         />
//                       </div>
//                     </div>

//                     <button
//                       onClick={handleBatchSubmit}
//                       disabled={batchLoading}
//                       className="w-full py-3.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-60"
//                       style={{ background: "linear-gradient(135deg, #1a56db, #1e40af)" }}
//                     >
//                       {batchLoading
//                         ? <><Loader2 size={15} className="animate-spin" /> Submitting…</>
//                         : <><Mail size={15} /> Submit Batch Job</>
//                       }
//                     </button>
//                   </div>
//                 </>
//               )}

//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Predict;











import React, { useState, useRef, useEffect } from "react";
import {
  Dna, Upload, Mail, Sparkles, CheckCircle, XCircle,
  Loader2, X, ArrowRight, FlaskConical,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "molecule" | "batchFile";

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

// ─── Constants ────────────────────────────────────────────────────────────────

const API = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

const CLASS_COLORS: Record<string, string> = {
  Sweet:     "#2563eb",
  Bitter:    "#dc2626",
  Umami:     "#d97706",
  Sour:      "#16a34a",
  Undefined: "#64748b",
  "Cow Milk":    "#2563eb",
  "Human Milk":  "#7c3aed",
  "Citrus":      "#d97706",
  "Broccoli":    "#16a34a",
  "Arabidopsis": "#0d9488",
  "Negative":    "#64748b",
  "Milk-based":  "#2563eb",
  "Plant-based": "#16a34a",
};

const CLASS_BG: Record<string, string> = {
  Sweet:     "#eff6ff",
  Bitter:    "#fef2f2",
  Umami:     "#fffbeb",
  Sour:      "#f0fdf4",
  Undefined: "#f8fafc",
  "Cow Milk":    "#eff6ff",
  "Human Milk":  "#f5f3ff",
  "Citrus":      "#fffbeb",
  "Broccoli":    "#f0fdf4",
  "Arabidopsis": "#f0fdfa",
  "Negative":    "#f8fafc",
  "Milk-based":  "#eff6ff",
  "Plant-based": "#f0fdf4",
};

const TASTE_EMOJI: Record<string, string> = {
  Sweet:     "🍬",
  Bitter:    "☕",
  Umami:     "🍖",
  Sour:      "🍋",
  Undefined: "❓",
  "Cow Milk":    "🐄",
  "Human Milk":  "🤱",
  "Citrus":      "🍋",
  "Broccoli":    "🥦",
  "Arabidopsis": "🌿",
  "Negative":    "⊖",
  "Milk-based":  "🥛",
  "Plant-based": "🌱",
};

const SAMPLE_SEQUENCES = [
  "MKTIIALSYIFCLVFA",
  "MKVLILACLVAVAVQGASREQLTEWTSSNVMEERWDSTEYQMMEEDQSALEM",
  "ACDEFGHIKLMNPQRSTVWY",
  "MGSSHHHHHHSSGLVPRGSHMASMTGGQQMGRDLYDDDDKDPNSSSVDKLAAALEHHHHHH",
];

// ─── Toast ────────────────────────────────────────────────────────────────────

const ToastMessage: React.FC<{ toast: Toast; onClose: () => void }> = ({ toast, onClose }) => {
  const ok = toast.type === "success";
  return (
    <div
      className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm mb-5"
      style={{
        background: ok ? "#f0fdf4" : "#fef2f2",
        border: `1px solid ${ok ? "#bbf7d0" : "#fecaca"}`,
        color: ok ? "#166534" : "#991b1b",
      }}
    >
      {ok
        ? <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
        : <XCircle    size={16} className="flex-shrink-0 mt-0.5" />
      }
      <p className="flex-1 font-medium">{toast.message}</p>
      <button onClick={onClose} className="opacity-50 hover:opacity-100 transition-opacity">
        <X size={14} />
      </button>
    </div>
  );
};

// ─── Result Card ──────────────────────────────────────────────────────────────

const ResultCard: React.FC<{ result: PredictionResult }> = ({ result }) => {
  const color = CLASS_COLORS[result.predicted_class] || "#64748b";
  const bg    = CLASS_BG[result.predicted_class]     || "#f8fafc";
  const emoji = TASTE_EMOJI[result.predicted_class]  || "❓";

  if (!result.probabilities || typeof result.probabilities !== "object") {
    return (
      <div
        className="mt-6 rounded-xl p-6 flex items-center gap-5"
        style={{ background: bg, border: `1px solid ${color}30` }}
      >
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
          style={{ background: `${color}18` }}
        >
          {emoji}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Predicted Class</p>
          <p className="text-3xl font-bold" style={{ color }}>{result.predicted_class}</p>
          {result.confidence !== undefined && (
            <span
              className="inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full text-white"
              style={{ background: color }}
            >
              {(result.confidence * 100).toFixed(1)}% confidence
            </span>
          )}
          {result.sequence_length !== undefined && (
            <p className="text-xs text-slate-400 mt-1">{result.sequence_length} amino acids</p>
          )}
        </div>
      </div>
    );
  }

  const sorted  = Object.entries(result.probabilities).sort(([, a], [, b]) => b - a);
  const maxProb = sorted[0][1];

  return (
    <div className="mt-6 space-y-4">
      <div
        className="rounded-xl p-6 flex items-center gap-5"
        style={{ background: bg, border: `1px solid ${color}30` }}
      >
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
          style={{ background: `${color}18` }}
        >
          {emoji}
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Predicted Class</p>
          <p className="text-2xl font-bold mb-2" style={{ color }}>{result.predicted_class}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full text-white"
              style={{ background: color }}
            >
              {((result.confidence ?? 0) * 100).toFixed(1)}% confidence
            </span>
            {result.processing_time_ms !== undefined && (
              <span className="text-xs text-slate-400">
                {result.processing_time_ms.toFixed(0)}ms
              </span>
            )}
          </div>
        </div>
      </div>

      <div
        className="rounded-xl p-5"
        style={{ background: "white", border: "1px solid #e2e8f0" }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Class Probabilities</p>
        <div className="space-y-3">
          {sorted.map(([cls, prob]) => {
            const isTop = cls === result.predicted_class;
            const barPct = maxProb > 0 ? (prob / maxProb) * 100 : 0;
            const c = CLASS_COLORS[cls] || "#64748b";
            return (
              <div key={cls}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{TASTE_EMOJI[cls] || "❓"}</span>
                    <span className="text-sm font-semibold" style={{ color: isTop ? c : "#475569" }}>
                      {cls}
                    </span>
                    {isTop && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                        style={{ background: `${c}15`, color: c }}
                      >
                        top
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-semibold tabular-nums" style={{ color: isTop ? c : "#94a3b8" }}>
                    {(prob * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "#f1f5f9" }}>
                  <div
                    className="h-2 rounded-full transition-all duration-700"
                    style={{ width: `${barPct}%`, background: isTop ? c : `${c}50` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Predict: React.FC = () => {
  const [tab,        setTab]        = useState<Tab>("molecule");
  const [sequence,   setSequence]   = useState("");
  const [seqLoading, setSeqLoading] = useState(false);
  const [seqResult,  setSeqResult]  = useState<PredictionResult | null>(null);
  const [seqToast,   setSeqToast]   = useState<Toast | null>(null);
  const [seqElapsed, setSeqElapsed] = useState(0);

  const [batchName,    setBatchName]    = useState("");
  const [batchEmail,   setBatchEmail]   = useState("");
  const [batchFile,    setBatchFile]    = useState<File | null>(null);
  const [batchLoading, setBatchLoading] = useState(false);
  const [batchToast,   setBatchToast]   = useState<Toast | null>(null);

  const batchFileRef = useRef<HTMLInputElement>(null);
  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleTrySample = () => {
    const s = SAMPLE_SEQUENCES[Math.floor(Math.random() * SAMPLE_SEQUENCES.length)];
    setSequence(s);
    setSeqResult(null);
    setSeqToast(null);
  };

  // const handleSequencePredict = async () => {
  //   if (!sequence.trim()) {
  //     setSeqToast({ type: "error", message: "Please enter a protein sequence." });
  //     return;
  //   }
  //   setSeqLoading(true);
  //   setSeqResult(null);
  //   setSeqToast(null);
  //   setSeqElapsed(0);
  //   timerRef.current = setInterval(() => setSeqElapsed(p => p + 1), 1000);
  //   try {
  //     const res = await fetch(`${API}/predict`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ sequence: sequence.trim() }),
  //     });

  //     const json = await res.json();

  //     if (!res.ok || !json.success) {
  //       throw new Error(json.error || `HTTP ${res.status}`);
  //     }

  //     const raw = json.data;
  //     setSeqResult({
  //       predicted_class: raw.prediction,
  //       confidence:      raw.confidence,
  //       sequence_length: raw.sequence_length,
  //       probabilities:   raw.probabilities,
  //       processing_time_ms: raw.processing_time_ms,
  //     });
  //     setSeqToast({ type: "success", message: "Prediction complete!" });
  //   } catch (e: any) {
  //     setSeqToast({ type: "error", message: e.message || "Prediction failed." });
  //   } finally {
  //     if (timerRef.current) clearInterval(timerRef.current);
  //     setSeqLoading(false);
  //   }
  // };

  const handleSequencePredict = async () => {
    if (!sequence.trim()) {
      setSeqToast({
        type: "error",
        message: "Please enter a protein sequence.",
      });
      return;
    }
  
    setSeqLoading(true);
    setSeqResult(null);
    setSeqToast(null);
    setSeqElapsed(0);
  
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  
    timerRef.current = setInterval(() => {
      setSeqElapsed((prev) => prev + 1);
    }, 1000);
  
    try {
      // Submit prediction job
      const submitRes = await fetch(`${API}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sequence: sequence.trim(),
        }),
      });
  
      const submitJson = await submitRes.json();
  
      if (!submitRes.ok || !submitJson.success) {
        throw new Error(
          submitJson.error || `HTTP ${submitRes.status}`
        );
      }
  
      const currentJobId = submitJson.jobId;
  
      setJobId(currentJobId);
  
      // Poll every 5 seconds
      const pollInterval = setInterval(async () => {
        try {
          const statusRes = await fetch(
            `${API}/predict/status/${currentJobId}`
          );
  
          const statusJson = await statusRes.json();
  
          if (!statusRes.ok) {
            throw new Error(
              statusJson.error || "Failed to fetch job status"
            );
          }
  
          const job = statusJson.data;
  
          if (job.status === "COMPLETED") {
            clearInterval(pollInterval);
  
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
  
            const raw = job.result;
  
            setSeqResult({
              predicted_class: raw.prediction,
              confidence: raw.confidence,
              sequence_length: raw.sequence_length,
              probabilities: raw.probabilities,
              processing_time_ms: raw.processing_time_ms,
            });
  
            setSeqToast({
              type: "success",
              message: "Prediction complete!",
            });
  
            setSeqLoading(false);
            return;
          }
  
          if (job.status === "FAILED") {
            clearInterval(pollInterval);
  
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
  
            setSeqLoading(false);
  
            setSeqToast({
              type: "error",
              message: job.error || "Prediction failed.",
            });
  
            return;
          }
        } catch (err: any) {
          clearInterval(pollInterval);
  
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
  
          setSeqLoading(false);
  
          setSeqToast({
            type: "error",
            message: err.message || "Prediction failed.",
          });
        }
      }, 5000);
    } catch (e: any) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
  
      setSeqLoading(false);
  
      setSeqToast({
        type: "error",
        message: e.message || "Prediction failed.",
      });
    }
  };
  const handleBatchSubmit = async () => {
    if (!batchName.trim() || !batchEmail.trim() || !batchFile) {
      setBatchToast({ type: "error", message: "Please fill in all fields and select a file." });
      return;
    }
    setBatchLoading(true);
    setBatchToast(null);
    try {
      const fd = new FormData();
      fd.append("name",  batchName);
      fd.append("email", batchEmail);
      fd.append("file",  batchFile);
      const res = await fetch(`${API}/batch`, { method: "POST", body: fd });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as any).error || `HTTP ${res.status}`);
      }
      setBatchToast({ type: "success", message: "Job submitted! Results will be emailed within 24–48 hours." });
      setBatchName(""); setBatchEmail(""); setBatchFile(null);
    } catch (e: any) {
      setBatchToast({ type: "error", message: e.message || "Submission failed." });
    } finally {
      setBatchLoading(false);
    }
  };

  // ── Shared input styles ─────────────────────────────────────────────────────

  const inputClass = "w-full rounded-xl px-4 py-3 text-sm outline-none transition-all font-medium";
  const inputStyle = { background: "#f8fafc", border: "1.5px solid #e2e8f0", color: "#0f172a" };
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.border = "1.5px solid #1a56db";
    e.target.style.background = "white";
    e.target.style.boxShadow = "0 0 0 3px rgba(26,86,219,0.1)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.border = "1.5px solid #e2e8f0";
    e.target.style.background = "#f8fafc";
    e.target.style.boxShadow = "none";
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div style={{ background: "#f8fafc" }} className="min-h-screen pb-24">
      <main className="max-w-6xl mx-auto px-5 py-14">

        {/* Hero */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
            <Sparkles size={11} className="inline mr-1.5" />
            EV Protein Analysis
          </p>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Run Prediction</h1>
          <p className="text-slate-500">Enter a protein sequence or upload a batch file to predict the food source.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-2">
            {([
              ["molecule",  <Dna size={16} />,  "Single Molecule"],
              ["batchFile", <Mail size={16} />, "Batch File"],
            ] as [Tab, React.ReactNode, string][]).map(([id, icon, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className="w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all"
                style={
                  tab === id
                    ? { background: "#1a56db", color: "white", boxShadow: "0 4px 14px rgba(26,86,219,0.25)" }
                    : { background: "white", color: "#475569", border: "1px solid #e2e8f0" }
                }
              >
                {icon}
                <span>{label}</span>
              </button>
            ))}

            {/* Info box */}
            <div
              className="rounded-xl p-4 mt-4"
              style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}
            >
              <p className="text-xs font-semibold text-blue-800 mb-1.5">
                {tab === "molecule" ? "Input Format" : "File Format"}
              </p>
              <p className="text-xs text-blue-600 leading-relaxed">
                {tab === "molecule"
                  ? "Enter a valid protein sequence using standard amino acid letters (e.g. MKTIIALSYIFCLVFA)."
                  : "Upload .txt, .csv, or .fasta. Results emailed within 24–48 hours as CSV."
                }
              </p>
            </div>
          </div>

          {/* Content panel */}
          <div className="lg:col-span-9">
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{ background: "white", border: "1px solid #e2e8f0" }}
            >

              {/* ── Molecule tab ── */}
              {tab === "molecule" && (
                <>
                  {seqToast && <ToastMessage toast={seqToast} onClose={() => setSeqToast(null)} />}

                  <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                    Protein Sequence <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={sequence}
                    onChange={e => setSequence(e.target.value)}
                    className={`${inputClass} min-h-[140px] resize-y font-mono`}
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder="e.g. MKTIIALSYIFCLVFA"
                  />

                  <div className="flex flex-col sm:flex-row gap-3 mt-5">
                    <button
                      onClick={handleTrySample}
                      className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-slate-50 active:scale-[0.98]"
                      style={{ background: "white", border: "1.5px solid #e2e8f0", color: "#475569" }}
                    >
                      Try Sample
                    </button>
                    <button
                      onClick={handleSequencePredict}
                      disabled={seqLoading}
                      className="flex-2 py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-60 active:scale-[0.98]"
                      style={{ background: "linear-gradient(135deg, #1a56db, #1e40af)", minWidth: "160px", flex: 2 }}
                    >
                      {seqLoading
                        ? <><Loader2 size={15} className="animate-spin" /> Analyzing… {seqElapsed}s</>
                        : <><FlaskConical size={15} /> Predict Source</>
                      }
                    </button>
                  </div>

                  {/* Loading progress */}
                  {seqLoading && (
                    <div
                      className="mt-4 rounded-xl px-5 py-4 flex items-start gap-3"
                      style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}
                    >
                      <Loader2 size={15} className="animate-spin flex-shrink-0 mt-0.5 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-blue-800">
                        Prediction job running — {seqElapsed}s elapsed
                        </p>
                        <p className="text-xs text-blue-500 mt-0.5">
                          {seqElapsed < 5
                            ? "Generating ESM2 embeddings…"
                            : seqElapsed < 12
                            ? "Extracting features…"
                            : seqElapsed < 30
                            ? "Running stack classifier…"
                            : "Still processing — this may take 2–5 minutes."}
                        </p>
                        <div className="mt-2.5 h-1.5 rounded-full overflow-hidden bg-blue-100">
                          <div
                            className="h-1.5 rounded-full bg-blue-500 transition-all duration-1000"
                            style={{ width: `${Math.min((seqElapsed / 60) * 100, 97)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {seqResult && <ResultCard result={seqResult} />}
                </>
              )}

              {/* ── Batch file tab ── */}
              {tab === "batchFile" && (
                <>
                  {batchToast && <ToastMessage toast={batchToast} onClose={() => setBatchToast(null)} />}

                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      {[
                        { label: "Full Name",  value: batchName,  set: setBatchName,  placeholder: "Jane Doe",         type: "text"  },
                        { label: "Email",      value: batchEmail, set: setBatchEmail, placeholder: "jane@example.com", type: "email" },
                      ].map(({ label, value, set, placeholder, type }) => (
                        <div key={label}>
                          <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                            {label} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type={type}
                            value={value}
                            onChange={e => set(e.target.value)}
                            className={inputClass}
                            style={inputStyle}
                            placeholder={placeholder}
                            onFocus={onFocus}
                            onBlur={onBlur}
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                        Sequence File (.txt, .csv, .fasta) <span className="text-red-500">*</span>
                      </label>
                      <div
                        className="rounded-xl p-6 text-center cursor-pointer transition-all"
                        style={{ background: "#f8fafc", border: "2px dashed #e2e8f0" }}
                        onClick={() => batchFileRef.current?.click()}
                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#1a56db"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#e2e8f0"; }}
                      >
                        {batchFile ? (
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{batchFile.name}</p>
                            <p className="text-xs text-slate-400 mt-1">{(batchFile.size / 1024).toFixed(1)} KB</p>
                          </div>
                        ) : (
                          <div>
                            <Upload size={20} className="mx-auto mb-2 text-slate-300" />
                            <p className="text-sm font-medium text-slate-500">Click to select file</p>
                            <p className="text-xs text-slate-400 mt-0.5">.txt, .csv, .fasta accepted</p>
                          </div>
                        )}
                        <input
                          ref={batchFileRef}
                          type="file"
                          accept=".txt,.csv,.fasta"
                          className="hidden"
                          onChange={e => setBatchFile(e.target.files?.[0] || null)}
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleBatchSubmit}
                      disabled={batchLoading}
                      className="w-full py-3.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                      style={{ background: "linear-gradient(135deg, #1a56db, #1e40af)" }}
                    >
                      {batchLoading
                        ? <><Loader2 size={15} className="animate-spin" /> Submitting…</>
                        : <><Mail size={15} /> Submit Batch Job</>
                      }
                    </button>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Predict;