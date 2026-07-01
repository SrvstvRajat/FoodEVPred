// // import React from "react";
// // import { Beaker, Brain, Database, Layers, Microscope, Sparkles, Target, Zap } from "lucide-react";

// // // ─── Types ────────────────────────────────────────────────────────────────────

// // interface StatCardProps {
// //   value: string;
// //   label: string;
// // }

// // interface MethodCardProps {
// //   icon: React.ReactNode;
// //   title: string;
// //   description: string;
// //   tag: string;
// // }

// // interface TeamMemberProps {
// //   name: string;
// //   role: string;
// //   affiliation: string;
// //   initials: string;
// //   color: string;
// // }

// // // ─── Constants ────────────────────────────────────────────────────────────────

// // const CLASS_NAMES = ["Sweet", "Bitter", "Umami", "Sour", "Undefined"];
// // const CLASS_COLORS: Record<string, string> = {
// //   Sweet:     "#2C6B2F",
// //   Bitter:    "#C84B2F",
// //   Umami:     "#D4882A",
// //   Sour:      "#2563EB",
// //   Undefined: "#6B7280",
// // };
// // const TASTE_EMOJI: Record<string, string> = {
// //   Sweet:     "🍬",
// //   Bitter:    "☕",
// //   Umami:     "🍖",
// //   Sour:      "🍋",
// //   Undefined: "❓",
// // };

// // // ─── Sub-components ───────────────────────────────────────────────────────────

// // const StatCard: React.FC<StatCardProps> = ({ value, label }) => (
// //   <div className="rounded-[2rem] p-8 text-center"
// //     style={{ background: "white", border: "1px solid rgba(44,24,16,0.08)" }}>
// //     <p className="text-5xl font-black tracking-tighter mb-2" style={{ color: "#C84B2F" }}>{value}</p>
// //     <p className="text-sm font-bold uppercase tracking-widest" style={{ color: "rgba(44,24,16,0.5)" }}>{label}</p>
// //   </div>
// // );

// // const MethodCard: React.FC<MethodCardProps> = ({ icon, title, description, tag }) => (
// //   <div className="rounded-[2rem] p-8 flex flex-col gap-5"
// //     style={{ background: "white", border: "1px solid rgba(44,24,16,0.08)" }}>
// //     <div className="flex items-start justify-between gap-4">
// //       <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
// //         style={{ background: "rgba(200,75,47,0.08)" }}>
// //         <span style={{ color: "#C84B2F" }}>{icon}</span>
// //       </div>
// //       <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full"
// //         style={{ background: "rgba(44,24,16,0.06)", color: "rgba(44,24,16,0.5)" }}>
// //         {tag}
// //       </span>
// //     </div>
// //     <div>
// //       <h3 className="text-lg font-black mb-2" style={{ color: "#2C1810" }}>{title}</h3>
// //       <p className="text-sm font-medium leading-relaxed" style={{ color: "rgba(44,24,16,0.6)" }}>{description}</p>
// //     </div>
// //   </div>
// // );

// // const TeamMember: React.FC<TeamMemberProps> = ({ name, role, affiliation, initials, color }) => (
// //   <div className="rounded-[2rem] p-8 flex items-start gap-5"
// //     style={{ background: "white", border: "1px solid rgba(44,24,16,0.08)" }}>
// //     <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-black text-lg"
// //       style={{ background: color }}>
// //       {initials}
// //     </div>
// //     <div>
// //       <p className="font-black text-base" style={{ color: "#2C1810" }}>{name}</p>
// //       <p className="text-sm font-bold mt-0.5" style={{ color: "#C84B2F" }}>{role}</p>
// //       <p className="text-xs font-medium mt-1" style={{ color: "rgba(44,24,16,0.45)" }}>{affiliation}</p>
// //     </div>
// //   </div>
// // );

// // // ─── Main Component ───────────────────────────────────────────────────────────

// // const About: React.FC = () => {
// //   return (
// //     <div className="min-h-screen pb-24" style={{ background: "linear-gradient(160deg, #FDF6EC 0%, #F5EDD8 50%, #FDF0E0 100%)" }}>
// //       <main className="max-w-7xl mx-auto px-6 py-16 md:py-20 space-y-20">

// //         {/* ── Hero ── */}
// //         <div className="text-center">
// //           <div className="inline-flex items-center gap-3 rounded-full px-5 py-2 text-xs uppercase tracking-[0.2em] font-black mb-6"
// //             style={{ background: "rgba(200,75,47,0.1)", color: "#C84B2F", border: "1px solid rgba(200,75,47,0.2)" }}>
// //             <Sparkles size={13} /><span>About the Platform</span>
// //           </div>
// //           <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-5 uppercase" style={{ color: "#2C1810" }}>
// //             What is{" "}
// //             <span className="font-serif italic lowercase tracking-normal pr-2" style={{ color: "#C84B2F" }}>multiev?</span>
// //           </h2>
// //           <p className="text-lg font-medium max-w-2xl mx-auto" style={{ color: "rgba(44,24,16,0.55)" }}>
// //             multiev is a deep learning platform for predicting the taste class of small molecules directly from their SMILES representation — bridging cheminformatics and sensory science.
// //           </p>
// //         </div>

// //         {/* ── Mission ── */}
// //         <div className="rounded-[2.5rem] p-10 md:p-14"
// //           style={{ background: "white", border: "1px solid rgba(44,24,16,0.06)" }}>
// //           <div className="grid md:grid-cols-2 gap-12 items-center">
// //             <div>
// //               <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: "rgba(44,24,16,0.35)" }}>Our Mission</p>
// //               <h3 className="text-3xl font-black tracking-tight mb-6" style={{ color: "#2C1810" }}>
// //                 Making taste prediction accessible to researchers worldwide.
// //               </h3>
// //               <p className="text-base font-medium leading-relaxed mb-4" style={{ color: "rgba(44,24,16,0.6)" }}>
// //                 Identifying the taste of a compound traditionally requires expensive and time-consuming sensory evaluations. multiev replaces that bottleneck with a fast, accurate ML pipeline that runs in seconds.
// //               </p>
// //               <p className="text-base font-medium leading-relaxed" style={{ color: "rgba(44,24,16,0.6)" }}>
// //                 Whether you're in food science, pharmaceuticals, or flavour chemistry — multiev gives you instant taste predictions directly from molecular structure.
// //               </p>
// //             </div>
// //             <div className="grid grid-cols-2 gap-4">
// //               <StatCard value="5"      label="Taste Classes"       />
// //               <StatCard value="XX%"    label="Test Accuracy"        />
// //               <StatCard value="~XXK"   label="Training Molecules"   />
// //               <StatCard value="&lt;5s" label="Avg Inference Time"   />
// //             </div>
// //           </div>
// //         </div>

// //         {/* ── Taste Classes ── */}
// //         <div>
// //           <div className="text-center mb-10">
// //             <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "rgba(44,24,16,0.35)" }}>Supported Classes</p>
// //             <h3 className="text-3xl font-black tracking-tight" style={{ color: "#2C1810" }}>Five Taste Categories</h3>
// //           </div>
// //           <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
// //             {CLASS_NAMES.map((cls) => (
// //               <div key={cls} className="rounded-[2rem] p-6 text-center"
// //                 style={{ background: `${CLASS_COLORS[cls]}10`, border: `2px solid ${CLASS_COLORS[cls]}25` }}>
// //                 <p className="text-4xl mb-3">{TASTE_EMOJI[cls]}</p>
// //                 <p className="font-black text-base" style={{ color: CLASS_COLORS[cls] }}>{cls}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* ── Methodology ── */}
// //         <div>
// //           <div className="text-center mb-10">
// //             <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "rgba(44,24,16,0.35)" }}>How It Works</p>
// //             <h3 className="text-3xl font-black tracking-tight mb-3" style={{ color: "#2C1810" }}>The Pipeline</h3>
// //             <p className="text-base font-medium max-w-xl mx-auto" style={{ color: "rgba(44,24,16,0.55)" }}>
// //               multiev uses a two-stage embedding approach fused into a single deep classifier.
// //             </p>
// //           </div>

// //           <div className="grid md:grid-cols-3 gap-6 mb-6">
// //             <MethodCard
// //               icon={<Beaker size={22} />}
// //               title="Mol2Vec Embeddings"
// //               tag="Stage 1"
// //               description="Each SMILES is converted to a molecular graph and encoded using Mol2Vec — a Word2Vec-inspired model trained on molecular substructures (Morgan fingerprints with radius 1). This yields a 300-dimensional structural embedding."
// //             />
// //             <MethodCard
// //               icon={<Brain size={22} />}
// //               title="ChemBERTa Embeddings"
// //               tag="Stage 2"
// //               description="The same SMILES string is tokenized and passed through ChemBERTa (seyonec/ChemBERTa-zinc-base-v1), a BERT-style transformer pre-trained on ZINC. The CLS token produces a 768-dimensional contextual embedding."
// //             />
// //             <MethodCard
// //               icon={<Layers size={22} />}
// //               title="Fusion Classifier"
// //               tag="Stage 3"
// //               description="Both embeddings are concatenated into a 1068-dimensional vector, standardized, and passed through a 3-layer MLP (512→256→128) with BatchNorm, ReLU, and Dropout. The final head outputs logits over 5 taste classes."
// //             />
// //           </div>

// //           <div className="grid md:grid-cols-3 gap-6">
// //             <MethodCard
// //               icon={<Database size={22} />}
// //               title="Dataset"
// //               tag="Data"
// //               description="The model was trained on ~XXK labelled molecules sourced from [your dataset name here]. Multi-hot taste labels were converted to single-class targets via argmax. A 70/15/15 train/val/test split was used with stratification."
// //             />
// //             <MethodCard
// //               icon={<Target size={22} />}
// //               title="Training Strategy"
// //               tag="Training"
// //               description="Trained with AdamW (lr=1e-3, weight decay=1e-4) and inverse-frequency class weights with sqrt smoothing to handle class imbalance. Early stopping on validation Macro F1 with patience=15 over 100 epochs."
// //             />
// //             <MethodCard
// //               icon={<Zap size={22} />}
// //               title="Performance"
// //               tag="Results"
// //               description="The model achieves XX% accuracy and XX macro F1 on the held-out test set. Per-class F1: Sweet XX%, Bitter XX%, Umami XX%, Sour XX%, Undefined XX%. Confusion matrix available in the paper."
// //             />
// //           </div>
// //         </div>

// //         {/* ── Architecture diagram (text-based) ── */}
// //         <div className="rounded-[2.5rem] p-10 md:p-14"
// //           style={{ background: "white", border: "1px solid rgba(44,24,16,0.06)" }}>
// //           <p className="text-xs font-black uppercase tracking-widest mb-6 text-center" style={{ color: "rgba(44,24,16,0.35)" }}>Architecture Overview</p>
// //           <div className="flex flex-col md:flex-row items-center justify-center gap-3 flex-wrap text-sm font-black">
// //             {[
// //               { label: "SMILES Input",         bg: "#FDF6EC", border: "rgba(44,24,16,0.15)", color: "#2C1810"  },
// //               null,
// //               { label: "Mol2Vec\n300d",         bg: "rgba(212,136,42,0.1)", border: "#D4882A40", color: "#D4882A" },
// //               { label: "ChemBERTa\n768d",       bg: "rgba(37,99,235,0.1)",  border: "#2563EB40", color: "#2563EB" },
// //               null,
// //               { label: "Concat\n1068d",         bg: "rgba(44,24,16,0.05)", border: "rgba(44,24,16,0.15)", color: "#2C1810" },
// //               null,
// //               { label: "MLP\n512→256→128",      bg: "rgba(200,75,47,0.08)", border: "#C84B2F40", color: "#C84B2F" },
// //               null,
// //               { label: "Softmax\n5 classes",    bg: "#2C1810",              border: "#2C1810",    color: "white"   },
// //             ].map((item, i) =>
// //               item === null ? (
// //                 <span key={i} className="text-xl" style={{ color: "rgba(44,24,16,0.3)" }}>→</span>
// //               ) : (
// //                 <div key={i} className="rounded-2xl px-5 py-3 text-center whitespace-pre-line leading-tight"
// //                   style={{ background: item.bg, border: `2px solid ${item.border}`, color: item.color, minWidth: "90px" }}>
// //                   {item.label}
// //                 </div>
// //               )
// //             )}
// //           </div>
// //         </div>

// //         {/* ── Team ── */}
// //         <div>
// //           <div className="text-center mb-10">
// //             <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "rgba(44,24,16,0.35)" }}>The Team</p>
// //             <h3 className="text-3xl font-black tracking-tight" style={{ color: "#2C1810" }}>Built by Researchers</h3>
// //           </div>
// //           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             <TeamMember name="[Your Name]"        role="Lead Researcher"        affiliation="[Your Institution]"  initials="YN" color="#C84B2F" />
// //             <TeamMember name="[Collaborator Name]" role="ML Engineering"         affiliation="[Their Institution]" initials="CN" color="#D4882A" />
// //             <TeamMember name="Prof. [Advisor]"    role="Principal Investigator" affiliation="[Lab / Department]"  initials="PI" color="#2C6B2F" />
// //           </div>
// //         </div>

// //         {/* ── Citation ── */}
// //         <div className="rounded-[2.5rem] p-10 md:p-12"
// //           style={{ background: "white", border: "1px solid rgba(44,24,16,0.06)" }}>
// //           <div className="flex items-start gap-5">
// //             <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
// //               style={{ background: "rgba(200,75,47,0.08)" }}>
// //               <Microscope size={22} style={{ color: "#C84B2F" }} />
// //             </div>
// //             <div className="flex-1">
// //               <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "rgba(44,24,16,0.35)" }}>Cite This Work</p>
// //               <div className="rounded-2xl px-6 py-5 font-mono text-sm leading-relaxed"
// //                 style={{ background: "#FDF6EC", color: "rgba(44,24,16,0.7)", border: "1px solid rgba(44,24,16,0.08)" }}>
// //                 [Author(s)]. multiev: A Deep Learning Platform for Molecular Taste Prediction.
// //                 <span style={{ color: "#C84B2F" }}> [Journal / Conference]</span>, [Year].
// //                 doi: [your-doi-here]
// //               </div>
// //               <p className="text-xs font-medium mt-3" style={{ color: "rgba(44,24,16,0.4)" }}>
// //                 Contact: <a href="mailto:bagler+multiev@iiitd.ac.in" style={{ color: "#C84B2F" }}>bagler+multiev@iiitd.ac.in</a>
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //       </main>
// //     </div>
// //   );
// // };

// // export default About;

// import React from "react";
// import { Beaker, Brain, Database, Layers, Microscope, Target, Zap, BookOpen } from "lucide-react";

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface StatCardProps  { value: string; label: string }
// interface MethodCardProps {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
//   tag: string;
//   tagColor: string;
//   tagBg: string;
// }
// interface TeamMemberProps {
//   name: string;
//   role: string;
//   affiliation: string;
//   initials: string;
//   color: string;
// }

// // ─── Sub-components ───────────────────────────────────────────────────────────

// const StatCard: React.FC<StatCardProps> = ({ value, label }) => (
//   <div
//     className="rounded-xl p-5 text-center"
//     style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
//   >
//     <p className="text-3xl font-bold tracking-tight mb-1" style={{ color: "#1a56db" }}>{value}</p>
//     <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
//   </div>
// );

// const MethodCard: React.FC<MethodCardProps> = ({ icon, title, description, tag, tagColor, tagBg }) => (
//   <div
//     className="rounded-xl p-6 flex flex-col gap-4"
//     style={{ background: "white", border: "1px solid #e2e8f0" }}
//   >
//     <div className="flex items-start justify-between gap-3">
//       <div
//         className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
//         style={{ background: tagBg, color: tagColor }}
//       >
//         {icon}
//       </div>
//       <span
//         className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
//         style={{ background: tagBg, color: tagColor }}
//       >
//         {tag}
//       </span>
//     </div>
//     <div>
//       <h3 className="text-sm font-bold text-slate-900 mb-1.5">{title}</h3>
//       <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
//     </div>
//   </div>
// );

// const TeamMember: React.FC<TeamMemberProps> = ({ name, role, affiliation, initials, color }) => (
//   <div
//     className="rounded-xl p-5 flex items-center gap-4"
//     style={{ background: "white", border: "1px solid #e2e8f0" }}
//   >
//     <div
//       className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
//       style={{ background: color }}
//     >
//       {initials}
//     </div>
//     <div>
//       <p className="text-sm font-semibold text-slate-900">{name}</p>
//       <p className="text-xs font-medium text-blue-600 mt-0.5">{role}</p>
//       <p className="text-xs text-slate-400 mt-0.5">{affiliation}</p>
//     </div>
//   </div>
// );

// // ─── Source classes ───────────────────────────────────────────────────────────

// const SOURCE_CLASSES = [
//   { label: "Cow Milk",    emoji: "🐄", color: "#2563eb", bg: "#eff6ff" },
//   { label: "Human Milk",  emoji: "🤱", color: "#7c3aed", bg: "#f5f3ff" },
//   { label: "Citrus",      emoji: "🍋", color: "#d97706", bg: "#fffbeb" },
//   { label: "Broccoli",    emoji: "🥦", color: "#16a34a", bg: "#f0fdf4" },
//   { label: "Arabidopsis", emoji: "🌿", color: "#0d9488", bg: "#f0fdfa" },
//   { label: "Negative",    emoji: "⊖",  color: "#64748b", bg: "#f8fafc" },
// ];

// // ─── Main Component ───────────────────────────────────────────────────────────

// const About: React.FC = () => {
//   return (
//     <div style={{ background: "#f8fafc" }} className="min-h-screen pb-24">
//       <main className="max-w-6xl mx-auto px-5 py-14 space-y-16">

//         {/* ── Hero ── */}
//         <div className="max-w-2xl">
//           <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">About the Platform</p>
//           <h1 className="text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
//             What is EVSource Predictor?
//           </h1>
//           <p className="text-lg text-slate-500 leading-relaxed">
//             A machine-learning framework for multi-class classification of food-derived extracellular vesicle (EV) proteins based solely on protein sequence–derived features — bridging computational biology and nutritional science.
//           </p>
//         </div>

//         {/* ── Mission + Stats ── */}
//         <div
//           className="rounded-2xl p-8 md:p-10"
//           style={{ background: "white", border: "1px solid #e2e8f0" }}
//         >
//           <div className="grid md:grid-cols-2 gap-10 items-start">
//             <div>
//               <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Our Mission</p>
//               <h2 className="text-xl font-bold text-slate-900 mb-4">
//                 Scalable, sequence-driven EV protein prediction.
//               </h2>
//               <p className="text-sm text-slate-500 leading-relaxed mb-3">
//                 Identifying the food source of an EV protein traditionally requires costly wet-lab experiments. EVSource Predictor replaces that bottleneck with a fast, accurate ML pipeline that runs in seconds.
//               </p>
//               <p className="text-sm text-slate-500 leading-relaxed">
//                 This work intentionally avoids ligand binding, docking, molecular dynamics, or chemical reaction modeling — focusing instead on data-driven sequence-level learning, making it scalable and generalizable.
//               </p>
//             </div>
//             <div className="grid grid-cols-2 gap-3">
//               <StatCard value="6"      label="Source Classes"    />
//               <StatCard value="~89%"   label="Test Accuracy"     />
//               <StatCard value="17K+"   label="EV Proteins"       />
//               <StatCard value="<5s"    label="Inference Time"    />
//             </div>
//           </div>
//         </div>

//         {/* ── Source Classes ── */}
//         <div>
//           <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Classification Targets</p>
//           <h2 className="text-xl font-bold text-slate-900 mb-5">Six Source Categories</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
//             {SOURCE_CLASSES.map(({ label, emoji, color, bg }) => (
//               <div
//                 key={label}
//                 className="rounded-xl p-4 flex flex-col items-center gap-2 text-center"
//                 style={{ background: bg, border: `1px solid ${color}20` }}
//               >
//                 <span className="text-2xl">{emoji}</span>
//                 <span className="text-xs font-semibold leading-tight" style={{ color }}>{label}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ── Methodology ── */}
//         <div>
//           <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">How It Works</p>
//           <h2 className="text-xl font-bold text-slate-900 mb-2">The ML Pipeline</h2>
//           <p className="text-sm text-slate-500 mb-6">
//             A two-stage feature extraction approach fused into a stack ensemble classifier.
//           </p>

//           <div className="grid md:grid-cols-3 gap-4 mb-4">
//             <MethodCard
//               icon={<Beaker size={16} />}
//               title="ESM2 Embeddings"
//               tag="Stage 1"
//               tagColor="#2563eb" tagBg="#eff6ff"
//               description="Each protein sequence is encoded using Meta's ESM2 language model, producing rich contextual embeddings that capture evolutionary and structural information."
//             />
//             <MethodCard
//               icon={<Brain size={16} />}
//               title="Biopython Features"
//               tag="Stage 2"
//               tagColor="#7c3aed" tagBg="#f5f3ff"
//               description="Physicochemical and sequence-derived features (amino acid composition, dipeptide composition, molecular weight, isoelectric point) extracted via Biopython."
//             />
//             <MethodCard
//               icon={<Layers size={16} />}
//               title="Stack Ensemble"
//               tag="Stage 3"
//               tagColor="#16a34a" tagBg="#f0fdf4"
//               description="Features are concatenated and passed through a stack ensemble classifier combining multiple base learners with a meta-classifier for robust multi-class prediction."
//             />
//           </div>

//           <div className="grid md:grid-cols-3 gap-4">
//             <MethodCard
//               icon={<Database size={16} />}
//               title="Dataset Curation"
//               tag="Data"
//               tagColor="#d97706" tagBg="#fffbeb"
//               description="High-confidence EV protein datasets curated from cow milk, human milk, citrus, broccoli, and Arabidopsis. A carefully assembled negative class balances the training distribution."
//             />
//             <MethodCard
//               icon={<Target size={16} />}
//               title="Training Strategy"
//               tag="Training"
//               tagColor="#0d9488" tagBg="#f0fdfa"
//               description="Trained with stratified k-fold cross-validation. Class imbalance handled via inverse-frequency weighting. Early stopping on macro F1 score with patience=15."
//             />
//             <MethodCard
//               icon={<Zap size={16} />}
//               title="Performance"
//               tag="Results"
//               tagColor="#64748b" tagBg="#f8fafc"
//               description="The model achieves ~89% accuracy with strong per-class F1 across all 6 source categories. Full confusion matrix and per-class breakdown available in the paper."
//             />
//           </div>
//         </div>

//         {/* ── Architecture diagram ── */}
//         <div
//           className="rounded-2xl p-8 md:p-10"
//           style={{ background: "white", border: "1px solid #e2e8f0" }}
//         >
//           <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">Architecture Overview</p>
//           <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium">
//             {[
//               { label: "Protein\nSequence",    color: "#0f172a", bg: "#f8fafc",  border: "#e2e8f0"  },
//               null,
//               { label: "ESM2\nEmbeddings",     color: "#2563eb", bg: "#eff6ff",  border: "#bfdbfe"  },
//               { label: "BioPython\nFeatures",  color: "#7c3aed", bg: "#f5f3ff",  border: "#ddd6fe"  },
//               null,
//               { label: "Feature\nConcat",      color: "#475569", bg: "#f8fafc",  border: "#e2e8f0"  },
//               null,
//               { label: "Stack\nEnsemble",      color: "#16a34a", bg: "#f0fdf4",  border: "#bbf7d0"  },
//               null,
//               { label: "Source\nPrediction",   color: "#ffffff", bg: "#1a56db",  border: "#1a56db"  },
//             ].map((item, i) =>
//               item === null ? (
//                 <span key={i} className="text-slate-300 font-bold px-1">→</span>
//               ) : (
//                 <div
//                   key={i}
//                   className="rounded-lg px-4 py-2.5 text-center whitespace-pre-line leading-tight text-xs font-semibold"
//                   style={{
//                     background: item.bg,
//                     border: `1px solid ${item.border}`,
//                     color: item.color,
//                     minWidth: "82px",
//                   }}
//                 >
//                   {item.label}
//                 </div>
//               )
//             )}
//           </div>
//         </div>

//         {/* ── Team ── */}
//         <div>
//           <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">The Team</p>
//           <h2 className="text-xl font-bold text-slate-900 mb-5">Built by Researchers</h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <TeamMember name="[Your Name]"         role="Lead Researcher"        affiliation="IIIT Delhi"             initials="YN" color="#1a56db" />
//             <TeamMember name="[Collaborator Name]" role="ML Engineering"         affiliation="[Their Institution]"    initials="CN" color="#7c3aed" />
//             <TeamMember name="Prof. Ganesh Bagler" role="Principal Investigator" affiliation="CoSyLab, IIIT Delhi"    initials="GB" color="#16a34a" />
//           </div>
//         </div>

//         {/* ── Citation ── */}
//         <div
//           className="rounded-2xl p-8"
//           style={{ background: "white", border: "1px solid #e2e8f0" }}
//         >
//           <div className="flex items-start gap-4">
//             <div
//               className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
//               style={{ background: "#eff6ff", color: "#1a56db" }}
//             >
//               <BookOpen size={16} />
//             </div>
//             <div className="flex-1">
//               <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Cite This Work</p>
//               <div
//                 className="rounded-lg px-5 py-4 font-mono text-sm leading-relaxed"
//                 style={{ background: "#f8fafc", color: "#475569", border: "1px solid #e2e8f0" }}
//               >
//                 [Author(s)]. EVSource Predictor: Multi-Class Classification of Food-Derived EV Proteins.
//                 <span style={{ color: "#1a56db" }}> [Journal / Conference]</span>, [Year].
//                 doi: [your-doi-here]
//               </div>
//               <p className="text-xs text-slate-400 mt-3">
//                 Contact:{" "}
//                 <a href="mailto:bagler+multiev@iiitd.ac.in" className="text-blue-600 hover:underline">
//                   bagler+multiev@iiitd.ac.in
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>

//       </main>
//     </div>
//   );
// };

// export default About;

import React from "react";
import { Beaker, Brain, Database, Layers, Target, Zap, BookOpen, Sparkles } from "lucide-react";

const T = {
  ink: "#F4F8F5",
  surface: "#FFFFFF",
  hairline: "rgba(15,23,42,0.08)",
  text: "#16211C",
  muted: "#5F6E66",
  primary: "#1F9E88",
  primaryDim: "rgba(31,158,136,0.10)",
};

const FontLoader: React.FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
    .font-display { font-family: 'Space Grotesk', sans-serif; }
    .font-body { font-family: 'Inter', sans-serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

const cardClass = "rounded-2xl";
const cardStyle: React.CSSProperties = { background: T.surface, border: `1px solid ${T.hairline}` };

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatCardProps  { value: string; label: string }
interface MethodCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
  tagColor: string;
  tagBg: string;
}
interface TeamMemberProps {
  name: string;
  role: string;
  affiliation: string;
  initials: string;
  color: string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const StatCard: React.FC<StatCardProps> = ({ value, label }) => (
  <div className="rounded-xl p-5 text-center" style={{ background: T.ink, border: `1px solid ${T.hairline}` }}>
    <p className="font-display text-3xl font-semibold tracking-tight mb-1" style={{ color: T.primary }}>{value}</p>
    <p className="font-mono text-[11px] uppercase tracking-[0.1em]" style={{ color: T.muted }}>{label}</p>
  </div>
);

const MethodCard: React.FC<MethodCardProps> = ({ icon, title, description, tag, tagColor, tagBg }) => (
  <div className={`p-6 flex flex-col gap-4 ${cardClass}`} style={cardStyle}>
    <div className="flex items-start justify-between gap-3">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: tagBg, color: tagColor }}>
        {icon}
      </div>
      <span
        className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full"
        style={{ background: tagBg, color: tagColor }}
      >
        {tag}
      </span>
    </div>
    <div>
      <h3 className="font-display text-sm font-semibold mb-1.5" style={{ color: T.text }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: T.muted }}>{description}</p>
    </div>
  </div>
);

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, affiliation, initials, color }) => (
  <div className={`p-5 flex items-center gap-4 ${cardClass}`} style={cardStyle}>
    <div
      className="font-mono w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm"
      style={{ background: color }}
    >
      {initials}
    </div>
    <div>
      <p className="font-display text-sm font-semibold" style={{ color: T.text }}>{name}</p>
      <p className="text-xs font-medium mt-0.5" style={{ color: T.primary }}>{role}</p>
      <p className="text-xs mt-0.5" style={{ color: T.muted }}>{affiliation}</p>
    </div>
  </div>
);

// ─── Source classes ───────────────────────────────────────────────────────────

const SOURCE_CLASSES = [
  { label: "Cow Milk",    emoji: "🐄", color: "#1F9E88", bg: "rgba(31,158,136,0.10)" },
  { label: "Human Milk",  emoji: "🤱", color: "#5B8FDB", bg: "rgba(91,143,219,0.10)" },
  { label: "Citrus",      emoji: "🍋", color: "#D98A46", bg: "rgba(217,138,70,0.12)" },
  { label: "Broccoli",    emoji: "🥦", color: "#5FA157", bg: "rgba(95,161,87,0.10)" },
  { label: "Arabidopsis", emoji: "🌿", color: "#2D9C8E", bg: "rgba(45,156,142,0.10)" },
  { label: "Negative",    emoji: "⊖",  color: "#8A97A6", bg: "rgba(138,151,166,0.12)" },
];

// ─── Main Component ───────────────────────────────────────────────────────────

const About: React.FC = () => {
  return (
    <div style={{ background: T.ink }} className="min-h-screen pb-24 font-body">
      <FontLoader />
      <main className="max-w-6xl mx-auto px-5 py-14 space-y-16">

        {/* ── Hero ── */}
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-3" style={{ color: T.primary }}>
            <Sparkles size={11} className="inline mr-1.5 -mt-0.5" />
            About the platform
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight leading-tight mb-4" style={{ color: T.text }}>
            What is EVSource Predictor?
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: T.muted }}>
            A machine-learning framework for multi-class classification of food-derived extracellular vesicle (EV) proteins based solely on protein sequence–derived features — bridging computational biology and nutritional science.
          </p>
        </div>

        {/* ── Mission + Stats ── */}
        <div className={`p-8 md:p-10 ${cardClass}`} style={cardStyle}>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-3" style={{ color: T.muted }}>Our mission</p>
              <h2 className="font-display text-xl font-semibold mb-4" style={{ color: T.text }}>
                Scalable, sequence-driven EV protein prediction.
              </h2>
              <p className="text-sm leading-relaxed mb-3" style={{ color: T.muted }}>
                Identifying the food source of an EV protein traditionally requires costly wet-lab experiments. EVSource Predictor replaces that bottleneck with a fast, accurate ML pipeline that runs in seconds.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: T.muted }}>
                This work intentionally avoids ligand binding, docking, molecular dynamics, or chemical reaction modeling — focusing instead on data-driven sequence-level learning, making it scalable and generalizable.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <StatCard value="6"      label="Source Classes"    />
              <StatCard value="~89%"   label="Test Accuracy"     />
              <StatCard value="17K+"   label="EV Proteins"       />
              <StatCard value="<5s"    label="Inference Time"    />
            </div>
          </div>
        </div>

        {/* ── Source Classes ── */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-2.5" style={{ color: T.primary }}>Classification targets</p>
          <h2 className="font-display text-2xl font-semibold mb-6" style={{ color: T.text }}>Six Source Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SOURCE_CLASSES.map(({ label, emoji, color, bg }) => (
              <div
                key={label}
                className="rounded-xl p-4 flex flex-col items-center gap-2 text-center"
                style={{ background: bg, border: `1px solid ${color}30` }}
              >
                <span className="text-2xl">{emoji}</span>
                <span className="text-xs font-semibold leading-tight" style={{ color }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Methodology ── */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-2.5" style={{ color: T.primary }}>How it works</p>
          <h2 className="font-display text-2xl font-semibold mb-2" style={{ color: T.text }}>The ML Pipeline</h2>
          <p className="text-sm mb-6" style={{ color: T.muted }}>
            A two-stage feature extraction approach fused into a stack ensemble classifier.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <MethodCard
              icon={<Beaker size={16} />}
              title="ESM2 Embeddings"
              tag="Stage 1"
              tagColor="#1F9E88" tagBg="rgba(31,158,136,0.10)"
              description="Each protein sequence is encoded using Meta's ESM2 language model, producing rich contextual embeddings that capture evolutionary and structural information."
            />
            <MethodCard
              icon={<Brain size={16} />}
              title="Biopython Features"
              tag="Stage 2"
              tagColor="#5B8FDB" tagBg="rgba(91,143,219,0.10)"
              description="Physicochemical and sequence-derived features (amino acid composition, dipeptide composition, molecular weight, isoelectric point) extracted via Biopython."
            />
            <MethodCard
              icon={<Layers size={16} />}
              title="Stack Ensemble"
              tag="Stage 3"
              tagColor="#5FA157" tagBg="rgba(95,161,87,0.10)"
              description="Features are concatenated and passed through a stack ensemble classifier combining multiple base learners with a meta-classifier for robust multi-class prediction."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <MethodCard
              icon={<Database size={16} />}
              title="Dataset Curation"
              tag="Data"
              tagColor="#D98A46" tagBg="rgba(217,138,70,0.12)"
              description="High-confidence EV protein datasets curated from cow milk, human milk, citrus, broccoli, and Arabidopsis. A carefully assembled negative class balances the training distribution."
            />
            <MethodCard
              icon={<Target size={16} />}
              title="Training Strategy"
              tag="Training"
              tagColor="#2D9C8E" tagBg="rgba(45,156,142,0.10)"
              description="Trained with stratified k-fold cross-validation. Class imbalance handled via inverse-frequency weighting. Early stopping on macro F1 score with patience=15."
            />
            <MethodCard
              icon={<Zap size={16} />}
              title="Performance"
              tag="Results"
              tagColor="#8A97A6" tagBg="rgba(138,151,166,0.12)"
              description="The model achieves ~89% accuracy with strong per-class F1 across all 6 source categories. Full confusion matrix and per-class breakdown available in the paper."
            />
          </div>
        </div>

        {/* ── Architecture diagram ── */}
        <div className={`p-8 md:p-10 ${cardClass}`} style={cardStyle}>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-6" style={{ color: T.muted }}>Architecture overview</p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium">
            {[
              { label: "Protein\nSequence",    color: T.text,   bg: T.ink,                        border: T.hairline },
              null,
              { label: "ESM2\nEmbeddings",     color: "#1F9E88", bg: "rgba(31,158,136,0.10)",     border: "rgba(31,158,136,0.30)" },
              { label: "BioPython\nFeatures",  color: "#5B8FDB", bg: "rgba(91,143,219,0.10)",     border: "rgba(91,143,219,0.30)" },
              null,
              { label: "Feature\nConcat",      color: T.muted,  bg: T.ink,                        border: T.hairline },
              null,
              { label: "Stack\nEnsemble",      color: "#5FA157", bg: "rgba(95,161,87,0.10)",      border: "rgba(95,161,87,0.30)" },
              null,
              { label: "Source\nPrediction",   color: "#ffffff", bg: T.primary,                   border: T.primary },
            ].map((item, i) =>
              item === null ? (
                <span key={i} className="font-bold px-1" style={{ color: T.hairline }}>→</span>
              ) : (
                <div
                  key={i}
                  className="rounded-lg px-4 py-2.5 text-center whitespace-pre-line leading-tight text-xs font-semibold"
                  style={{ background: item.bg, border: `1px solid ${item.border}`, color: item.color, minWidth: "82px" }}
                >
                  {item.label}
                </div>
              )
            )}
          </div>
        </div>

        {/* ── Team ── */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-2.5" style={{ color: T.primary }}>The team</p>
          <h2 className="font-display text-2xl font-semibold mb-6" style={{ color: T.text }}>Built by Researchers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TeamMember name="[Your Name]"         role="Lead Researcher"        affiliation="IIIT Delhi"             initials="YN" color="#1F9E88" />
            <TeamMember name="[Collaborator Name]" role="ML Engineering"         affiliation="[Their Institution]"    initials="CN" color="#5B8FDB" />
            <TeamMember name="Prof. Ganesh Bagler" role="Principal Investigator" affiliation="CoSyLab, IIIT Delhi"    initials="GB" color="#5FA157" />
          </div>
        </div>

        {/* ── Citation ── */}
        <div className={`p-8 ${cardClass}`} style={cardStyle}>
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: T.primaryDim, color: T.primary }}>
              <BookOpen size={16} />
            </div>
            <div className="flex-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-3" style={{ color: T.muted }}>Cite this work</p>
              <div
                className="font-mono rounded-lg px-5 py-4 text-sm leading-relaxed"
                style={{ background: T.ink, color: T.muted, border: `1px solid ${T.hairline}` }}
              >
                [Author(s)]. EVSource Predictor: Multi-Class Classification of Food-Derived EV Proteins.
                <span style={{ color: T.primary }}> [Journal / Conference]</span>, [Year].
                doi: [your-doi-here]
              </div>
              <p className="text-xs mt-3" style={{ color: T.muted }}>
                Contact:{" "}
                <a href="mailto:bagler+multiev@iiitd.ac.in" style={{ color: T.primary }} className="hover:underline">
                  bagler+multiev@iiitd.ac.in
                </a>
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default About;