import React, { useState } from "react";
import { Search, ChevronDown, HelpCircle } from "lucide-react";

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

type FAQItem = { q: string; a: React.ReactNode };

const faqs: FAQItem[] = [
  {
    q: "What services does EVSource Predictor provide?",
    a: (
      <div className="text-sm leading-relaxed space-y-2" style={{ color: T.muted }}>
        <p>EVSource Predictor offers multi-class classification of food-derived EV proteins:</p>
        <ul className="list-disc pl-5 space-y-1">
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
      <p className="text-sm leading-relaxed" style={{ color: T.muted }}>
        We use two complementary representations: (1) contextual embeddings from Meta's pre-trained ESM2 protein language model, and (2) physicochemical features extracted using Biopython — including amino acid composition, dipeptide composition, molecular weight, and isoelectric point.
      </p>
    ),
  },
  {
    q: "What is the predictive performance of the model?",
    a: (
      <p className="text-sm leading-relaxed" style={{ color: T.muted }}>
        The stack ensemble model achieves approximately 89% accuracy and strong per-class F1 scores across all six source categories. Detailed metrics including confusion matrices and per-class precision/recall are available in the associated publication.
      </p>
    ),
  },
  {
    q: "Which food sources can be predicted?",
    a: (
      <div className="text-sm leading-relaxed space-y-2" style={{ color: T.muted }}>
        <p>The classifier supports six classes:</p>
        <ul className="list-disc pl-5 space-y-1">
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
      <p className="text-sm leading-relaxed" style={{ color: T.muted }}>
        The web server has been tested and runs successfully on Linux, macOS, and Windows. Any modern browser is supported.
      </p>
    ),
  },
  {
    q: "Is the web server mobile-friendly?",
    a: (
      <p className="text-sm leading-relaxed" style={{ color: T.muted }}>
        Yes, the interface is fully responsive and works on mobile browsers. For the best experience with batch file uploads and result tables, a mid-to-large screen is recommended.
      </p>
    ),
  },
  {
    q: "What is the tech stack used to build this platform?",
    a: (
      <div className="text-sm space-y-3" style={{ color: T.muted }}>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] mb-1" style={{ color: T.primary }}>Frontend</p>
          <p>TypeScript, React, Tailwind CSS</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] mb-1" style={{ color: T.primary }}>Backend</p>
          <p>Python, Flask, MongoDB, Scikit-learn, Pandas, NumPy, ESM2</p>
        </div>
      </div>
    ),
  },
  {
    q: "How can I contribute or report issues?",
    a: (
      <p className="text-sm leading-relaxed" style={{ color: T.muted }}>
        We welcome contributions, bug reports, and suggestions. Please contact us at{" "}
        <a href="mailto:bagler+multiev@iiitd.ac.in" className="font-medium hover:underline" style={{ color: T.primary }}>
          bagler+multiev@iiitd.ac.in
        </a>.
      </p>
    ),
  },
  {
    q: "How do I cite EVSource Predictor?",
    a: (
      <div className="font-mono text-sm rounded-lg p-4" style={{ background: T.ink, border: `1px solid ${T.hairline}` }}>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] mb-2" style={{ color: T.primary }}>Citation</p>
        <p className="italic leading-relaxed" style={{ color: T.muted }}>
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
    <div style={{ background: T.ink }} className="min-h-screen font-body">
      <FontLoader />
      <main className="max-w-3xl mx-auto px-5 py-14">

        {/* Header */}
        <div className="mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-2.5" style={{ color: T.primary }}>Help center</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight mb-2" style={{ color: T.text }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: T.muted }}>Find answers to common questions about EVSource Predictor.</p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: T.muted }} />
          <input
            type="text"
            placeholder="Search FAQs…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium outline-none transition-all"
            style={{ background: T.surface, border: `1.5px solid ${T.hairline}`, color: T.text }}
            onFocus={e => {
              e.target.style.border = `1.5px solid ${T.primary}`;
              e.target.style.boxShadow = "0 0 0 3px rgba(31,158,136,0.12)";
            }}
            onBlur={e => {
              e.target.style.border = `1.5px solid ${T.hairline}`;
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        {/* FAQ list */}
        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${T.hairline}`, background: T.surface }}>
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <HelpCircle size={28} className="mx-auto mb-3" style={{ color: T.hairline }} />
              <p className="text-sm font-medium" style={{ color: T.muted }}>No results found for "{searchTerm}"</p>
            </div>
          ) : (
            filtered.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${T.hairline}` : "none" }}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors"
                    style={{ background: isOpen ? T.ink : T.surface }}
                  >
                    <span className="text-sm font-semibold pr-4 transition-colors" style={{ color: isOpen ? T.primary : T.text }}>
                      {item.q}
                    </span>
                    <div
                      className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                      style={{ background: isOpen ? T.primary : T.ink, color: isOpen ? "white" : T.muted }}
                    >
                      <ChevronDown
                        size={14}
                        className="transition-transform duration-200"
                        style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                      />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5" style={{ borderTop: `1px solid ${T.hairline}`, paddingTop: "16px" }}>
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Contact nudge */}
        <div className="mt-8 rounded-xl p-5 flex items-center gap-4" style={{ background: T.primaryDim, border: `1px solid rgba(31,158,136,0.25)` }}>
          <HelpCircle size={18} className="flex-shrink-0" style={{ color: T.primary }} />
          <div>
            <p className="text-sm font-semibold mb-0.5" style={{ color: T.text }}>Still have questions?</p>
            <p className="text-xs" style={{ color: T.muted }}>
              Reach us at{" "}
              <a href="mailto:bagler+multiev@iiitd.ac.in" className="font-semibold hover:underline" style={{ color: T.primary }}>
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