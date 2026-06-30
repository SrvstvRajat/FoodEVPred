// import React from "react";
// import {
//   Sparkles,
//   Cpu,
//   FileText,
//   FileSpreadsheet,
//   Dna,
//   ArrowRight,
//   Database,
// } from "lucide-react";

// const sampleFiles = [
//   {
//     label: "Sample FASTA",
//     ext: ".fasta",
//     icon: Dna,
//     bgColor: "#2C1810",
//     textColor: "#F5F0E8",
//     accentColor: "#E8824A",
//     filename: "sample_sequences.fasta",
//     content: `>multiev_1|UniProt:P01234\nCCO\n>multiev_2|UniProt:P56789\nCOC(=O)[C@@H](Cc1ccccc1)NC(=O)[C@@H](N)CC(=O)O\n>Non_multiev_1|UniProt:Q12345\nOC(CC(O)(C(=O)O)CC(=O)O)(C(=O)O)`,
//   },
//   {
//     label: "Sample CSV",
//     ext: ".csv",
//     icon: FileSpreadsheet,
//     bgColor: "#C84B2F",
//     textColor: "#F5F0E8",
//     accentColor: "#F5A96A",
//     filename: "sample_sequences.csv",
//     content: `id,sequence,label\n1,CCO,multiev\n2,OC(CC(O)(C(=O)O)CC(=O)O)(C(=O)O),multiev\n3,COC(=O)[C@@H](Cc1ccccc1)NC(=O)[C@@H](N)CC(=O)O,Non-multiev`,
//   },
//   {
//     label: "Sample TXT",
//     ext: ".txt",
//     icon: FileText,
//     bgColor: "#D4882A",
//     textColor: "#2C1810",
//     accentColor: "rgba(44,24,16,0.7)",
//     filename: "sample_sequences.txt",
//     content: `CCO\nOC(CC(O)(C(=O)O)CC(=O)O)(C(=O)O)\nCOC(=O)[C@@H](Cc1ccccc1)NC(=O)[C@@H](N)CC(=O)O`,
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

// const Home: React.FC = () => {
//   return (
//     <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #FDF6EC 0%, #F5EDD8 50%, #FDF0E0 100%)" }}>
//       <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">

//         {/* HERO SECTION */}
//         <div className="grid lg:grid-cols-12 gap-12 items-center mb-24">
//           {/* Left: Typography */}
//           <div className="lg:col-span-7 relative z-10">
//             <div
//               className="inline-flex items-center gap-3 rounded-full px-5 py-2 text-xs uppercase tracking-[0.2em] font-black mb-8"
//               style={{ background: "rgba(200,75,47,0.1)", color: "#C84B2F", border: "1px solid rgba(200,75,47,0.2)" }}
//             >
//               <Sparkles size={13} />
//               <span>multiev Intelligence</span>
//             </div>

//             <h1 className="text-[4rem] md:text-[5.5rem] font-black tracking-tight leading-[1] mb-8 text-[#2C1810]">
//               Decode the <br />
//               <span className="font-serif italic text-[#C84B2F]">
//                 taste profiles
//               </span> <br />{/* of molecules */}
//             </h1>


//             <p className="text-xl text-[#2C1810]/60 max-w-xl leading-relaxed font-medium">
//               {/* Advanced computational tools for protein multievicity prediction using state-of-the-art machine learning. */}
//               {/* Predict multiple taste properties of proteins using advanced machine learning and AI models */}


//             </p>
//           </div>

//           {/* Right: Floating Stat Cards */}
//           <div className="lg:col-span-5 relative h-[380px] hidden md:block">
//             {/* Primary stat */}
//             <div className="absolute top-0 right-0 w-72 p-8 rounded-[2.5rem] shadow-2xl rotate-[3deg] hover:rotate-0 transition-transform duration-500 z-20"
//               style={{ background: "linear-gradient(135deg, #2C1810, #4A2218)" }}>
//               <div className="flex justify-between items-start mb-10">
//                 <Cpu size={22} style={{ color: "#E8824A" }} />
//                 <span className="text-[10px] uppercase tracking-widest font-black rounded-full px-3 py-1"
//                   style={{ color: "rgba(245,240,232,0.6)", border: "1px solid rgba(245,240,232,0.15)" }}>Accuracy</span>
//               </div>
//               <div className="text-6xl font-black tracking-tighter mb-2" style={{ color: "#F5F0E8" }}>
//                 89.57<span className="text-3xl" style={{ color: "#E8824A" }}>%</span>
//               </div>
//               <p className="text-sm font-medium" style={{ color: "rgba(245,240,232,0.55)" }}>
//                 {/* Stack model ensemble approach */}
//                 </p>
//             </div>

//             {/* Secondary stat */}
// {/* <div className="absolute bottom-4 left-4 w-60 p-7 rounded-[2.5rem] shadow-xl -rotate-[4deg] hover:rotate-0 transition-transform duration-500 z-10"
//   style={{ background: "linear-gradient(135deg, #C84B2F, #E8824A)" }}>
//   <p className="text-[10px] uppercase tracking-widest font-black text-white/60 mb-5">Taste Classes</p>
//   <div className="space-y-2">
//     {[
//       { emoji: "🍬", label: "Sweet"     },
//       { emoji: "☕", label: "Bitter"    },
//       { emoji: "🍖", label: "Umami"     },
//       // { emoji: "🍋", label: "Sour"      },
//       // { emoji: "❓", label: "Undefined" },
//     ].map(({ emoji, label }) => (
//       <div key={label} className="flex items-center gap-3 rounded-xl px-3 py-1.5"
//         style={{ background: "rgba(255,255,255,0.12)" }}>
//         <span className="text-base">{emoji}</span>
//         <span className="text-sm font-black text-white">{label}</span>
//       </div>
//     ))}
//   </div>
// </div>*/}
// <div className="absolute bottom-4 left-4 w-60 p-8 rounded-[2.5rem] shadow-xl -rotate-[4deg] hover:rotate-0 transition-transform duration-500 z-10"
//               style={{ background: "linear-gradient(135deg, #C84B2F, #E8824A)" }}>
//               <Database size={22} className="mb-8 text-white/80" />
//               <div className="text-5xl font-black tracking-tighter mb-2 text-white">17k+</div>
//               <p className="text-sm font-black uppercase tracking-wider text-white/80">Molecule Analyzed</p>
// </div>
//           </div>
//         </div>

//         {/* BENTO GRID */}
//         <div className="grid md:grid-cols-3 gap-6 mb-24">

//           {/* Architecture Card (2-col) */}
//           <div className="md:col-span-2 bg-white rounded-[2.5rem] p-10 shadow-sm flex flex-col justify-between group overflow-hidden"
//             style={{ border: "1px solid rgba(44,24,16,0.06)" }}>
//             <div className="mb-16">
//               {/* <h2 className="text-3xl font-black tracking-tight mb-2" style={{ color: "#2C1810" }}>The Architecture</h2> */}
//               <p className="font-medium" style={{ color: "rgba(44,24,16,0.55)" }}>SMILES-based feature extraction combined with AI models for multi-ev prediction of compounds.</p>
//             </div>
//             <div className="w-full h-56 rounded-[1.5rem] flex items-center justify-center border-2 border-dashed transition-colors"
//               style={{ background: "linear-gradient(135deg, #FDF6EC, #F5EDD8)", borderColor: "rgba(200,75,47,0.2)" }}>
//               <div className="text-center">
//                 <Cpu size={36} className="mx-auto mb-3" style={{ color: "rgba(44,24,16,0.3)" }} />
//                 <span className="text-xs font-black uppercase tracking-widest" style={{ color: "rgba(44,24,16,0.35)" }}>[ Insert Workflow Diagram ]</span>
//               </div>
//             </div>
//           </div>

//           {/* Features Card */}
//           <div className="rounded-[2.5rem] p-10 flex flex-col justify-between"
//             style={{ background: "linear-gradient(135deg, #D4882A, #E8A84A)" }}>
//             <div>
//               <div className="w-12 h-12 rounded-full flex items-center justify-center mb-8"
//                 style={{ background: "rgba(44,24,16,0.15)" }}>
//                 <Sparkles size={20} style={{ color: "#2C1810" }} />
//               </div>
//               <h3 className="text-3xl font-black tracking-tight mb-8" style={{ color: "#2C1810" }}>Core<br />Features</h3>
//               <ul className="space-y-5">
//                 {[
//                   "Balanced multiev & non-multiev samples",
//                   "High accuracy",
//                   "Intuitive batch processing",
//                   "Comprehensive analysis and reporting over Email",
//                 ].map((text, i) => (
//                   <li key={i} className="flex gap-4 items-start pt-4" style={{ borderTop: "1px solid rgba(44,24,16,0.12)" }}>
//                     <span className="text-xs font-black uppercase tracking-widest mt-1" style={{ color: "rgba(44,24,16,0.45)" }}>0{i + 1}</span>
//                     <span className="font-bold leading-tight" style={{ color: "#2C1810" }}>{text}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* STATS ROW */}
//         {/* <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-24">
//           {[
//             { value: "96.87%", label: "Accuracy", accent: "#C84B2F" },
//             // { value: "96.86", label: "F1 Score", accent: "#E8824A" },
//             { value: "23,830", label: "Proteins", accent: "#D4882A" },
//             { value: "200+", label: "Batch Size", accent: "#2C6B2F" },
//           ].map(({ value, label, accent }) => (
//             <div key={label} className="bg-white rounded-[2rem] p-6 text-center shadow-sm" style={{ border: "1px solid rgba(44,24,16,0.06)", borderTop: `4px solid ${accent}` }}>
//               <div className="text-4xl font-black tracking-tighter mb-1" style={{ color: accent }}>{value}</div>
//               <div className="text-xs font-black uppercase tracking-widest" style={{ color: "rgba(44,24,16,0.45)" }}>{label}</div>
//             </div>
//           ))}
//         </div> */}

//         {/* TASTE CLASSES TRAY */}
// {/* TASTE CLASSES TRAY */}
// <div className="mb-24">
  
// <span className="font-serif italic text-[#C84B2F]" style={{ fontSize: "2.5rem", fontWeight: 600, lineHeight: 1 }}>
//   Predicted Classes
// </span>
//   <div className="grid grid-cols-4 gap-4">
//     {[
//       { emoji: "🍬", label: "Sweet",     color: "#2C6B2F", bg: "#2C6B2F" },
//       { emoji: "☕", label: "Bitter",    color: "#C84B2F", bg: "#C84B2F" },
//       { emoji: "🍖", label: "Umami",     color: "#D4882A", bg: "#D4882A" },
//       { emoji: "🍋", label: "Sour",      color: "#2563EB", bg: "#2563EB" },
//       // { emoji: "❓", label: "Undefined", color: "#6B7280", bg: "#6B7280" },
//     ].map(({ emoji, label, color, bg }) => (
//       <div key={label}
//         className="flex flex-col items-center justify-center gap-3 py-8 rounded-[2rem] transition-transform hover:-translate-y-1"
//         style={{
//           background: `${bg}10`,
//           border: `2px solid ${color}25`,
//         }}>
//         <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
//           style={{ background: `${bg}18` }}>
//           {emoji}
//         </div>
//         <span className="text-sm font-black tracking-wide" style={{ color }}>{label}</span>
//       </div>
//     ))}
//   </div>
// </div>

//         {/* SAMPLE DATA SECTION */}
//         <div>
//           <div className="flex flex-col md:flex-row justify-between items-end mb-12">
//             <div>
//               <h2 className="text-[3.5rem] font-black tracking-tighter leading-none mb-3 uppercase" style={{ color: "#2C1810" }}>
//                 Sample <span className="font-serif italic lowercase tracking-normal" style={{ color: "#C84B2F" }}>Data</span>
//               </h2>
//               <p className="text-lg font-medium" style={{ color: "rgba(44,24,16,0.55)" }}>Download standard formats to test our prediction pipeline.</p>
//             </div>
//           </div>

//           <div className="grid md:grid-cols-3 gap-6">
//             {sampleFiles.map((file, i) => (
//               <div
//                 key={i}
//                 className="rounded-[2rem] p-8 flex flex-col justify-between min-h-[240px] transition-transform hover:-translate-y-2"
//                 style={{ background: file.bgColor, color: file.textColor }}
//               >
//                 <div className="flex justify-between items-start mb-8">
//                   <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
//                     <file.icon size={20} style={{ color: file.textColor }} />
//                   </div>
//                   <span className="text-xs font-black uppercase tracking-widest rounded-full px-3 py-1" style={{ border: `1px solid ${file.accentColor}`, color: file.accentColor }}>
//                     {file.ext}
//                   </span>
//                 </div>

//                 <div>
//                   <h3 className="text-2xl font-black tracking-tight mb-6" style={{ color: file.textColor }}>{file.label}</h3>
//                   <button
//                     onClick={() => handleDownload(file.filename, file.content)}
//                     className="flex items-center gap-3 text-sm font-black uppercase tracking-widest group"
//                     style={{ color: file.accentColor }}
//                   >
//                     Download File
//                     <ArrowRight size={15} className="group-hover:translate-x-2 transition-transform" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//       </main>
//     </div>
//   );
// };

// export default Home;
import React from "react";
import { NavLink } from "react-router-dom";
import {
  ArrowRight,
  Dna,
  FileSpreadsheet,
  FileText,
  Layers,
  Microscope,
  Zap,
  Database,
  TrendingUp,
  GitBranch,
} from "lucide-react";

// ─── Sample file data ────────────────────────────────────────────────────────

const sampleFiles = [
  {
    label: "Sample FASTA",
    ext: ".fasta",
    Icon: Dna,
    filename: "sample_sequences.fasta",
    content: `>EVSource_1|UniProt:P01234\nCCO\n>EVSource_2|UniProt:P56789\nCOC(=O)[C@@H](Cc1ccccc1)NC(=O)[C@@H](N)CC(=O)O\n>Negative_1|UniProt:Q12345\nOC(CC(O)(C(=O)O)CC(=O)O)(C(=O)O)`,
  },
  {
    label: "Sample CSV",
    ext: ".csv",
    Icon: FileSpreadsheet,
    filename: "sample_sequences.csv",
    content: `id,sequence,label\n1,CCO,CowMilk\n2,OC(CC(O)(C(=O)O)CC(=O)O)(C(=O)O),HumanMilk\n3,COC(=O)[C@@H](Cc1ccccc1)NC(=O)[C@@H](N)CC(=O)O,Negative`,
  },
  {
    label: "Sample TXT",
    ext: ".txt",
    Icon: FileText,
    filename: "sample_sequences.txt",
    content: `CCO\nOC(CC(O)(C(=O)O)CC(=O)O)(C(=O)O)\nCOC(=O)[C@@H](Cc1ccccc1)NC(=O)[C@@H](N)CC(=O)O`,
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

// ─── Source classes ───────────────────────────────────────────────────────────

const SOURCE_CLASSES = [
  { label: "Cow Milk",    emoji: "🐄", color: "#2563eb", bg: "#eff6ff" },
  { label: "Human Milk",  emoji: "🤱", color: "#7c3aed", bg: "#f5f3ff" },
  { label: "Citrus",      emoji: "🍋", color: "#d97706", bg: "#fffbeb" },
  { label: "Broccoli",    emoji: "🥦", color: "#16a34a", bg: "#f0fdf4" },
  { label: "Arabidopsis", emoji: "🌿", color: "#0d9488", bg: "#f0fdfa" },
  { label: "Negative",    emoji: "⊖",  color: "#64748b", bg: "#f8fafc" },
];

// ─── Component ────────────────────────────────────────────────────────────────

const Home: React.FC = () => {
  return (
    <div style={{ background: "rgb(234 248 255)" }} className="min-h-screen">

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 pt-16 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Left */}
          <div className="lg:col-span-7">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: "#eff6ff", color: "#1a56db", border: "1px solid #bfdbfe" }}
            >
              <Microscope size={12} />
              <span>Extracellular Vesicle Protein Classification</span>
            </div>

            <h1
              className="text-[2.75rem] md:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-5"
              style={{ color: "#0f172a" }}
            >
              Predict the Source of<br />
              <span style={{ color: "#1a56db" }}>Food-Derived EV Proteins</span>
            </h1>

            <p
              className="text-lg leading-relaxed mb-8 max-w-xl"
              style={{ color: "#475569" }}
            >
              A sequence-level machine learning framework for multi-class classification of extracellular vesicle proteins from diverse edible food sources.
            </p>

            <div className="flex flex-wrap gap-3">
              <NavLink
                to="/predict"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #1a56db, #1e40af)" }}
              >
                Start Predicting <ArrowRight size={15} />
              </NavLink>
              <NavLink
                to="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                style={{ background: "white", color: "#334155", border: "1px solid #e2e8f0" }}
              >
                Learn More
              </NavLink>
            </div>
          </div>

          {/* Right: stat cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 hidden md:grid">
            {[
              { icon: <Database size={20} />, value: "17K+",   label: "EV Proteins",       color: "#1a56db", bg: "#eff6ff" },
              { icon: <TrendingUp size={20}/>, value: "~89%",   label: "Classification Acc", color: "#16a34a", bg: "#f0fdf4" },
              { icon: <Layers size={20} />,    value: "6",      label: "Source Classes",     color: "#7c3aed", bg: "#f5f3ff" },
              { icon: <Zap size={20} />,       value: "<5s",    label: "Inference Time",     color: "#d97706", bg: "#fffbeb" },
            ].map(({ icon, value, label, color, bg }) => (
              <div
                key={label}
                className="rounded-xl p-5 flex flex-col gap-3"
                style={{ background: "white", border: "1px solid #e2e8f0" }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: bg, color }}
                >
                  {icon}
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight" style={{ color: "#0f172a" }}>{value}</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Source Classes ───────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 pb-20">
        <div className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1.5">Classification Targets</p>
          <h2 className="text-2xl font-bold text-slate-900">Predicted Source Classes</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SOURCE_CLASSES.map(({ label, emoji, color, bg }) => (
            <div
              key={label}
              className="rounded-xl p-4 flex flex-col items-center gap-2.5 text-center transition-transform hover:-translate-y-0.5"
              style={{ background: bg, border: `1px solid ${color}20` }}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-xs font-semibold" style={{ color }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pipeline overview ─────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 pb-20">
        <div
          className="rounded-2xl p-8 md:p-10"
          style={{ background: "white", border: "1px solid #e2e8f0" }}
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Methodology</p>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Sequence-Level ML Pipeline</h2>
              <p className="text-slate-500 leading-relaxed mb-6">
                SMILES-based feature extraction combined with pre-trained language models for multi-class EV protein source prediction. No ligand binding, docking, or molecular dynamics required.
              </p>
              <div className="space-y-3">
                {[
                  { icon: <GitBranch size={15} />, text: "ESM2 protein language model embeddings" },
                  { icon: <Layers size={15} />,    text: "Biopython physicochemical feature extraction" },
                  { icon: <TrendingUp size={15} />, text: "Stack ensemble classifier (96.87% accuracy)" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "#eff6ff", color: "#1a56db" }}
                    >
                      {icon}
                    </div>
                    <span className="text-sm text-slate-600">{text}</span>
                  </div>
                ))}
              </div>
              <NavLink
                to="/about"
                className="inline-flex items-center gap-2 mt-7 text-sm font-semibold transition-colors"
                style={{ color: "#1a56db" }}
              >
                View full methodology <ArrowRight size={14} />
              </NavLink>
            </div>

            {/* Architecture diagram placeholder */}
            <div
              className="rounded-xl h-52 flex flex-col items-center justify-center gap-3"
              style={{ background: "#f8fafc", border: "2px dashed #e2e8f0" }}
            >
              <Layers size={32} style={{ color: "#cbd5e1" }} />
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Workflow Diagram</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features bento ───────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 pb-20">
        <div className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1.5">Capabilities</p>
          <h2 className="text-2xl font-bold text-slate-900">Core Features</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: <Dna size={18} />,
              title: "Single Protein Prediction",
              desc: "Paste any protein sequence and get an instant source-class prediction with confidence scores.",
              color: "#2563eb", bg: "#eff6ff",
            },
            {
              icon: <FileSpreadsheet size={18} />,
              title: "Batch File Processing",
              desc: "Upload .txt, .csv, or .fasta files with up to 200 sequences. Results delivered via email.",
              color: "#16a34a", bg: "#f0fdf4",
            },
            {
              icon: <Database size={18} />,
              title: "Curated EV Database",
              desc: "Access high-confidence EV protein datasets from 5 food sources plus a curated negative class.",
              color: "#7c3aed", bg: "#f5f3ff",
            },
          ].map(({ icon, title, desc, color, bg }) => (
            <div
              key={title}
              className="rounded-xl p-6"
              style={{ background: "white", border: "1px solid #e2e8f0" }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                style={{ background: bg, color }}
              >
                {icon}
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1.5">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sample Data ───────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 pb-24">
        <div className="flex items-end justify-between mb-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1.5">Test Data</p>
            <h2 className="text-2xl font-bold text-slate-900">Sample Downloads</h2>
          </div>
          <NavLink
            to="/predict"
            className="text-sm font-semibold flex items-center gap-1.5 transition-colors"
            style={{ color: "#1a56db" }}
          >
            Try the predictor <ArrowRight size={14} />
          </NavLink>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {sampleFiles.map(({ label, ext, Icon, filename, content }) => (
            <div
              key={label}
              className="rounded-xl p-5 flex items-center gap-4 group cursor-pointer transition-all hover:shadow-md"
              style={{ background: "white", border: "1px solid #e2e8f0" }}
              onClick={() => handleDownload(filename, content)}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "#eff6ff", color: "#1a56db" }}
              >
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800">{label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{ext} format</p>
              </div>
              <ArrowRight
                size={15}
                className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all"
              />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;