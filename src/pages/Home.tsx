// // import React from "react";
// // import { NavLink } from "react-router-dom";
// // import {
// //   ArrowRight,
// //   Dna,
// //   FileSpreadsheet,
// //   FileText,
// //   Layers,
// //   Microscope,
// //   Zap,
// //   Database,
// //   TrendingUp,
// //   GitBranch,
// // } from "lucide-react";

// // // ─── Sample file data ────────────────────────────────────────────────────────

// // const sampleFiles = [
// //   {
// //     label: "Sample FASTA",
// //     ext: ".fasta",
// //     Icon: Dna,
// //     filename: "sample_sequences.fasta",
// //     content: `>EVSource_1|UniProt:P01234\nCCO\n>EVSource_2|UniProt:P56789\nCOC(=O)[C@@H](Cc1ccccc1)NC(=O)[C@@H](N)CC(=O)O\n>Negative_1|UniProt:Q12345\nOC(CC(O)(C(=O)O)CC(=O)O)(C(=O)O)`,
// //   },
// //   {
// //     label: "Sample CSV",
// //     ext: ".csv",
// //     Icon: FileSpreadsheet,
// //     filename: "sample_sequences.csv",
// //     content: `id,sequence,label\n1,CCO,CowMilk\n2,OC(CC(O)(C(=O)O)CC(=O)O)(C(=O)O),HumanMilk\n3,COC(=O)[C@@H](Cc1ccccc1)NC(=O)[C@@H](N)CC(=O)O,Negative`,
// //   },
// //   {
// //     label: "Sample TXT",
// //     ext: ".txt",
// //     Icon: FileText,
// //     filename: "sample_sequences.txt",
// //     content: `CCO\nOC(CC(O)(C(=O)O)CC(=O)O)(C(=O)O)\nCOC(=O)[C@@H](Cc1ccccc1)NC(=O)[C@@H](N)CC(=O)O`,
// //   },
// // ];

// // const handleDownload = (filename: string, content: string) => {
// //   const blob = new Blob([content], { type: "text/plain" });
// //   const url = URL.createObjectURL(blob);
// //   const a = document.createElement("a");
// //   a.href = url;
// //   a.download = filename;
// //   a.click();
// //   URL.revokeObjectURL(url);
// // };

// // // ─── Source classes ───────────────────────────────────────────────────────────

// // const SOURCE_CLASSES = [
// //   { label: "Cow Milk",    emoji: "🐄", color: "#2563eb", bg: "#eff6ff" },
// //   { label: "Human Milk",  emoji: "🤱", color: "#7c3aed", bg: "#f5f3ff" },
// //   { label: "Citrus",      emoji: "🍋", color: "#d97706", bg: "#fffbeb" },
// //   { label: "Broccoli",    emoji: "🥦", color: "#16a34a", bg: "#f0fdf4" },
// //   { label: "Arabidopsis", emoji: "🌿", color: "#0d9488", bg: "#f0fdfa" },
// //   { label: "Negative",    emoji: "⊖",  color: "#64748b", bg: "#f8fafc" },
// // ];

// // // ─── Component ────────────────────────────────────────────────────────────────

// // const Home: React.FC = () => {
// //   return (
// //     <div style={{ background: "rgb(234 248 255)" }} className="min-h-screen">

// //       {/* ── Hero ───────────────────────────────────────────────────────────── */}
// //       <section className="max-w-6xl mx-auto px-5 pt-16 pb-20">
// //         <div className="grid lg:grid-cols-12 gap-12 items-center">

// //           {/* Left */}
// //           <div className="lg:col-span-7">
// //             <div
// //               className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
// //               style={{ background: "#eff6ff", color: "#1a56db", border: "1px solid #bfdbfe" }}
// //             >
// //               <Microscope size={12} />
// //               <span>Extracellular Vesicle Protein Classification</span>
// //             </div>

// //             <h1
// //               className="text-[2.75rem] md:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-5"
// //               style={{ color: "#0f172a" }}
// //             >
// //               Predict the Source of<br />
// //               <span style={{ color: "#1a56db" }}>Food-Derived EV Proteins</span>
// //             </h1>

// //             <p
// //               className="text-lg leading-relaxed mb-8 max-w-xl"
// //               style={{ color: "#475569" }}
// //             >
// //               A sequence-level machine learning framework for multi-class classification of extracellular vesicle proteins from diverse edible food sources.
// //             </p>

// //             <div className="flex flex-wrap gap-3">
// //               <NavLink
// //                 to="/predict"
// //                 className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
// //                 style={{ background: "linear-gradient(135deg, #1a56db, #1e40af)" }}
// //               >
// //                 Start Predicting <ArrowRight size={15} />
// //               </NavLink>
// //               <NavLink
// //                 to="/about"
// //                 className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
// //                 style={{ background: "white", color: "#334155", border: "1px solid #e2e8f0" }}
// //               >
// //                 Learn More
// //               </NavLink>
// //             </div>
// //           </div>

// //           {/* Right: stat cards */}
// //           <div className="lg:col-span-5 grid grid-cols-2 gap-4 hidden md:grid">
// //             {[
// //               { icon: <Database size={20} />, value: "17K+",   label: "EV Proteins",       color: "#1a56db", bg: "#eff6ff" },
// //               { icon: <TrendingUp size={20}/>, value: "~89%",   label: "Classification Acc", color: "#16a34a", bg: "#f0fdf4" },
// //               { icon: <Layers size={20} />,    value: "6",      label: "Source Classes",     color: "#7c3aed", bg: "#f5f3ff" },
// //               { icon: <Zap size={20} />,       value: "<5s",    label: "Inference Time",     color: "#d97706", bg: "#fffbeb" },
// //             ].map(({ icon, value, label, color, bg }) => (
// //               <div
// //                 key={label}
// //                 className="rounded-xl p-5 flex flex-col gap-3"
// //                 style={{ background: "white", border: "1px solid #e2e8f0" }}
// //               >
// //                 <div
// //                   className="w-9 h-9 rounded-lg flex items-center justify-center"
// //                   style={{ background: bg, color }}
// //                 >
// //                   {icon}
// //                 </div>
// //                 <div>
// //                   <p className="text-2xl font-bold tracking-tight" style={{ color: "#0f172a" }}>{value}</p>
// //                   <p className="text-xs text-slate-500 font-medium mt-0.5">{label}</p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── Source Classes ───────────────────────────────────────────────────── */}
// //       <section className="max-w-6xl mx-auto px-5 pb-20">
// //         <div className="mb-7">
// //           <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1.5">Classification Targets</p>
// //           <h2 className="text-2xl font-bold text-slate-900">Predicted Source Classes</h2>
// //         </div>
// //         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
// //           {SOURCE_CLASSES.map(({ label, emoji, color, bg }) => (
// //             <div
// //               key={label}
// //               className="rounded-xl p-4 flex flex-col items-center gap-2.5 text-center transition-transform hover:-translate-y-0.5"
// //               style={{ background: bg, border: `1px solid ${color}20` }}
// //             >
// //               <span className="text-2xl">{emoji}</span>
// //               <span className="text-xs font-semibold" style={{ color }}>{label}</span>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* ── Pipeline overview ─────────────────────────────────────────────────── */}
// //       <section className="max-w-6xl mx-auto px-5 pb-20">
// //         <div
// //           className="rounded-2xl p-8 md:p-10"
// //           style={{ background: "white", border: "1px solid #e2e8f0" }}
// //         >
// //           <div className="grid md:grid-cols-2 gap-10 items-center">
// //             <div>
// //               <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Methodology</p>
// //               <h2 className="text-2xl font-bold text-slate-900 mb-4">Sequence-Level ML Pipeline</h2>
// //               <p className="text-slate-500 leading-relaxed mb-6">
// //                 SMILES-based feature extraction combined with pre-trained language models for multi-class EV protein source prediction. No ligand binding, docking, or molecular dynamics required.
// //               </p>
// //               <div className="space-y-3">
// //                 {[
// //                   { icon: <GitBranch size={15} />, text: "ESM2 protein language model embeddings" },
// //                   { icon: <Layers size={15} />,    text: "Biopython physicochemical feature extraction" },
// //                   { icon: <TrendingUp size={15} />, text: "Stack ensemble classifier (96.87% accuracy)" },
// //                 ].map(({ icon, text }) => (
// //                   <div key={text} className="flex items-center gap-3">
// //                     <div
// //                       className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
// //                       style={{ background: "#eff6ff", color: "#1a56db" }}
// //                     >
// //                       {icon}
// //                     </div>
// //                     <span className="text-sm text-slate-600">{text}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //               <NavLink
// //                 to="/about"
// //                 className="inline-flex items-center gap-2 mt-7 text-sm font-semibold transition-colors"
// //                 style={{ color: "#1a56db" }}
// //               >
// //                 View full methodology <ArrowRight size={14} />
// //               </NavLink>
// //             </div>

// //             {/* Architecture diagram placeholder */}
// //             <div
// //               className="rounded-xl h-52 flex flex-col items-center justify-center gap-3"
// //               style={{ background: "#f8fafc", border: "2px dashed #e2e8f0" }}
// //             >
// //               <Layers size={32} style={{ color: "#cbd5e1" }} />
// //               <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Workflow Diagram</span>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── Features bento ───────────────────────────────────────────────────── */}
// //       <section className="max-w-6xl mx-auto px-5 pb-20">
// //         <div className="mb-7">
// //           <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1.5">Capabilities</p>
// //           <h2 className="text-2xl font-bold text-slate-900">Core Features</h2>
// //         </div>
// //         <div className="grid md:grid-cols-3 gap-4">
// //           {[
// //             {
// //               icon: <Dna size={18} />,
// //               title: "Single Protein Prediction",
// //               desc: "Paste any protein sequence and get an instant source-class prediction with confidence scores.",
// //               color: "#2563eb", bg: "#eff6ff",
// //             },
// //             {
// //               icon: <FileSpreadsheet size={18} />,
// //               title: "Batch File Processing",
// //               desc: "Upload .txt, .csv, or .fasta files with up to 200 sequences. Results delivered via email.",
// //               color: "#16a34a", bg: "#f0fdf4",
// //             },
// //             {
// //               icon: <Database size={18} />,
// //               title: "Curated EV Database",
// //               desc: "Access high-confidence EV protein datasets from 5 food sources plus a curated negative class.",
// //               color: "#7c3aed", bg: "#f5f3ff",
// //             },
// //           ].map(({ icon, title, desc, color, bg }) => (
// //             <div
// //               key={title}
// //               className="rounded-xl p-6"
// //               style={{ background: "white", border: "1px solid #e2e8f0" }}
// //             >
// //               <div
// //                 className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
// //                 style={{ background: bg, color }}
// //               >
// //                 {icon}
// //               </div>
// //               <h3 className="text-sm font-semibold text-slate-900 mb-1.5">{title}</h3>
// //               <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* ── Sample Data ───────────────────────────────────────────────────────── */}
// //       <section className="max-w-6xl mx-auto px-5 pb-24">
// //         <div className="flex items-end justify-between mb-7">
// //           <div>
// //             <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1.5">Test Data</p>
// //             <h2 className="text-2xl font-bold text-slate-900">Sample Downloads</h2>
// //           </div>
// //           <NavLink
// //             to="/predict"
// //             className="text-sm font-semibold flex items-center gap-1.5 transition-colors"
// //             style={{ color: "#1a56db" }}
// //           >
// //             Try the predictor <ArrowRight size={14} />
// //           </NavLink>
// //         </div>

// //         <div className="grid md:grid-cols-3 gap-4">
// //           {sampleFiles.map(({ label, ext, Icon, filename, content }) => (
// //             <div
// //               key={label}
// //               className="rounded-xl p-5 flex items-center gap-4 group cursor-pointer transition-all hover:shadow-md"
// //               style={{ background: "white", border: "1px solid #e2e8f0" }}
// //               onClick={() => handleDownload(filename, content)}
// //             >
// //               <div
// //                 className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
// //                 style={{ background: "#eff6ff", color: "#1a56db" }}
// //               >
// //                 <Icon size={18} />
// //               </div>
// //               <div className="flex-1 min-w-0">
// //                 <p className="text-sm font-semibold text-slate-800">{label}</p>
// //                 <p className="text-xs text-slate-400 mt-0.5">{ext} format</p>
// //               </div>
// //               <ArrowRight
// //                 size={15}
// //                 className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all"
// //               />
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //     </div>
// //   );
// // };

// // export default Home;


// // import React from "react";
// // import { NavLink } from "react-router-dom";
// // import {
// //   ArrowRight, Dna, FileText, Layers, Microscope, Database, GitBranch, Cpu, Sparkles,
// // } from "lucide-react";

// // /*
// //   Design: "Premium SaaS" — Manrope display / Inter body, blue-600 primary +
// //   teal-500 accent, rounded-2xl cards with soft layered shadows and hover lift.
// //   Content corrected to match the real pipeline: ProtT5-XL → RFE-256 → scaler
// //   → {LR, SVM_RBF, MLP} → XGBoost meta-model, 3 output classes (Non-EV /
// //   Milk-based EV / Plant-based EV). No fabricated accuracy/latency figures.
// // */

// // const FontLoader: React.FC = () => (
// //   <style>{`
// //     @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
// //     .font-display { font-family: 'Manrope', sans-serif; }
// //     .font-body { font-family: 'Inter', sans-serif; }
// //   `}</style>
// // );

// // const T = {
// //   primary: "#2563EB",
// //   accent: "#14B8A6",
// //   bg: "#F8FAFC",
// //   text: "#0F172A",
// //   muted: "#64748B",
// // };

// // const cardClass =
// //   "rounded-2xl bg-white border border-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)]";
// // const cardHover =
// //   "transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_8px_rgba(15,23,42,0.06),0_20px_40px_rgba(15,23,42,0.10)]";

// // // ─── Sample file data — 3-class, FASTA/plain-text only ─────────────────────────

// // const sampleFiles = [
// //   {
// //     label: "Sample FASTA",
// //     ext: ".fasta",
// //     Icon: Dna,
// //     filename: "sample_sequences.fasta",
// //     content: `>sample_1\nMKTAYIAKQRQISFVKSHFSRQLEERLGLIEVQAPILSRVGDGTQDNLSG\n>sample_2\nMKVLILACLVAVAVQGASREQLTEWTSSNVMEERWDSTEYQMMEEDQSALEM`,
// //   },
// //   {
// //     label: "Sample TXT",
// //     ext: ".txt",
// //     Icon: FileText,
// //     filename: "sample_sequences.txt",
// //     content: `MKTAYIAKQRQISFVKSHFSRQLEERLGLIEVQAPILSRVGDGTQDNLSG\nMKVLILACLVAVAVQGASREQLTEWTSSNVMEERWDSTEYQMMEEDQSALEM\nACDEFGHIKLMNPQRSTVWY`,
// //   },
// // ];

// // const handleDownload = (filename: string, content: string) => {
// //   const blob = new Blob([content], { type: "text/plain" });
// //   const url = URL.createObjectURL(blob);
// //   const a = document.createElement("a");
// //   a.href = url;
// //   a.download = filename;
// //   a.click();
// //   URL.revokeObjectURL(url);
// // };

// // // ─── Output classes — matches LABEL_MAP in app.py exactly ─────────────────────

// // const OUTPUT_CLASSES = [
// //   { label: "Non-EV", desc: "No vesicular protein signature detected", color: T.muted, bg: "#F1F5F9" },
// //   { label: "Milk-based EV", desc: "Consistent with milk-derived extracellular vesicles", color: T.primary, bg: "#EFF6FF" },
// //   { label: "Plant-based EV", desc: "Consistent with plant-derived extracellular vesicles", color: T.accent, bg: "#F0FDFA" },
// // ];

// // const PIPELINE_STEPS = [
// //   { icon: <GitBranch size={16} />, text: "ProtT5-XL protein language model embedding (1024-dim, mean-pooled)" },
// //   { icon: <Layers size={16} />, text: "RFE-selected 256 dimensions, scaled to the training distribution" },
// //   { icon: <Cpu size={16} />, text: "Three base learners (LR, SVM, MLP) feed an XGBoost meta-model" },
// // ];

// // // ─── Component ────────────────────────────────────────────────────────────────

// // const Home: React.FC = () => {
// //   return (
// //     <div className="min-h-screen font-body" style={{ background: T.bg }}>
// //       <FontLoader />

// //       {/* ── Hero ───────────────────────────────────────────────────────────── */}
// //       <section className="relative overflow-hidden">
// //         <div
// //           className="absolute inset-0 pointer-events-none"
// //           style={{
// //             background:
// //               "radial-gradient(ellipse 800px 500px at 15% -10%, rgba(37,99,235,0.08), transparent), radial-gradient(ellipse 600px 400px at 100% 10%, rgba(20,184,166,0.08), transparent)",
// //           }}
// //         />
// //         <div className="relative max-w-6xl mx-auto px-5 pt-20 pb-16">
// //           <div className="grid lg:grid-cols-12 gap-14 items-start">

// //             <div className="lg:col-span-7">
// //               <div
// //                 className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6"
// //                 style={{ background: "#EFF6FF", color: T.primary }}
// //               >
// //                 <Microscope size={13} />
// //                 EV-MultiClass Classifier
// //               </div>

// //               <h1 className="font-display text-[2.75rem] md:text-[3.5rem] font-extrabold tracking-tight leading-[1.08] mb-6" style={{ color: T.text }}>
// //                 Where did this<br />
// //                 <span style={{ color: T.primary }}>protein</span> come from?
// //               </h1>

// //               <p className="text-lg leading-relaxed mb-9 max-w-xl" style={{ color: T.muted }}>
// //                 Paste a protein sequence and get a source call: non-vesicular, milk-derived,
// //                 or plant-derived extracellular vesicle protein — backed by a ProtT5-XL
// //                 embedding and a stacked ensemble classifier.
// //               </p>

// //               <div className="flex flex-wrap gap-3">
// //                 <NavLink
// //                   to="/predict"
// //                   className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
// //                   style={{ background: T.primary }}
// //                 >
// //                   Run a Prediction <ArrowRight size={16} />
// //                 </NavLink>
// //                 <NavLink
// //                   to="/about"
// //                   className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold bg-white border border-slate-200 transition-all duration-200 hover:border-slate-300 hover:-translate-y-0.5"
// //                   style={{ color: T.text }}
// //                 >
// //                   Methodology
// //                 </NavLink>
// //               </div>
// //             </div>

// //             {/* Right: output classes preview */}
// //             <div className="lg:col-span-5">
// //               <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: T.muted }}>
// //                 Output Classes
// //               </p>
// //               <div className="space-y-3">
// //                 {OUTPUT_CLASSES.map(({ label, desc, color, bg }) => (
// //                   <div
// //                     key={label}
// //                     className={`flex items-start gap-4 p-5 ${cardClass} ${cardHover}`}
// //                   >
// //                     <div
// //                       className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
// //                       style={{ background: bg, color }}
// //                     >
// //                       <Sparkles size={17} />
// //                     </div>
// //                     <div>
// //                       <p className="font-display text-sm font-bold mb-1" style={{ color: T.text }}>{label}</p>
// //                       <p className="text-xs leading-relaxed" style={{ color: T.muted }}>{desc}</p>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── Pipeline overview ─────────────────────────────────────────────────── */}
// //       <section className="max-w-6xl mx-auto px-5 pb-20">
// //         <div className={`grid md:grid-cols-2 gap-10 p-10 ${cardClass}`}>
// //           <div>
// //             <p className="text-xs font-bold uppercase tracking-widest mb-2.5" style={{ color: T.primary }}>
// //               Methodology
// //             </p>
// //             <h2 className="font-display text-2xl font-extrabold mb-4" style={{ color: T.text }}>
// //               Sequence-Level Classification Pipeline
// //             </h2>
// //             <p className="leading-relaxed mb-7" style={{ color: T.muted }}>
// //               Every sequence is embedded with a pre-trained protein language model, reduced
// //               to the most informative dimensions, and passed through a stacked ensemble —
// //               no structural data, docking, or molecular dynamics required.
// //             </p>
// //             <div className="space-y-4">
// //               {PIPELINE_STEPS.map(({ icon, text }) => (
// //                 <div key={text} className="flex items-start gap-3.5">
// //                   <div
// //                     className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
// //                     style={{ background: "#EFF6FF", color: T.primary }}
// //                   >
// //                     {icon}
// //                   </div>
// //                   <span className="text-sm leading-relaxed pt-1" style={{ color: T.text }}>{text}</span>
// //                 </div>
// //               ))}
// //             </div>
// //             <NavLink
// //               to="/about"
// //               className="inline-flex items-center gap-2 mt-8 text-sm font-semibold transition-colors hover:gap-3"
// //               style={{ color: T.primary }}
// //             >
// //               Full methodology <ArrowRight size={15} />
// //             </NavLink>
// //           </div>

// //           <div
// //             className="flex flex-col items-center justify-center gap-3 rounded-xl p-8"
// //             style={{ background: T.bg, border: "2px dashed #E2E8F0" }}
// //           >
// //             <Layers size={32} style={{ color: "#CBD5E1" }} />
// //             <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#94A3B8" }}>
// //               Workflow Diagram
// //             </span>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── Capabilities ──────────────────────────────────────────────────────── */}
// //       <section className="max-w-6xl mx-auto px-5 pb-20">
// //         <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: T.primary }}>
// //           Capabilities
// //         </p>
// //         <h2 className="font-display text-2xl font-extrabold mb-7" style={{ color: T.text }}>
// //           What You Can Run
// //         </h2>
// //         <div className="grid md:grid-cols-2 gap-5">
// //           {[
// //             {
// //               icon: <Dna size={20} />,
// //               title: "Single Sequence",
// //               desc: "Paste any protein sequence and get a source-class prediction with full probability breakdown.",
// //               color: T.primary, bg: "#EFF6FF",
// //             },
// //             {
// //               icon: <Database size={20} />,
// //               title: "Batch File",
// //               desc: "Upload a .txt or .fasta file with up to 50 sequences and get results back in one run.",
// //               color: T.accent, bg: "#F0FDFA",
// //             },
// //           ].map(({ icon, title, desc, color, bg }) => (
// //             <div key={title} className={`p-7 ${cardClass} ${cardHover}`}>
// //               <div
// //                 className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
// //                 style={{ background: bg, color }}
// //               >
// //                 {icon}
// //               </div>
// //               <h3 className="font-display text-base font-bold mb-2" style={{ color: T.text }}>{title}</h3>
// //               <p className="text-sm leading-relaxed" style={{ color: T.muted }}>{desc}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* ── Sample data ───────────────────────────────────────────────────────── */}
// //       <section className="max-w-6xl mx-auto px-5 pb-24">
// //         <div className="flex items-end justify-between mb-7">
// //           <div>
// //             <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: T.primary }}>
// //               Test Data
// //             </p>
// //             <h2 className="font-display text-2xl font-extrabold" style={{ color: T.text }}>Sample Downloads</h2>
// //           </div>
// //           <NavLink
// //             to="/predict"
// //             className="text-sm font-semibold flex items-center gap-1.5 transition-colors hover:gap-2.5"
// //             style={{ color: T.primary }}
// //           >
// //             Try the predictor <ArrowRight size={15} />
// //           </NavLink>
// //         </div>

// //         <div className="grid md:grid-cols-2 gap-5">
// //           {sampleFiles.map(({ label, ext, Icon, filename, content }) => (
// //             <button
// //               key={label}
// //               className={`flex items-center gap-4 p-6 text-left group ${cardClass} ${cardHover} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
// //               onClick={() => handleDownload(filename, content)}
// //             >
// //               <div
// //                 className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
// //                 style={{ background: "#EFF6FF", color: T.primary }}
// //               >
// //                 <Icon size={18} />
// //               </div>
// //               <div className="flex-1 min-w-0">
// //                 <p className="font-display text-sm font-bold" style={{ color: T.text }}>{label}</p>
// //                 <p className="text-xs mt-0.5" style={{ color: T.muted }}>{ext} format</p>
// //               </div>
// //               <ArrowRight
// //                 size={16}
// //                 style={{ color: "#CBD5E1" }}
// //                 className="group-hover:translate-x-1 group-hover:text-blue-600 transition-all"
// //               />
// //             </button>
// //           ))}
// //         </div>
// //       </section>

// //     </div>
// //   );
// // };

// // export default Home;




// // import React, { useEffect, useState } from "react";
// // import { NavLink } from "react-router-dom";
// // import {
// //   ArrowRight,
// //   Dna,
// //   FileText,
// //   Layers,
// //   Microscope,
// //   Database,
// //   GitBranch,
// //   Cpu,
// //   Fingerprint,
// //   Terminal,
// // } from "lucide-react";

// // /*
// //   Design: "Sequencer at Night" — an ink-navy lab console rather than a generic
// //   SaaS gradient page. Space Grotesk for display type (technical, geometric),
// //   Inter for body copy, IBM Plex Mono for anything that IS data: eyebrows,
// //   labels, and the raw amino acid readout. The signature element is the
// //   Sequence Decoder in the hero — a live readout that scrambles like a
// //   sequencer trace and resolves into a real classification, because that
// //   resolve-from-noise moment is literally what this product does.

// //   Pipeline stays true to the real model: ProtT5-XL embedding → RFE-256 →
// //   {LR, SVM_RBF, MLP} base learners → XGBoost meta-model → 3 classes
// //   (Non-EV / Milk-based EV / Plant-based EV). No fabricated metrics.
// // */

// // const FontLoader: React.FC = () => (
// //   <style>{`
// //     @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
// //     .font-display { font-family: 'Space Grotesk', sans-serif; }
// //     .font-body { font-family: 'Inter', sans-serif; }
// //     .font-mono { font-family: 'IBM Plex Mono', monospace; }

// //     @keyframes scanline {
// //       0% { transform: translateY(-100%); }
// //       100% { transform: translateY(100%); }
// //     }
// //     @keyframes pulseGlow {
// //       0%, 100% { opacity: 0.55; }
// //       50% { opacity: 1; }
// //     }
// //     @keyframes fillBar {
// //       from { width: 0%; }
// //     }
// //   `}</style>
// // );

// // // ─── Tokens ─────────────────────────────────────────────────────────────────

// // const T = {
// //   ink: "#1B2436",
// //   surface: "#242F45",
// //   surfaceRaised: "#2B3752",
// //   hairline: "rgba(232,236,243,0.12)",
// //   hairlineStrong: "rgba(232,236,243,0.22)",
// //   text: "#F1F4F9",
// //   muted: "#A7B0C4",
// //   primary: "#2DD4BF", // bioluminescent teal — milk-based EV
// //   primaryDim: "rgba(45,212,191,0.12)",
// //   amber: "#F0B429", // plant-based EV
// //   amberDim: "rgba(240,180,41,0.12)",
// //   slate: "#8B93A7", // non-EV
// //   slateDim: "rgba(139,147,167,0.12)",
// // };

// // const cardClass =
// //   "rounded-2xl border transition-all duration-300";
// // const cardStyle: React.CSSProperties = {
// //   background: T.surface,
// //   borderColor: T.hairline,
// // };
// // const cardHover =
// //   "hover:-translate-y-1 hover:border-[rgba(45,212,191,0.35)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)]";

// // // ─── Sample file data — 3-class, FASTA/plain-text only ─────────────────────────

// // const sampleFiles = [
// //   {
// //     label: "Sample FASTA",
// //     ext: ".fasta",
// //     Icon: Dna,
// //     filename: "sample_sequences.fasta",
// //     content: `>sample_1\nMKTAYIAKQRQISFVKSHFSRQLEERLGLIEVQAPILSRVGDGTQDNLSG\n>sample_2\nMKVLILACLVAVAVQGASREQLTEWTSSNVMEERWDSTEYQMMEEDQSALEM`,
// //   },
// //   {
// //     label: "Sample TXT",
// //     ext: ".txt",
// //     Icon: FileText,
// //     filename: "sample_sequences.txt",
// //     content: `MKTAYIAKQRQISFVKSHFSRQLEERLGLIEVQAPILSRVGDGTQDNLSG\nMKVLILACLVAVAVQGASREQLTEWTSSNVMEERWDSTEYQMMEEDQSALEM\nACDEFGHIKLMNPQRSTVWY`,
// //   },
// // ];

// // const handleDownload = (filename: string, content: string) => {
// //   const blob = new Blob([content], { type: "text/plain" });
// //   const url = URL.createObjectURL(blob);
// //   const a = document.createElement("a");
// //   a.href = url;
// //   a.download = filename;
// //   a.click();
// //   URL.revokeObjectURL(url);
// // };

// // // ─── Output classes — matches LABEL_MAP in app.py exactly ─────────────────────

// // const OUTPUT_CLASSES = [
// //   { label: "Non-EV", desc: "No vesicular protein signature detected", color: T.slate, bg: T.slateDim },
// //   { label: "Milk-based EV", desc: "Consistent with milk-derived extracellular vesicles", color: T.primary, bg: T.primaryDim },
// //   { label: "Plant-based EV", desc: "Consistent with plant-derived extracellular vesicles", color: T.amber, bg: T.amberDim },
// // ];

// // const PIPELINE_STEPS = [
// //   {
// //     n: "01",
// //     icon: <GitBranch size={16} />,
// //     title: "Embed",
// //     text: "ProtT5-XL protein language model embedding, 1024 dimensions, mean-pooled over residues.",
// //   },
// //   {
// //     n: "02",
// //     icon: <Layers size={16} />,
// //     title: "Select & scale",
// //     text: "Recursive feature elimination to 256 dimensions, scaled to the training distribution.",
// //   },
// //   {
// //     n: "03",
// //     icon: <Cpu size={16} />,
// //     title: "Ensemble",
// //     text: "LR, SVM (RBF), and MLP base learners feed an XGBoost meta-model for the final call.",
// //   },
// // ];

// // // ─── Signature element: live sequence decoder ──────────────────────────────────

// // const AA = "ACDEFGHIKLMNPQRSTVWY";
// // const randomSeq = (len: number) =>
// //   Array.from({ length: len }, () => AA[Math.floor(Math.random() * AA.length)]).join("");

// // const DECODER_SAMPLES = [
// //   {
// //     seq: "MKTAYIAKQRQISFVKSHFSRQLEER",
// //     label: "Milk-based EV",
// //     confidence: 94,
// //     color: T.primary,
// //     bg: T.primaryDim,
// //   },
// //   {
// //     seq: "MKVLILACLVAVAVQGASREQLTEWT",
// //     label: "Plant-based EV",
// //     confidence: 91,
// //     color: T.amber,
// //     bg: T.amberDim,
// //   },
// //   {
// //     seq: "ACDEFGHIKLMNPQRSTVWYACDEFG",
// //     label: "Non-EV",
// //     confidence: 88,
// //     color: T.slate,
// //     bg: T.slateDim,
// //   },
// // ];

// // const SequenceDecoder: React.FC = () => {
// //   const [activeIndex, setActiveIndex] = useState(0);
// //   const [displaySeq, setDisplaySeq] = useState(() => randomSeq(DECODER_SAMPLES[0].seq.length));
// //   const [revealed, setRevealed] = useState(false);

// //   const active = DECODER_SAMPLES[activeIndex];

// //   useEffect(() => {
// //     setRevealed(false);
// //     setDisplaySeq(randomSeq(active.seq.length));
// //     const scramble = setInterval(() => setDisplaySeq(randomSeq(active.seq.length)), 55);
// //     const reveal = setTimeout(() => {
// //       clearInterval(scramble);
// //       setDisplaySeq(active.seq);
// //       setRevealed(true);
// //     }, 650);
// //     return () => {
// //       clearInterval(scramble);
// //       clearTimeout(reveal);
// //     };
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [activeIndex]);

// //   useEffect(() => {
// //     const cycle = setInterval(() => {
// //       setActiveIndex((i) => (i + 1) % DECODER_SAMPLES.length);
// //     }, 4200);
// //     return () => clearInterval(cycle);
// //   }, []);

// //   return (
// //     <div
// //       className="relative overflow-hidden rounded-2xl border"
// //       style={{ background: T.surfaceRaised, borderColor: T.hairline }}
// //     >
// //       {/* scanning sweep */}
// //       <div
// //         className="absolute inset-x-0 h-24 pointer-events-none opacity-40"
// //         style={{
// //           background: `linear-gradient(180deg, transparent, ${T.primary}22, transparent)`,
// //           animation: "scanline 3.2s linear infinite",
// //         }}
// //       />

// //       <div className="relative px-6 py-5 flex items-center justify-between border-b" style={{ borderColor: T.hairline }}>
// //         <div className="flex items-center gap-2.5">
// //           <Terminal size={14} style={{ color: T.primary }} />
// //           <span className="font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: T.muted }}>
// //             sequence_decoder.live
// //           </span>
// //         </div>
// //         <div className="flex gap-1.5">
// //           <span className="w-2 h-2 rounded-full" style={{ background: T.hairlineStrong }} />
// //           <span className="w-2 h-2 rounded-full" style={{ background: T.hairlineStrong }} />
// //           <span
// //             className="w-2 h-2 rounded-full"
// //             style={{ background: T.primary, animation: "pulseGlow 1.8s ease-in-out infinite" }}
// //           />
// //         </div>
// //       </div>

// //       <div className="relative px-6 py-7">
// //         <p className="font-mono text-[10px] uppercase tracking-[0.15em] mb-2.5" style={{ color: T.muted }}>
// //           input sequence
// //         </p>
// //         <p
// //           className="font-mono text-[15px] leading-relaxed break-all mb-6 min-h-[3.2em]"
// //           style={{ color: revealed ? T.text : "rgba(232,236,243,0.35)" }}
// //         >
// //           {displaySeq}
// //         </p>

// //         <div className="flex items-center justify-between mb-3">
// //           <p className="font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: T.muted }}>
// //             predicted class
// //           </p>
// //           {revealed && (
// //             <span className="font-mono text-[11px]" style={{ color: active.color }}>
// //               {active.confidence}% confidence
// //             </span>
// //           )}
// //         </div>

// //         <div
// //           className="flex items-center gap-3 rounded-xl px-4 py-3 transition-opacity duration-300"
// //           style={{ background: active.bg, opacity: revealed ? 1 : 0.3 }}
// //         >
// //           <Fingerprint size={16} style={{ color: active.color }} />
// //           <span className="font-display text-sm font-semibold" style={{ color: active.color }}>
// //             {revealed ? active.label : "resolving\u2026"}
// //           </span>
// //         </div>

// //         <div className="mt-2.5 h-1 rounded-full overflow-hidden" style={{ background: T.hairline }}>
// //           <div
// //             key={activeIndex}
// //             className="h-full rounded-full"
// //             style={{
// //               background: active.color,
// //               width: revealed ? `${active.confidence}%` : "0%",
// //               transition: "width 0.6s ease-out",
// //             }}
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ─── Component ────────────────────────────────────────────────────────────────

// // const Home: React.FC = () => {
// //   return (
// //     <div className="min-h-screen font-body" style={{ background: T.ink }}>
// //       <FontLoader />

// //       {/* faint amino-acid field texture, purely atmospheric */}
// //       <div
// //         aria-hidden
// //         className="fixed inset-0 pointer-events-none select-none font-mono text-[11px] leading-[1.4] overflow-hidden"
// //         style={{ color: "rgba(232,236,243,0.045)", wordBreak: "break-all", padding: "2rem" }}
// //       >
// //         {Array.from({ length: 60 }).map((_, i) => (
// //           <span key={i}>{randomSeq(90)} </span>
// //         ))}
// //       </div>

// //       {/* ── Hero ───────────────────────────────────────────────────────────── */}
// //       <section className="relative overflow-hidden">
// //         <div
// //           className="absolute inset-0 pointer-events-none"
// //           style={{
// //             background:
// //               "radial-gradient(ellipse 900px 560px at 10% -10%, rgba(45,212,191,0.14), transparent), radial-gradient(ellipse 700px 460px at 105% 15%, rgba(240,180,41,0.08), transparent)",
// //           }}
// //         />
// //         <div className="relative max-w-6xl mx-auto px-5 pt-24 pb-20">
// //           <div className="grid lg:grid-cols-12 gap-14 items-start">
// //             <div className="lg:col-span-7">
// //               <div
// //                 className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 border"
// //                 style={{ borderColor: T.hairlineStrong, background: "rgba(45,212,191,0.06)" }}
// //               >
// //                 <Microscope size={13} style={{ color: T.primary }} />
// //                 <span className="font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: T.primary }}>
// //                   ev-multiclass classifier
// //                 </span>
// //               </div>

// //               <h1
// //                 className="font-display text-[2.75rem] md:text-[3.6rem] font-semibold tracking-tight leading-[1.06] mb-7"
// //                 style={{ color: T.text }}
// //               >
// //                 Every protein
// //                 <br />
// //                 has a point of origin.
// //               </h1>

// //               <p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: T.muted }}>
// //                 Paste a sequence and get a source call — non-vesicular, milk-derived, or
// //                 plant-derived extracellular vesicle protein — from a ProtT5-XL embedding
// //                 run through a stacked ensemble classifier.
// //               </p>

// //               <div className="flex flex-wrap gap-3">
// //                 <NavLink
// //                   to="/predict"
// //                   className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
// //                   style={{ background: T.primary, color: "#06110F" }}
// //                 >
// //                   Run a prediction <ArrowRight size={16} />
// //                 </NavLink>
// //                 <NavLink
// //                   to="/about"
// //                   className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold border transition-all duration-200 hover:-translate-y-0.5"
// //                   style={{ borderColor: T.hairlineStrong, color: T.text }}
// //                 >
// //                   Methodology
// //                 </NavLink>
// //               </div>
// //             </div>

// //             <div className="lg:col-span-5">
// //               <SequenceDecoder />
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── Output classes ───────────────────────────────────────────────────── */}
// //       <section className="relative max-w-6xl mx-auto px-5 pb-20">
// //         <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-2.5" style={{ color: T.primary }}>
// //           output classes
// //         </p>
// //         <h2 className="font-display text-2xl font-semibold mb-8" style={{ color: T.text }}>
// //           Three calls, one prediction
// //         </h2>
// //         <div className="grid md:grid-cols-3 gap-5">
// //           {OUTPUT_CLASSES.map(({ label, desc, color, bg }) => (
// //             <div key={label} className={`${cardClass} ${cardHover} p-6`} style={cardStyle}>
// //               <div
// //                 className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
// //                 style={{ background: bg, color }}
// //               >
// //                 <Fingerprint size={17} />
// //               </div>
// //               <p className="font-display text-base font-semibold mb-1.5" style={{ color: T.text }}>
// //                 {label}
// //               </p>
// //               <p className="text-sm leading-relaxed" style={{ color: T.muted }}>
// //                 {desc}
// //               </p>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* ── Pipeline overview ─────────────────────────────────────────────────── */}
// //       <section className="relative max-w-6xl mx-auto px-5 pb-20">
// //         <div className={`${cardClass} p-9 md:p-11`} style={cardStyle}>
// //           <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-2.5" style={{ color: T.primary }}>
// //             methodology
// //           </p>
// //           <h2 className="font-display text-2xl font-semibold mb-3" style={{ color: T.text }}>
// //             Sequence in, source out
// //           </h2>
// //           <p className="leading-relaxed mb-10 max-w-2xl" style={{ color: T.muted }}>
// //             Three fixed stages, run in order every time. No structural data, docking,
// //             or molecular dynamics required — the sequence alone carries the signal.
// //           </p>

// //           <div className="grid md:grid-cols-3 gap-px rounded-xl overflow-hidden" style={{ background: T.hairline }}>
// //             {PIPELINE_STEPS.map(({ n, icon, title, text }) => (
// //               <div key={n} className="p-7" style={{ background: T.surface }}>
// //                 <div className="flex items-center gap-3 mb-4">
// //                   <span className="font-mono text-xs" style={{ color: T.primary }}>
// //                     {n}
// //                   </span>
// //                   <div
// //                     className="w-8 h-8 rounded-lg flex items-center justify-center"
// //                     style={{ background: T.primaryDim, color: T.primary }}
// //                   >
// //                     {icon}
// //                   </div>
// //                 </div>
// //                 <p className="font-display text-sm font-semibold mb-2" style={{ color: T.text }}>
// //                   {title}
// //                 </p>
// //                 <p className="text-sm leading-relaxed" style={{ color: T.muted }}>
// //                   {text}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>

// //           <NavLink
// //             to="/about"
// //             className="inline-flex items-center gap-2 mt-8 text-sm font-semibold transition-colors hover:gap-3"
// //             style={{ color: T.primary }}
// //           >
// //             Full methodology <ArrowRight size={15} />
// //           </NavLink>
// //         </div>
// //       </section>

// //       {/* ── Capabilities ──────────────────────────────────────────────────────── */}
// //       <section className="relative max-w-6xl mx-auto px-5 pb-20">
// //         <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-2.5" style={{ color: T.primary }}>
// //           capabilities
// //         </p>
// //         <h2 className="font-display text-2xl font-semibold mb-8" style={{ color: T.text }}>
// //           What you can run
// //         </h2>
// //         <div className="grid md:grid-cols-2 gap-5">
// //           {[
// //             {
// //               icon: <Dna size={20} />,
// //               title: "Single sequence",
// //               desc: "Paste any protein sequence and get a source-class prediction with a full probability breakdown.",
// //             },
// //             {
// //               icon: <Database size={20} />,
// //               title: "Batch file",
// //               desc: "Upload a .txt or .fasta file with up to 50 sequences and get results back in one run.",
// //             },
// //           ].map(({ icon, title, desc }) => (
// //             <div key={title} className={`${cardClass} ${cardHover} p-7`} style={cardStyle}>
// //               <div
// //                 className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
// //                 style={{ background: T.primaryDim, color: T.primary }}
// //               >
// //                 {icon}
// //               </div>
// //               <h3 className="font-display text-base font-semibold mb-2" style={{ color: T.text }}>
// //                 {title}
// //               </h3>
// //               <p className="text-sm leading-relaxed" style={{ color: T.muted }}>
// //                 {desc}
// //               </p>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* ── Sample data ───────────────────────────────────────────────────────── */}
// //       <section className="relative max-w-6xl mx-auto px-5 pb-24">
// //         <div className="flex items-end justify-between mb-8">
// //           <div>
// //             <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-2.5" style={{ color: T.primary }}>
// //               test data
// //             </p>
// //             <h2 className="font-display text-2xl font-semibold" style={{ color: T.text }}>
// //               Sample downloads
// //             </h2>
// //           </div>
// //           <NavLink
// //             to="/predict"
// //             className="text-sm font-semibold flex items-center gap-1.5 transition-colors hover:gap-2.5"
// //             style={{ color: T.primary }}
// //           >
// //             Try the predictor <ArrowRight size={15} />
// //           </NavLink>
// //         </div>

// //         <div className="grid md:grid-cols-2 gap-5">
// //           {sampleFiles.map(({ label, ext, Icon, filename, content }) => (
// //             <button
// //               key={label}
// //               className={`flex items-center gap-4 p-6 text-left group ${cardClass} ${cardHover} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
// //               style={{ ...cardStyle, outlineColor: T.primary }}
// //               onClick={() => handleDownload(filename, content)}
// //             >
// //               <div
// //                 className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
// //                 style={{ background: T.primaryDim, color: T.primary }}
// //               >
// //                 <Icon size={18} />
// //               </div>
// //               <div className="flex-1 min-w-0">
// //                 <p className="font-display text-sm font-semibold" style={{ color: T.text }}>
// //                   {label}
// //                 </p>
// //                 <p className="font-mono text-xs mt-1" style={{ color: T.muted }}>
// //                   {ext} format
// //                 </p>
// //               </div>
// //               <ArrowRight
// //                 size={16}
// //                 style={{ color: T.muted }}
// //                 className="group-hover:translate-x-1 transition-all duration-200"
// //               />
// //             </button>
// //           ))}
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default Home;






// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   ArrowRight,
//   Dna,
//   FileText,
//   Layers,
//   Microscope,
//   Database,
//   GitBranch,
//   Cpu,
//   Fingerprint,
//   Terminal,
// } from "lucide-react";

// /*
//   Design: "Sequencer at Night" — an ink-navy lab console rather than a generic
//   SaaS gradient page. Space Grotesk for display type (technical, geometric),
//   Inter for body copy, IBM Plex Mono for anything that IS data: eyebrows,
//   labels, and the raw amino acid readout. The signature element is the
//   Sequence Decoder in the hero — a live readout that scrambles like a
//   sequencer trace and resolves into a real classification, because that
//   resolve-from-noise moment is literally what this product does.

//   Pipeline stays true to the real model: ProtT5-XL embedding → RFE-256 →
//   {LR, SVM_RBF, MLP} base learners → XGBoost meta-model → 3 classes
//   (Non-EV / Milk-based EV / Plant-based EV). No fabricated metrics.
// */

// const FontLoader: React.FC = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
//     .font-display { font-family: 'Space Grotesk', sans-serif; }
//     .font-body { font-family: 'Inter', sans-serif; }
//     .font-mono { font-family: 'IBM Plex Mono', monospace; }

//     @keyframes scanline {
//       0% { transform: translateY(-100%); }
//       100% { transform: translateY(100%); }
//     }
//     @keyframes pulseGlow {
//       0%, 100% { opacity: 0.55; }
//       50% { opacity: 1; }
//     }
//     @keyframes fillBar {
//       from { width: 0%; }
//     }
//   `}</style>
// );

// // ─── Tokens ─────────────────────────────────────────────────────────────────

// const T = {
//   ink: "#F4F8F5",
//   surface: "#FFFFFF",
//   surfaceRaised: "#EEF5F0",
//   hairline: "rgba(15,23,42,0.08)",
//   hairlineStrong: "rgba(15,23,42,0.14)",
//   text: "#16211C",
//   muted: "#5F6E66",
//   primary: "#1F9E88", // soft emerald teal — milk-based EV
//   primaryDim: "rgba(31,158,136,0.10)",
//   amber: "#D98A46", // soft clay — plant-based EV
//   amberDim: "rgba(217,138,70,0.12)",
//   slate: "#8A97A6", // non-EV
//   slateDim: "rgba(138,151,166,0.12)",
// };

// const cardClass =
//   "rounded-2xl border transition-all duration-300";
// const cardStyle: React.CSSProperties = {
//   background: T.surface,
//   borderColor: T.hairline,
// };
// const cardHover =
//   "hover:-translate-y-1 hover:border-[rgba(31,158,136,0.35)] hover:shadow-[0_16px_40px_rgba(22,33,28,0.10)]";

// // ─── Sample file data — 3-class, FASTA/plain-text only ─────────────────────────

// const sampleFiles = [
//   {
//     label: "Sample FASTA",
//     ext: ".fasta",
//     Icon: Dna,
//     filename: "sample_sequences.fasta",
//     content: `>sample_1\nMKTAYIAKQRQISFVKSHFSRQLEERLGLIEVQAPILSRVGDGTQDNLSG\n>sample_2\nMKVLILACLVAVAVQGASREQLTEWTSSNVMEERWDSTEYQMMEEDQSALEM`,
//   },
//   {
//     label: "Sample TXT",
//     ext: ".txt",
//     Icon: FileText,
//     filename: "sample_sequences.txt",
//     content: `MKTAYIAKQRQISFVKSHFSRQLEERLGLIEVQAPILSRVGDGTQDNLSG\nMKVLILACLVAVAVQGASREQLTEWTSSNVMEERWDSTEYQMMEEDQSALEM\nACDEFGHIKLMNPQRSTVWY`,
//   },
// ];

// const handleDownload = (filename: string, content: string) => {
//   const blob = new Blob([content], { type: "text/plain" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = filename;
//   a.click();
//   URL.revokeObjectURL(url);
// };

// // ─── Output classes — matches LABEL_MAP in app.py exactly ─────────────────────

// const OUTPUT_CLASSES = [
//   { label: "Non-EV", desc: "No vesicular protein signature detected", color: T.slate, bg: T.slateDim },
//   { label: "Milk-based EV", desc: "Consistent with milk-derived extracellular vesicles", color: T.primary, bg: T.primaryDim },
//   { label: "Plant-based EV", desc: "Consistent with plant-derived extracellular vesicles", color: T.amber, bg: T.amberDim },
// ];

// const PIPELINE_STEPS = [
//   {
//     n: "01",
//     icon: <GitBranch size={16} />,
//     title: "Embed",
//     text: "ProtT5-XL protein language model embedding, 1024 dimensions, mean-pooled over residues.",
//   },
//   {
//     n: "02",
//     icon: <Layers size={16} />,
//     title: "Select & scale",
//     text: "Recursive feature elimination to 256 dimensions, scaled to the training distribution.",
//   },
//   {
//     n: "03",
//     icon: <Cpu size={16} />,
//     title: "Ensemble",
//     text: "LR, SVM (RBF), and MLP base learners feed an XGBoost meta-model for the final call.",
//   },
// ];

// // ─── Signature element: live sequence decoder ──────────────────────────────────

// const AA = "ACDEFGHIKLMNPQRSTVWY";
// const randomSeq = (len: number) =>
//   Array.from({ length: len }, () => AA[Math.floor(Math.random() * AA.length)]).join("");

// const DECODER_SAMPLES = [
//   {
//     seq: "MKTAYIAKQRQISFVKSHFSRQLEER",
//     label: "Milk-based EV",
//     confidence: 94,
//     color: T.primary,
//     bg: T.primaryDim,
//   },
//   {
//     seq: "MKVLILACLVAVAVQGASREQLTEWT",
//     label: "Plant-based EV",
//     confidence: 91,
//     color: T.amber,
//     bg: T.amberDim,
//   },
//   {
//     seq: "ACDEFGHIKLMNPQRSTVWYACDEFG",
//     label: "Non-EV",
//     confidence: 88,
//     color: T.slate,
//     bg: T.slateDim,
//   },
// ];

// const SequenceDecoder: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [displaySeq, setDisplaySeq] = useState(() => randomSeq(DECODER_SAMPLES[0].seq.length));
//   const [revealed, setRevealed] = useState(false);

//   const active = DECODER_SAMPLES[activeIndex];

//   useEffect(() => {
//     setRevealed(false);
//     setDisplaySeq(randomSeq(active.seq.length));
//     const scramble = setInterval(() => setDisplaySeq(randomSeq(active.seq.length)), 55);
//     const reveal = setTimeout(() => {
//       clearInterval(scramble);
//       setDisplaySeq(active.seq);
//       setRevealed(true);
//     }, 650);
//     return () => {
//       clearInterval(scramble);
//       clearTimeout(reveal);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [activeIndex]);

//   useEffect(() => {
//     const cycle = setInterval(() => {
//       setActiveIndex((i) => (i + 1) % DECODER_SAMPLES.length);
//     }, 4200);
//     return () => clearInterval(cycle);
//   }, []);

//   return (
//     <div
//       className="relative overflow-hidden rounded-2xl border"
//       style={{ background: T.surfaceRaised, borderColor: T.hairline }}
//     >
//       {/* scanning sweep */}
//       <div
//         className="absolute inset-x-0 h-24 pointer-events-none opacity-40"
//         style={{
//           background: `linear-gradient(180deg, transparent, ${T.primary}22, transparent)`,
//           animation: "scanline 3.2s linear infinite",
//         }}
//       />

//       <div className="relative px-6 py-5 flex items-center justify-between border-b" style={{ borderColor: T.hairline }}>
//         <div className="flex items-center gap-2.5">
//           <Terminal size={14} style={{ color: T.primary }} />
//           <span className="font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: T.muted }}>
//             sequence_decoder.live
//           </span>
//         </div>
//         <div className="flex gap-1.5">
//           <span className="w-2 h-2 rounded-full" style={{ background: T.hairlineStrong }} />
//           <span className="w-2 h-2 rounded-full" style={{ background: T.hairlineStrong }} />
//           <span
//             className="w-2 h-2 rounded-full"
//             style={{ background: T.primary, animation: "pulseGlow 1.8s ease-in-out infinite" }}
//           />
//         </div>
//       </div>

//       <div className="relative px-6 py-7">
//         <p className="font-mono text-[10px] uppercase tracking-[0.15em] mb-2.5" style={{ color: T.muted }}>
//           input sequence
//         </p>
//         <p
//           className="font-mono text-[15px] leading-relaxed break-all mb-6 min-h-[3.2em]"
//           style={{ color: revealed ? T.text : "rgba(22,33,28,0.32)" }}
//         >
//           {displaySeq}
//         </p>

//         <div className="flex items-center justify-between mb-3">
//           <p className="font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: T.muted }}>
//             predicted class
//           </p>
//           {revealed && (
//             <span className="font-mono text-[11px]" style={{ color: active.color }}>
//               {active.confidence}% confidence
//             </span>
//           )}
//         </div>

//         <div
//           className="flex items-center gap-3 rounded-xl px-4 py-3 transition-opacity duration-300"
//           style={{ background: active.bg, opacity: revealed ? 1 : 0.3 }}
//         >
//           <Fingerprint size={16} style={{ color: active.color }} />
//           <span className="font-display text-sm font-semibold" style={{ color: active.color }}>
//             {revealed ? active.label : "resolving\u2026"}
//           </span>
//         </div>

//         <div className="mt-2.5 h-1 rounded-full overflow-hidden" style={{ background: T.hairline }}>
//           <div
//             key={activeIndex}
//             className="h-full rounded-full"
//             style={{
//               background: active.color,
//               width: revealed ? `${active.confidence}%` : "0%",
//               transition: "width 0.6s ease-out",
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── Component ────────────────────────────────────────────────────────────────

// const Home: React.FC = () => {
//   return (
//     <div className="min-h-screen font-body" style={{ background: T.ink }}>
//       <FontLoader />

//       {/* faint amino-acid field texture, purely atmospheric */}
//       <div
//         aria-hidden
//         className="fixed inset-0 pointer-events-none select-none font-mono text-[11px] leading-[1.4] overflow-hidden"
//         style={{ color: "rgba(22,33,28,0.035)", wordBreak: "break-all", padding: "2rem" }}
//       >
//         {Array.from({ length: 60 }).map((_, i) => (
//           <span key={i}>{randomSeq(90)} </span>
//         ))}
//       </div>

//       {/* ── Hero ───────────────────────────────────────────────────────────── */}
//       <section className="relative overflow-hidden">
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background:
//               "radial-gradient(ellipse 900px 560px at 10% -10%, rgba(31,158,136,0.10), transparent), radial-gradient(ellipse 700px 460px at 105% 15%, rgba(217,138,70,0.08), transparent)",
//           }}
//         />
//         <div className="relative max-w-6xl mx-auto px-5 pt-24 pb-20">
//           <div className="grid lg:grid-cols-12 gap-14 items-start">
//             <div className="lg:col-span-7">
//               <div
//                 className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 border"
//                 style={{ borderColor: T.hairlineStrong, background: "rgba(45,212,191,0.06)" }}
//               >
//                 <Microscope size={13} style={{ color: T.primary }} />
//                 <span className="font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: T.primary }}>
//                   ev-multiclass classifier
//                 </span>
//               </div>

//               <h1
//                 className="font-display text-[2.75rem] md:text-[3.6rem] font-semibold tracking-tight leading-[1.06] mb-7"
//                 style={{ color: T.text }}
//               >
//                 Every protein
//                 <br />
//                 has a point of origin.
//               </h1>

//               <p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: T.muted }}>
//                 Paste a sequence and get a source call — non-vesicular, milk-derived, or
//                 plant-derived extracellular vesicle protein — from a ProtT5-XL embedding
//                 run through a stacked ensemble classifier.
//               </p>

//               <div className="flex flex-wrap gap-3">
//                 <NavLink
//                   to="/predict"
//                   className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
//                   style={{ background: T.primary, color: "#FFFFFF" }}
//                 >
//                   Run a prediction <ArrowRight size={16} />
//                 </NavLink>
//                 <NavLink
//                   to="/about"
//                   className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold border transition-all duration-200 hover:-translate-y-0.5"
//                   style={{ borderColor: T.hairlineStrong, color: T.text }}
//                 >
//                   Methodology
//                 </NavLink>
//               </div>
//             </div>

//             <div className="lg:col-span-5">
//               <SequenceDecoder />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── Output classes ───────────────────────────────────────────────────── */}
//       <section className="relative max-w-6xl mx-auto px-5 pb-20">
//         <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-2.5" style={{ color: T.primary }}>
//           output classes
//         </p>
//         <h2 className="font-display text-2xl font-semibold mb-8" style={{ color: T.text }}>
//           Three calls, one prediction
//         </h2>
//         <div className="grid md:grid-cols-3 gap-5">
//           {OUTPUT_CLASSES.map(({ label, desc, color, bg }) => (
//             <div key={label} className={`${cardClass} ${cardHover} p-6`} style={cardStyle}>
//               <div
//                 className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
//                 style={{ background: bg, color }}
//               >
//                 <Fingerprint size={17} />
//               </div>
//               <p className="font-display text-base font-semibold mb-1.5" style={{ color: T.text }}>
//                 {label}
//               </p>
//               <p className="text-sm leading-relaxed" style={{ color: T.muted }}>
//                 {desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ── Pipeline overview ─────────────────────────────────────────────────── */}
//       <section className="relative max-w-6xl mx-auto px-5 pb-20">
//         <div className={`${cardClass} p-9 md:p-11`} style={cardStyle}>
//           <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-2.5" style={{ color: T.primary }}>
//             methodology
//           </p>
//           <h2 className="font-display text-2xl font-semibold mb-3" style={{ color: T.text }}>
//             Sequence in, source out
//           </h2>
//           <p className="leading-relaxed mb-10 max-w-2xl" style={{ color: T.muted }}>
//             Three fixed stages, run in order every time. No structural data, docking,
//             or molecular dynamics required — the sequence alone carries the signal.
//           </p>

//           <div className="grid md:grid-cols-3 gap-px rounded-xl overflow-hidden" style={{ background: T.hairline }}>
//             {PIPELINE_STEPS.map(({ n, icon, title, text }) => (
//               <div key={n} className="p-7" style={{ background: T.surface }}>
//                 <div className="flex items-center gap-3 mb-4">
//                   <span className="font-mono text-xs" style={{ color: T.primary }}>
//                     {n}
//                   </span>
//                   <div
//                     className="w-8 h-8 rounded-lg flex items-center justify-center"
//                     style={{ background: T.primaryDim, color: T.primary }}
//                   >
//                     {icon}
//                   </div>
//                 </div>
//                 <p className="font-display text-sm font-semibold mb-2" style={{ color: T.text }}>
//                   {title}
//                 </p>
//                 <p className="text-sm leading-relaxed" style={{ color: T.muted }}>
//                   {text}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <NavLink
//             to="/about"
//             className="inline-flex items-center gap-2 mt-8 text-sm font-semibold transition-colors hover:gap-3"
//             style={{ color: T.primary }}
//           >
//             Full methodology <ArrowRight size={15} />
//           </NavLink>
//         </div>
//       </section>

//       {/* ── Capabilities ──────────────────────────────────────────────────────── */}
//       <section className="relative max-w-6xl mx-auto px-5 pb-20">
//         <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-2.5" style={{ color: T.primary }}>
//           capabilities
//         </p>
//         <h2 className="font-display text-2xl font-semibold mb-8" style={{ color: T.text }}>
//           What you can run
//         </h2>
//         <div className="grid md:grid-cols-2 gap-5">
//           {[
//             {
//               icon: <Dna size={20} />,
//               title: "Single sequence",
//               desc: "Paste any protein sequence and get a source-class prediction with a full probability breakdown.",
//             },
//             {
//               icon: <Database size={20} />,
//               title: "Batch file",
//               desc: "Upload a .txt or .fasta file with up to 50 sequences and get results back in one run.",
//             },
//           ].map(({ icon, title, desc }) => (
//             <div key={title} className={`${cardClass} ${cardHover} p-7`} style={cardStyle}>
//               <div
//                 className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
//                 style={{ background: T.primaryDim, color: T.primary }}
//               >
//                 {icon}
//               </div>
//               <h3 className="font-display text-base font-semibold mb-2" style={{ color: T.text }}>
//                 {title}
//               </h3>
//               <p className="text-sm leading-relaxed" style={{ color: T.muted }}>
//                 {desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ── Sample data ───────────────────────────────────────────────────────── */}
//       <section className="relative max-w-6xl mx-auto px-5 pb-24">
//         <div className="flex items-end justify-between mb-8">
//           <div>
//             <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-2.5" style={{ color: T.primary }}>
//               test data
//             </p>
//             <h2 className="font-display text-2xl font-semibold" style={{ color: T.text }}>
//               Sample downloads
//             </h2>
//           </div>
//           <NavLink
//             to="/predict"
//             className="text-sm font-semibold flex items-center gap-1.5 transition-colors hover:gap-2.5"
//             style={{ color: T.primary }}
//           >
//             Try the predictor <ArrowRight size={15} />
//           </NavLink>
//         </div>

//         <div className="grid md:grid-cols-2 gap-5">
//           {sampleFiles.map(({ label, ext, Icon, filename, content }) => (
//             <button
//               key={label}
//               className={`flex items-center gap-4 p-6 text-left group ${cardClass} ${cardHover} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
//               style={{ ...cardStyle, outlineColor: T.primary }}
//               onClick={() => handleDownload(filename, content)}
//             >
//               <div
//                 className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
//                 style={{ background: T.primaryDim, color: T.primary }}
//               >
//                 <Icon size={18} />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="font-display text-sm font-semibold" style={{ color: T.text }}>
//                   {label}
//                 </p>
//                 <p className="font-mono text-xs mt-1" style={{ color: T.muted }}>
//                   {ext} format
//                 </p>
//               </div>
//               <ArrowRight
//                 size={16}
//                 style={{ color: T.muted }}
//                 className="group-hover:translate-x-1 transition-all duration-200"
//               />
//             </button>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ArrowRight,
  Dna,
  FileText,
  Layers,
  Microscope,
  Database,
  GitBranch,
  Cpu,
  Fingerprint,
  Terminal,
} from "lucide-react";

/*
  Design: "Sequencer at Night" — an ink-navy lab console rather than a generic
  SaaS gradient page. Space Grotesk for display type (technical, geometric),
  Inter for body copy, IBM Plex Mono for anything that IS data: eyebrows,
  labels, and the raw amino acid readout. The signature element is the
  Sequence Decoder in the hero — a live readout that scrambles like a
  sequencer trace and resolves into a real classification, because that
  resolve-from-noise moment is literally what this product does.

  Pipeline stays true to the real model: ProtT5-XL embedding → RFE-256 →
  {LR, SVM_RBF, MLP} base learners → XGBoost meta-model → 3 classes
  (Non-EV / Milk-based EV / Plant-based EV). No fabricated metrics.
*/

const FontLoader: React.FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
    .font-display { font-family: 'Space Grotesk', sans-serif; }
    .font-body { font-family: 'Inter', sans-serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }

    @keyframes scanline {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100%); }
    }
    @keyframes pulseGlow {
      0%, 100% { opacity: 0.55; }
      50% { opacity: 1; }
    }
    @keyframes fillBar {
      from { width: 0%; }
    }
  `}</style>
);

// ─── Tokens ─────────────────────────────────────────────────────────────────

const T = {
  ink: "#F4F8F5",
  surface: "#FFFFFF",
  surfaceRaised: "#EEF5F0",
  hairline: "rgba(15,23,42,0.08)",
  hairlineStrong: "rgba(15,23,42,0.14)",
  text: "#16211C",
  muted: "#5F6E66",
  primary: "#1F9E88", // soft emerald teal — milk-based EV
  primaryDim: "rgba(31,158,136,0.10)",
  amber: "#D98A46", // soft clay — plant-based EV
  amberDim: "rgba(217,138,70,0.12)",
  slate: "#8A97A6", // non-EV
  slateDim: "rgba(138,151,166,0.12)",
};

const cardClass =
  "rounded-2xl border transition-all duration-300";
const cardStyle: React.CSSProperties = {
  background: T.surface,
  borderColor: T.hairline,
};
const cardHover =
  "hover:-translate-y-1 hover:border-[rgba(31,158,136,0.35)] hover:shadow-[0_16px_40px_rgba(22,33,28,0.10)]";

// ─── Sample file data — 3-class, FASTA/plain-text only ─────────────────────────

const sampleFiles = [
  {
    label: "Sample FASTA",
    ext: ".fasta",
    Icon: Dna,
    filename: "sample_sequences.fasta",
    content: `>sample_1\nMKTAYIAKQRQISFVKSHFSRQLEERLGLIEVQAPILSRVGDGTQDNLSG\n>sample_2\nMKVLILACLVAVAVQGASREQLTEWTSSNVMEERWDSTEYQMMEEDQSALEM`,
  },
  {
    label: "Sample TXT",
    ext: ".txt",
    Icon: FileText,
    filename: "sample_sequences.txt",
    content: `MKTAYIAKQRQISFVKSHFSRQLEERLGLIEVQAPILSRVGDGTQDNLSG\nMKVLILACLVAVAVQGASREQLTEWTSSNVMEERWDSTEYQMMEEDQSALEM\nACDEFGHIKLMNPQRSTVWY`,
  },
];

const handleDownload = (filename: string, content: string) => {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// ─── Output classes — matches LABEL_MAP in app.py exactly ─────────────────────

const OUTPUT_CLASSES = [
  { label: "Non-EV", desc: "No vesicular protein signature detected", color: T.slate, bg: T.slateDim },
  { label: "Milk-based EV", desc: "Consistent with milk-derived extracellular vesicles", color: T.primary, bg: T.primaryDim },
  { label: "Plant-based EV", desc: "Consistent with plant-derived extracellular vesicles", color: T.amber, bg: T.amberDim },
];

const PIPELINE_STEPS = [
  {
    n: "01",
    icon: <GitBranch size={16} />,
    title: "Embed",
    text: "ProtT5-XL protein language model embedding, 1024 dimensions, mean-pooled over residues.",
  },
  {
    n: "02",
    icon: <Layers size={16} />,
    title: "Select & scale",
    text: "Recursive feature elimination to 256 dimensions, scaled to the training distribution.",
  },
  {
    n: "03",
    icon: <Cpu size={16} />,
    title: "Ensemble",
    text: "LR, SVM (RBF), and MLP base learners feed an XGBoost meta-model for the final call.",
  },
];

// ─── Signature element: live sequence decoder ──────────────────────────────────

const AA = "ACDEFGHIKLMNPQRSTVWY";
const randomSeq = (len: number) =>
  Array.from({ length: len }, () => AA[Math.floor(Math.random() * AA.length)]).join("");

const DECODER_SAMPLES = [
  {
    seq: "MKTAYIAKQRQISFVKSHFSRQLEER",
    label: "Milk-based EV",
    confidence: 94,
    color: T.primary,
    bg: T.primaryDim,
  },
  {
    seq: "MKVLILACLVAVAVQGASREQLTEWT",
    label: "Plant-based EV",
    confidence: 91,
    color: T.amber,
    bg: T.amberDim,
  },
  {
    seq: "ACDEFGHIKLMNPQRSTVWYACDEFG",
    label: "Non-EV",
    confidence: 88,
    color: T.slate,
    bg: T.slateDim,
  },
];

const SequenceDecoder: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displaySeq, setDisplaySeq] = useState(() => randomSeq(DECODER_SAMPLES[0].seq.length));
  const [revealed, setRevealed] = useState(false);

  const active = DECODER_SAMPLES[activeIndex];

  useEffect(() => {
    setRevealed(false);
    setDisplaySeq(randomSeq(active.seq.length));
    const scramble = setInterval(() => setDisplaySeq(randomSeq(active.seq.length)), 55);
    const reveal = setTimeout(() => {
      clearInterval(scramble);
      setDisplaySeq(active.seq);
      setRevealed(true);
    }, 650);
    return () => {
      clearInterval(scramble);
      clearTimeout(reveal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  useEffect(() => {
    const cycle = setInterval(() => {
      setActiveIndex((i) => (i + 1) % DECODER_SAMPLES.length);
    }, 4200);
    return () => clearInterval(cycle);
  }, []);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border"
      style={{ background: T.surfaceRaised, borderColor: T.hairline }}
    >
      {/* scanning sweep */}
      <div
        className="absolute inset-x-0 h-24 pointer-events-none opacity-40"
        style={{
          background: `linear-gradient(180deg, transparent, ${T.primary}22, transparent)`,
          animation: "scanline 3.2s linear infinite",
        }}
      />

      <div className="relative px-6 py-5 flex items-center justify-between border-b" style={{ borderColor: T.hairline }}>
        <div className="flex items-center gap-2.5">
          <Terminal size={14} style={{ color: T.primary }} />
          <span className="font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: T.muted }}>
            sequence_decoder.live
          </span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: T.hairlineStrong }} />
          <span className="w-2 h-2 rounded-full" style={{ background: T.hairlineStrong }} />
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: T.primary, animation: "pulseGlow 1.8s ease-in-out infinite" }}
          />
        </div>
      </div>

      <div className="relative px-6 py-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] mb-2.5" style={{ color: T.muted }}>
          input sequence
        </p>
        <p
          className="font-mono text-[15px] leading-relaxed break-all mb-6 min-h-[3.2em]"
          style={{ color: revealed ? T.text : "rgba(22,33,28,0.32)" }}
        >
          {displaySeq}
        </p>

        <div className="flex items-center justify-between mb-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: T.muted }}>
            predicted class
          </p>
          {revealed && (
            <span className="font-mono text-[11px]" style={{ color: active.color }}>
              {active.confidence}% confidence
            </span>
          )}
        </div>

        <div
          className="flex items-center gap-3 rounded-xl px-4 py-3 transition-opacity duration-300"
          style={{ background: active.bg, opacity: revealed ? 1 : 0.3 }}
        >
          <Fingerprint size={16} style={{ color: active.color }} />
          <span className="font-display text-sm font-semibold" style={{ color: active.color }}>
            {revealed ? active.label : "resolving\u2026"}
          </span>
        </div>

        <div className="mt-2.5 h-1 rounded-full overflow-hidden" style={{ background: T.hairline }}>
          <div
            key={activeIndex}
            className="h-full rounded-full"
            style={{
              background: active.color,
              width: revealed ? `${active.confidence}%` : "0%",
              transition: "width 0.6s ease-out",
            }}
          />
        </div>
      </div>
    </div>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────

const Home: React.FC = () => {
  return (
    <div className="min-h-screen font-body" style={{ background: T.ink }}>
      <FontLoader />

      {/* faint amino-acid field texture, purely atmospheric */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none select-none font-mono text-[11px] leading-[1.4] overflow-hidden"
        style={{ color: "rgba(22,33,28,0.035)", wordBreak: "break-all", padding: "2rem" }}
      >
        {Array.from({ length: 60 }).map((_, i) => (
          <span key={i}>{randomSeq(90)} </span>
        ))}
      </div>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 900px 560px at 10% -10%, rgba(31,158,136,0.10), transparent), radial-gradient(ellipse 700px 460px at 105% 15%, rgba(217,138,70,0.08), transparent)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-5 pt-24 pb-20">
          <div className="grid lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-7">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 border"
                style={{ borderColor: T.hairlineStrong, background: "rgba(45,212,191,0.06)" }}
              >
                <Microscope size={13} style={{ color: T.primary }} />
                <span className="font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: T.primary }}>
                  ev-multiclass classifier
                </span>
              </div>

              <h1
                className="font-display text-[2.75rem] md:text-[3.6rem] font-semibold tracking-tight leading-[1.06] mb-7"
                style={{ color: T.text }}
              >
                Every protein
                <br />
                has a point of origin.
              </h1>

              <p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: T.muted }}>
                Paste a sequence and get a source call — non-vesicular, milk-derived, or
                plant-derived extracellular vesicle protein — from a ProtT5-XL embedding
                run through a stacked ensemble classifier.
              </p>

              <div className="flex flex-wrap gap-3">
                <NavLink
                  to="/predict"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: T.primary, color: "#FFFFFF" }}
                >
                  Run a prediction <ArrowRight size={16} />
                </NavLink>
                <NavLink
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold border transition-all duration-200 hover:-translate-y-0.5"
                  style={{ borderColor: T.hairlineStrong, color: T.text }}
                >
                  Methodology
                </NavLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <SequenceDecoder />
            </div>
          </div>
        </div>
      </section>

      {/* ── Output classes ───────────────────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-5 pb-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-2.5" style={{ color: T.primary }}>
          output classes
        </p>
        <h2 className="font-display text-2xl font-semibold mb-8" style={{ color: T.text }}>
          Three calls, one prediction
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {OUTPUT_CLASSES.map(({ label, desc, color, bg }) => (
            <div key={label} className={`${cardClass} ${cardHover} p-6`} style={cardStyle}>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: bg, color }}
              >
                <Fingerprint size={17} />
              </div>
              <p className="font-display text-base font-semibold mb-1.5" style={{ color: T.text }}>
                {label}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: T.muted }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pipeline overview ─────────────────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-5 pb-20">
        <div className={`${cardClass} p-9 md:p-11`} style={cardStyle}>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-2.5" style={{ color: T.primary }}>
            methodology
          </p>
          <h2 className="font-display text-2xl font-semibold mb-3" style={{ color: T.text }}>
            Sequence in, source out
          </h2>
          <p className="leading-relaxed mb-10 max-w-2xl" style={{ color: T.muted }}>
            Three fixed stages, run in order every time. No structural data, docking,
            or molecular dynamics required — the sequence alone carries the signal.
          </p>

          <div className="grid md:grid-cols-3 gap-px rounded-xl overflow-hidden" style={{ background: T.hairline }}>
            {PIPELINE_STEPS.map(({ n, icon, title, text }) => (
              <div key={n} className="p-7" style={{ background: T.surface }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs" style={{ color: T.primary }}>
                    {n}
                  </span>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: T.primaryDim, color: T.primary }}
                  >
                    {icon}
                  </div>
                </div>
                <p className="font-display text-sm font-semibold mb-2" style={{ color: T.text }}>
                  {title}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: T.muted }}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          <NavLink
            to="/about"
            className="inline-flex items-center gap-2 mt-8 text-sm font-semibold transition-colors hover:gap-3"
            style={{ color: T.primary }}
          >
            Full methodology <ArrowRight size={15} />
          </NavLink>
        </div>
      </section>

      {/* ── Capabilities ──────────────────────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-5 pb-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-2.5" style={{ color: T.primary }}>
          capabilities
        </p>
        <h2 className="font-display text-2xl font-semibold mb-8" style={{ color: T.text }}>
          What you can run
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              icon: <Dna size={20} />,
              title: "Single sequence",
              desc: "Paste any protein sequence and get a source-class prediction with a full probability breakdown.",
            },
            {
              icon: <Database size={20} />,
              title: "Batch file",
              desc: "Upload a .txt or .fasta file with up to 50 sequences and get results back in one run.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className={`${cardClass} ${cardHover} p-7`} style={cardStyle}>
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: T.primaryDim, color: T.primary }}
              >
                {icon}
              </div>
              <h3 className="font-display text-base font-semibold mb-2" style={{ color: T.text }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: T.muted }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sample data ───────────────────────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-5 pb-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-2.5" style={{ color: T.primary }}>
              test data
            </p>
            <h2 className="font-display text-2xl font-semibold" style={{ color: T.text }}>
              Sample downloads
            </h2>
          </div>
          <NavLink
            to="/predict"
            className="text-sm font-semibold flex items-center gap-1.5 transition-colors hover:gap-2.5"
            style={{ color: T.primary }}
          >
            Try the predictor <ArrowRight size={15} />
          </NavLink>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {sampleFiles.map(({ label, ext, Icon, filename, content }) => (
            <button
              key={label}
              className={`flex items-center gap-4 p-6 text-left group ${cardClass} ${cardHover} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
              style={{ ...cardStyle, outlineColor: T.primary }}
              onClick={() => handleDownload(filename, content)}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: T.primaryDim, color: T.primary }}
              >
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-sm font-semibold" style={{ color: T.text }}>
                  {label}
                </p>
                <p className="font-mono text-xs mt-1" style={{ color: T.muted }}>
                  {ext} format
                </p>
              </div>
              <ArrowRight
                size={16}
                style={{ color: T.muted }}
                className="group-hover:translate-x-1 transition-all duration-200"
              />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;