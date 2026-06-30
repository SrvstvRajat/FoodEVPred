// import React, { useState } from "react";
// import { Search, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

// type FAQItem = {
//   q: string;
//   a: React.ReactNode;
// };

// const faqs: FAQItem[] = [
//   {
//     q: "What are the various services provided by multiev webserver?",
//     a: (
//       <div className="text-sm leading-relaxed" style={{ color: "rgba(44,24,16,0.75)" }}>
//         <p className="mb-3 font-medium">multiev provides comprehensive multiev prediction services:</p>
//         <ul className="list-disc pl-6 space-y-2">
//           <li>Prediction of multievic and non-multievic protein datasets</li>
//           <li>Access to 23,830 proteins (11,930 multievic and 11,930 non-multievic)</li>
//           <li>Batch prediction of peptides (up to 200)</li>
//         </ul>
//       </div>
//     ),
//   },
//   {
//     q: "What are the libraries used to extract the features of proteins?",
//     a: (
//       <p className="text-sm leading-relaxed font-medium" style={{ color: "rgba(44,24,16,0.75)" }}>
//         The pre-trained ESM2 model and Biopython library were used to extract
//         comprehensive protein features for optimal prediction accuracy.
//       </p>
//     ),
//   },
//   {
//     q: "What is the predictive performance of the models?",
//     a: (
//       <p className="text-sm leading-relaxed font-medium" style={{ color: "rgba(44,24,16,0.75)" }}>
//         We predict the multievicity of proteins using a Stack Model with an
//         impressive accuracy of 96.87% and an F1 score of 96.86, demonstrating
//         robust and reliable performance.
//       </p>
//     ),
//   },
//   {
//     q: "Which systems are supported by multiev?",
//     a: (
//       <p className="text-sm leading-relaxed font-medium" style={{ color: "rgba(44,24,16,0.75)" }}>
//         multiev has been thoroughly tested and runs successfully on Linux,
//         MacOS, and Windows operating systems.
//       </p>
//     ),
//   },
//   {
//     q: "Is the web server mobile friendly?",
//     a: (
//       <p className="text-sm leading-relaxed font-medium" style={{ color: "rgba(44,24,16,0.75)" }}>
//         While all functionality of multiev can be accessed using a mobile
//         browser, the platform is optimized for mid to large screen sizes for the
//         best user experience.
//       </p>
//     ),
//   },
//   {
//     q: "Do you use cookies?",
//     a: (
//       <p className="text-sm leading-relaxed font-medium" style={{ color: "rgba(44,24,16,0.75)" }}>
//         Yes, we use cookies to collect statistics that help us provide the best
//         possible experience for our users.
//       </p>
//     ),
//   },
//   {
//     q: "What is the Tech Stack used for building multiev?",
//     a: (
//       <div className="text-sm leading-relaxed" style={{ color: "rgba(44,24,16,0.75)" }}>
//         <p className="mb-2 font-black text-xs uppercase tracking-widest" style={{ color: "#C84B2F" }}>Front End</p>
//         <p className="mb-4 font-medium">HTML, CSS, JavaScript, TypeScript, React, Tailwind CSS</p>
//         <p className="mb-2 font-black text-xs uppercase tracking-widest" style={{ color: "#C84B2F" }}>Back End</p>
//         <p className="font-medium">Python, Flask, MongoDB, Scikit-learn, Pandas, NumPy, ESM2</p>
//       </div>
//     ),
//   },
//   {
//     q: "How do I contribute to multiev web server?",
//     a: (
//       <p className="text-sm leading-relaxed font-medium" style={{ color: "rgba(44,24,16,0.75)" }}>
//         You may contact us at{" "}
//         <span className="font-black" style={{ color: "#C84B2F" }}>
//           bagler+multiev@iiitd.ac.in
//         </span>{" "}
//         for any suggestions or contributions pertaining to the web server.
//       </p>
//     ),
//   },
//   {
//     q: "How to cite multiev?",
//     a: (
//       <div className="text-sm leading-relaxed rounded-2xl p-5 border" style={{ background: "#FDF6EC", borderColor: "rgba(200,75,47,0.15)", color: "rgba(44,24,16,0.75)" }}>
//         <p className="font-black text-xs uppercase tracking-widest mb-3" style={{ color: "#C84B2F" }}>Citation</p>
//         <p className="italic font-medium">
//           Harshika Sharma, Parv Goyal, Rajat Kumar Srivastava and Ganesh Bagler,
//           "multiev - Computational Stack Model To Predict the multiev of Proteins",to be modified BBA advances, 2024.
//         </p>
//       </div>
//     ),
//   },
// ];

// const FAQs: React.FC = () => {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const toggleFAQ = (index: number) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   const filteredFaqs = faqs.filter((item) =>
//     item.q.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #FDF6EC 0%, #F5EDD8 50%, #FDF0E0 100%)" }}>
//       <main className="max-w-5xl mx-auto px-6 py-12">

//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6"
//             style={{ background: "rgba(200,75,47,0.1)", color: "#C84B2F", border: "1px solid rgba(200,75,47,0.2)" }}>
//             <HelpCircle size={13} />
//             <span>Help Center</span>
//           </div>
//           <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-4" style={{ color: "#2C1810" }}>
//             Frequently <span className="font-serif italic lowercase" style={{ color: "#C84B2F" }}>Asked</span>
//           </h2>
//           <p className="font-medium" style={{ color: "rgba(44,24,16,0.55)" }}>
//             Find answers to common questions about multiev
//           </p>
//         </div>

//         {/* Search */}
//         <div className="mb-10">
//           <div className="relative max-w-2xl mx-auto">
//             <Search
//               className="absolute left-5 top-1/2 transform -translate-y-1/2"
//               size={18}
//               style={{ color: "rgba(44,24,16,0.35)" }}
//             />
//             <input
//               type="text"
//               placeholder="Search FAQs..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-14 pr-6 py-5 rounded-[1.5rem] outline-none font-medium transition-all"
//               style={{
//                 background: "white",
//                 border: "2px solid rgba(44,24,16,0.1)",
//                 color: "#2C1810",
//               }}
//               onFocus={(e) => { e.target.style.border = "2px solid #C84B2F"; }}
//               onBlur={(e) => { e.target.style.border = "2px solid rgba(44,24,16,0.1)"; }}
//             />
//           </div>
//         </div>

//         {/* FAQ List */}
//         <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden" style={{ border: "1px solid rgba(44,24,16,0.06)" }}>
//           {filteredFaqs.length === 0 ? (
//             <div className="p-16 text-center">
//               <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "#FDF6EC" }}>
//                 <HelpCircle size={28} style={{ color: "rgba(44,24,16,0.25)" }} />
//               </div>
//               <p className="font-bold" style={{ color: "rgba(44,24,16,0.45)" }}>No FAQs match your search</p>
//             </div>
//           ) : (
//             filteredFaqs.map((item, index) => {
//               const isOpen = openIndex === index;

//               return (
//                 <div
//                   key={index}
//                   className="border-b last:border-b-0"
//                   style={{ borderColor: "rgba(44,24,16,0.07)" }}
//                 >
//                   <button
//                     onClick={() => toggleFAQ(index)}
//                     className="w-full flex items-center justify-between px-8 py-6 text-left transition-all group"
//                     style={{ background: isOpen ? "#FDF6EC" : "white" }}
//                     onMouseEnter={(e) => { if (!isOpen) (e.currentTarget as HTMLButtonElement).style.background = "#FEFAF5"; }}
//                     onMouseLeave={(e) => { if (!isOpen) (e.currentTarget as HTMLButtonElement).style.background = "white"; }}
//                   >
//                     <span
//                       className="font-bold text-base pr-4 transition-colors"
//                       style={{ color: isOpen ? "#C84B2F" : "#2C1810" }}
//                     >
//                       {item.q}
//                     </span>
//                     <div
//                       className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all"
//                       style={{
//                         background: isOpen ? "#C84B2F" : "rgba(44,24,16,0.07)",
//                         color: isOpen ? "white" : "rgba(44,24,16,0.5)",
//                       }}
//                     >
//                       {isOpen ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
//                     </div>
//                   </button>

//                   {isOpen && (
//                     <div className="px-8 py-6 border-t" style={{ background: "#FEFCF8", borderColor: "rgba(200,75,47,0.1)" }}>
//                       {item.a}
//                     </div>
//                   )}
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default FAQs;


import React, { useState } from "react";
import { Search, ChevronDown, HelpCircle } from "lucide-react";

type FAQItem = { q: string; a: React.ReactNode };

const faqs: FAQItem[] = [
  {
    q: "What services does EVSource Predictor provide?",
    a: (
      <div className="text-sm leading-relaxed text-slate-600 space-y-2">
        <p>EVSource Predictor offers multi-class classification of food-derived EV proteins:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-500">
          <li>Single protein sequence prediction with confidence scores</li>
          <li>Batch prediction for up to 200 sequences (via file upload)</li>
          <li>Access to curated EV protein datasets from 5 food sources</li>
          <li>Results delivery via email as a structured CSV file</li>
        </ul>
      </div>
    ),
  },
  {
    q: "What features are used to represent protein sequences?",
    a: (
      <p className="text-sm leading-relaxed text-slate-600">
        We use two complementary representations: (1) contextual embeddings from Meta's pre-trained ESM2 protein language model, and (2) physicochemical features extracted using Biopython — including amino acid composition, dipeptide composition, molecular weight, and isoelectric point.
      </p>
    ),
  },
  {
    q: "What is the predictive performance of the model?",
    a: (
      <p className="text-sm leading-relaxed text-slate-600">
        The stack ensemble model achieves approximately 89% accuracy and strong per-class F1 scores across all six source categories. Detailed metrics including confusion matrices and per-class precision/recall are available in the associated publication.
      </p>
    ),
  },
  {
    q: "Which food sources can be predicted?",
    a: (
      <div className="text-sm leading-relaxed text-slate-600 space-y-2">
        <p>The classifier supports six classes:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-500">
          <li><strong>Animal-derived:</strong> Cow milk, Human milk</li>
          <li><strong>Plant-derived:</strong> Citrus, Broccoli, Arabidopsis</li>
          <li><strong>Negative class:</strong> Non-EV proteins</li>
        </ul>
      </div>
    ),
  },
  {
    q: "Which operating systems are supported?",
    a: (
      <p className="text-sm leading-relaxed text-slate-600">
        The web server has been tested and runs successfully on Linux, macOS, and Windows. Any modern browser is supported.
      </p>
    ),
  },
  {
    q: "Is the web server mobile-friendly?",
    a: (
      <p className="text-sm leading-relaxed text-slate-600">
        Yes, the interface is fully responsive and works on mobile browsers. For the best experience with batch file uploads and result tables, a mid-to-large screen is recommended.
      </p>
    ),
  },
  {
    q: "What is the tech stack used to build this platform?",
    a: (
      <div className="text-sm text-slate-600 space-y-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Frontend</p>
          <p className="text-slate-500">TypeScript, React, Tailwind CSS</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Backend</p>
          <p className="text-slate-500">Python, Flask, MongoDB, Scikit-learn, Pandas, NumPy, ESM2</p>
        </div>
      </div>
    ),
  },
  {
    q: "How can I contribute or report issues?",
    a: (
      <p className="text-sm leading-relaxed text-slate-600">
        We welcome contributions, bug reports, and suggestions. Please contact us at{" "}
        <a href="mailto:bagler+multiev@iiitd.ac.in" className="text-blue-600 font-medium hover:underline">
          bagler+multiev@iiitd.ac.in
        </a>.
      </p>
    ),
  },
  {
    q: "How do I cite EVSource Predictor?",
    a: (
      <div
        className="text-sm rounded-lg p-4"
        style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Citation</p>
        <p className="italic text-slate-600 leading-relaxed">
          [Author(s)]. EVSource Predictor: Computational Multi-Class Classification of Food-Derived Extracellular Vesicle Proteins. [Journal], [Year].
        </p>
      </div>
    ),
  },
];

const FAQs: React.FC = () => {
  const [openIndex,  setOpenIndex]  = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = faqs.filter(item =>
    item.q.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ background: "#f8fafc" }} className="min-h-screen">
      <main className="max-w-3xl mx-auto px-5 py-14">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Help Center</p>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-500">Find answers to common questions about EVSource Predictor.</p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search
            size={15}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search FAQs…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium outline-none transition-all"
            style={{
              background: "white",
              border: "1.5px solid #e2e8f0",
              color: "#0f172a",
            }}
            onFocus={e => {
              e.target.style.border = "1.5px solid #1a56db";
              e.target.style.boxShadow = "0 0 0 3px rgba(26,86,219,0.1)";
            }}
            onBlur={e => {
              e.target.style.border = "1.5px solid #e2e8f0";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        {/* FAQ list */}
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e2e8f0", background: "white" }}>
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <HelpCircle size={28} className="mx-auto mb-3 text-slate-300" />
              <p className="text-sm font-medium text-slate-400">No results found for "{searchTerm}"</p>
            </div>
          ) : (
            filtered.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f1f5f9" : "none" }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors"
                    style={{ background: isOpen ? "#f8fafc" : "white" }}
                  >
                    <span
                      className="text-sm font-semibold pr-4 transition-colors"
                      style={{ color: isOpen ? "#1a56db" : "#0f172a" }}
                    >
                      {item.q}
                    </span>
                    <div
                      className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                      style={{
                        background: isOpen ? "#1a56db" : "#f1f5f9",
                        color: isOpen ? "white" : "#94a3b8",
                      }}
                    >
                      <ChevronDown
                        size={14}
                        className="transition-transform duration-200"
                        style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                      />
                    </div>
                  </button>
                  {isOpen && (
                    <div
                      className="px-6 pb-5"
                      style={{ borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Contact nudge */}
        <div
          className="mt-8 rounded-xl p-5 flex items-center gap-4"
          style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}
        >
          <HelpCircle size={18} className="text-blue-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-0.5">Still have questions?</p>
            <p className="text-xs text-blue-600">
              Reach us at{" "}
              <a href="mailto:bagler+multiev@iiitd.ac.in" className="font-semibold hover:underline">
                bagler+multiev@iiitd.ac.in
              </a>
            </p>
          </div>
        </div>

      </main>
    </div>
  );
};

export default FAQs;