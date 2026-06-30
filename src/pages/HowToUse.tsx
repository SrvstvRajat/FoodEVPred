// import React, { useState } from "react";
// import { BookOpen, FileText, Mail, Info } from "lucide-react";
// // import OverviewImg  from "../images/Overview.png";   // replace with your image
// import SequenceImg  from "../images/Sequence.png";   // replace with your image
// import BatchFileImg from "../images/Batch.png";  // replace with your image

// type HelpTab = "overview" | "molecule" | "batchFile";

// const HowToUse: React.FC = () => {
//   const [tab, setTab] = useState<HelpTab>("overview");

//   const tabBtn = (active: boolean, icon: React.ReactNode, label: string) => (
//     <div
//       className="flex items-center gap-3 px-6 py-4 cursor-pointer transition-all rounded-2xl border font-bold text-sm uppercase tracking-widest"
//       style={{
//         background: active ? "#2C1810" : "white",
//         color: active ? "#F5F0E8" : "rgba(44,24,16,0.55)",
//         borderColor: active ? "#2C1810" : "rgba(44,24,16,0.1)",
//         boxShadow: active ? "0 8px 24px rgba(44,24,16,0.2)" : "none",
//       }}
//     >
//       {icon}
//       <span>{label}</span>
//     </div>
//   );

//   const imageBox = (label: string, IconComponent: React.ElementType, img: string) => (
//     <div className="bg-white rounded-[2.5rem] p-8 shadow-sm" style={{ border: "1px solid rgba(44,24,16,0.07)" }}>
//       <h3 className="text-xl font-black tracking-tight mb-6 flex items-center gap-2" style={{ color: "#2C1810" }}>
//         <IconComponent size={22} style={{ color: "#C84B2F" }} />
//         <span>{label}</span>
//       </h3>
//       <img src={img} alt={label} className="w-full h-auto object-contain rounded-[1.5rem]" />
//     </div>
//   );

//   const stepDot = (num: number, active: "blue" | "purple" | "green" | "orange") => {
//     const colors: Record<string, string> = {
//       blue: "#C84B2F",
//       purple: "#E8824A",
//       green: "#2C6B2F",
//       orange: "#D4882A",
//     };
//     return (
//       <span
//         className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white"
//         style={{ background: colors[active] }}
//       >
//         {num}
//       </span>
//     );
//   };

//   return (
//     <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #FDF6EC 0%, #F5EDD8 50%, #FDF0E0 100%)" }}>
//       <main className="max-w-7xl mx-auto px-6 py-12">

//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6"
//             style={{ background: "rgba(200,75,47,0.1)", color: "#C84B2F", border: "1px solid rgba(200,75,47,0.2)" }}>
//             <BookOpen size={13} />
//             <span>User Guide</span>
//           </div>
//           <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-4" style={{ color: "#2C1810" }}>
//             How To <span className="font-serif italic lowercase" style={{ color: "#C84B2F" }}>Use</span>
//           </h2>
//           <p className="font-medium" style={{ color: "rgba(44,24,16,0.55)" }}>
//             Learn how to use our prediction tools effectively
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-4 gap-6">
//           {/* Sidebar */}
//           <div className="lg:col-span-1 space-y-3">
//             <button onClick={() => setTab("overview")} className="w-full">
//               {tabBtn(tab === "overview", <Info size={18} />, "Overview")}
//             </button>
//             <button onClick={() => setTab("molecule")} className="w-full">
//               {tabBtn(tab === "molecule", <FileText size={18} />, "Molecule")}
//             </button>
//             <button onClick={() => setTab("batchFile")} className="w-full">
//               {tabBtn(tab === "batchFile", <Mail size={18} />, "Batch File")}
//             </button>
//           </div>

//           {/* Content */}
//           <div className="lg:col-span-3 space-y-6">
//             {tab === "overview" && (
//               <>
//                 {imageBox("multiev Platform Overview", Info, SequenceImg)}
//                 <div className="bg-white rounded-[2.5rem] p-8 shadow-sm" style={{ border: "1px solid rgba(44,24,16,0.07)" }}>
//                   <h4 className="font-black tracking-tight mb-6 text-lg" style={{ color: "#2C1810" }}>Platform Highlights</h4>
//                   <div className="grid md:grid-cols-2 gap-5">
//                     {[
//                       { dot: "#C84B2F", text: "Large dataset of 23,830 proteins (multiev and non-multiev)" },
//                       { dot: "#E8824A", text: "Pre-trained ESM2 model with BioPython feature extraction" },
//                       { dot: "#2C6B2F", text: "Stack model with 96.87% accuracy" },
//                       { dot: "#D488sr2A", text: "User-friendly interface for seamless predictions" },
//                     ].map(({ dot, text }, i) => (
//                       <div key={i} className="flex gap-3 items-start p-4 rounded-2xl" style={{ background: "#FDF6EC" }}>
//                         <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: dot }}></div>
//                         <p className="text-sm font-medium" style={{ color: "rgba(44,24,16,0.75)" }}>{text}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             )}

//             {tab === "molecule" && (
//               <>
//                 {imageBox("Molecule Prediction Interface", FileText, SequenceImg)}
//                 <div className="bg-white rounded-[2.5rem] p-8 shadow-sm" style={{ border: "1px solid rgba(44,24,16,0.07)" }}>
//                   <h4 className="font-black tracking-tight mb-6 text-lg" style={{ color: "#2C1810" }}>How to Use</h4>
//                   <ol className="space-y-4">
//                     {[
//                       "Enter your protein molecule in the input box under \"Molecule\"",
//                       "Format requires a single protein molecule in one line (no spaces or line breaks)",
//                       "Click \"Try Sample\" to test with an example molecule",
//                       "Click \"Predict\" to get instant multievicity prediction results",
//                     ].map((text, i) => (
//                       <li key={i} className="flex gap-4 items-start">
//                         {stepDot(i + 1, "blue")}
//                         <span className="text-sm font-medium pt-0.5" style={{ color: "rgba(44,24,16,0.75)" }}>{text}</span>
//                       </li>
//                     ))}
//                   </ol>
//                 </div>
//               </>
//             )}

//             {tab === "batchFile" && (
//               <>
//                 {imageBox("Batch File Processing", Mail, BatchFileImg)}
//                 <div className="bg-white rounded-[2.5rem] p-8 shadow-sm" style={{ border: "1px solid rgba(44,24,16,0.07)" }}>
//                   <h4 className="font-black tracking-tight mb-6 text-lg" style={{ color: "#2C1810" }}>Batch Processing Steps</h4>
//                   <ol className="space-y-4">
//                     {[
//                       "Upload your file (.txt, .csv, or .fasta) for large-scale batch processing",
//                       "Enter your full name and valid email address in the provided fields",
//                       "Double-check your email for accuracy as results will be sent there",
//                       "Prediction results will be emailed to you as a CSV file within 24-48 hours",
//                     ].map((text, i) => (
//                       <li key={i} className="flex gap-4 items-start">
//                         {stepDot(i + 1, "green")}
//                         <span className="text-sm font-medium pt-0.5" style={{ color: "rgba(44,24,16,0.75)" }}>{text}</span>
//                       </li>
//                     ))}
//                   </ol>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default HowToUse;

import React, { useState } from "react";
import { BookOpen, FileText, Mail, Info, CheckCircle } from "lucide-react";
import SequenceImg  from "../images/Sequence.png";
import BatchFileImg from "../images/Batch.png";

type HelpTab = "overview" | "molecule" | "batchFile";

// ─── Step list ────────────────────────────────────────────────────────────────

const StepItem: React.FC<{ num: number; text: string; color: string }> = ({ num, text, color }) => (
  <li className="flex items-start gap-3">
    <span
      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
      style={{ background: color }}
    >
      {num}
    </span>
    <span className="text-sm text-slate-600 pt-0.5 leading-relaxed">{text}</span>
  </li>
);

// ─── Image section ────────────────────────────────────────────────────────────

const ImageBox: React.FC<{ label: string; Icon: React.ElementType; img: string }> = ({ label, Icon, img }) => (
  <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid #e2e8f0" }}>
    <div className="px-6 py-4 flex items-center gap-2.5" style={{ borderBottom: "1px solid #f1f5f9" }}>
      <Icon size={16} className="text-blue-500" />
      <h3 className="text-sm font-semibold text-slate-800">{label}</h3>
    </div>
    <div className="p-4">
      <img src={img} alt={label} className="w-full h-auto object-contain rounded-lg" />
    </div>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────

const HowToUse: React.FC = () => {
  const [tab, setTab] = useState<HelpTab>("overview");

  const tabs: { id: HelpTab; Icon: React.ElementType; label: string }[] = [
    { id: "overview",  Icon: Info,     label: "Overview"     },
    { id: "molecule",  Icon: FileText, label: "Molecule"     },
    { id: "batchFile", Icon: Mail,     label: "Batch File"   },
  ];

  return (
    <div style={{ background: "#f8fafc" }} className="min-h-screen">
      <main className="max-w-6xl mx-auto px-5 py-14">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
            <BookOpen size={11} className="inline mr-1.5" />
            User Guide
          </p>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">How To Use</h1>
          <p className="text-slate-500">Learn how to use EVSource Predictor effectively.</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            {tabs.map(({ id, Icon, label }) => {
              const active = tab === id;
              return (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className="w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all"
                  style={
                    active
                      ? { background: "#1a56db", color: "white", boxShadow: "0 4px 14px rgba(26,86,219,0.25)" }
                      : { background: "white", color: "#475569", border: "1px solid #e2e8f0" }
                  }
                >
                  <Icon size={15} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-5">

            {tab === "overview" && (
              <>
                <ImageBox label="EVSource Predictor — Platform Overview" Icon={Info} img={SequenceImg} />
                <div className="rounded-2xl p-6" style={{ background: "white", border: "1px solid #e2e8f0" }}>
                  <h3 className="text-sm font-bold text-slate-900 mb-4">Platform Highlights</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      "Multi-class classification across 6 food-derived EV protein sources",
                      "Pre-trained ESM2 protein language model with Biopython feature extraction",
                      "Stack ensemble classifier achieving ~89% accuracy",
                      "Supports single protein and batch file (up to 200 sequences) prediction",
                    ].map((text, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3.5 rounded-xl"
                        style={{ background: "#f8fafc", border: "1px solid #f1f5f9" }}
                      >
                        <CheckCircle size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-slate-600 leading-relaxed">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {tab === "molecule" && (
              <>
                <ImageBox label="Single Protein Prediction" Icon={FileText} img={SequenceImg} />
                <div className="rounded-2xl p-6" style={{ background: "white", border: "1px solid #e2e8f0" }}>
                  <h3 className="text-sm font-bold text-slate-900 mb-4">Steps</h3>
                  <ol className="space-y-3.5">
                    {[
                      "Navigate to the Predict page and select the \"Single Molecule\" tab.",
                      "Enter your protein sequence in the input field (one sequence per prediction).",
                      "Click 'Try Sample' to auto-fill a test sequence and verify the interface.",
                      "Click \"Predict Source\" to receive an instant prediction with confidence scores.",
                    ].map((text, i) => (
                      <StepItem key={i} num={i + 1} text={text} color="#1a56db" />
                    ))}
                  </ol>
                </div>
              </>
            )}

            {tab === "batchFile" && (
              <>
                <ImageBox label="Batch File Processing" Icon={Mail} img={BatchFileImg} />
                <div className="rounded-2xl p-6" style={{ background: "white", border: "1px solid #e2e8f0" }}>
                  <h3 className="text-sm font-bold text-slate-900 mb-4">Steps</h3>
                  <ol className="space-y-3.5">
                    {[
                      "Navigate to the Predict page and select the \"Batch File\" tab.",
                      "Upload your sequence file in .txt, .csv, or .fasta format (up to 200 sequences).",
                      "Enter your full name and a valid email address where results will be delivered.",
                      "Click \"Submit Batch Job\" — your CSV results will be emailed within 24–48 hours.",
                    ].map((text, i) => (
                      <StepItem key={i} num={i + 1} text={text} color="#16a34a" />
                    ))}
                  </ol>
                  <div
                    className="mt-5 p-4 rounded-xl text-xs text-blue-700"
                    style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}
                  >
                    <strong>Tip:</strong> Download sample files from the Home page to verify your data format before submitting a batch job.
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default HowToUse;