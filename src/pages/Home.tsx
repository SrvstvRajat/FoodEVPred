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