import React from "react";
import { Search as SearchIcon } from "lucide-react";

const T = {
  ink: "#F4F8F5",
  surface: "#FFFFFF",
  hairline: "rgba(15,23,42,0.08)",
  hairlineStrong: "rgba(15,23,42,0.14)",
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

const fieldStyle: React.CSSProperties = {
  background: T.ink,
  border: `1.5px solid ${T.hairlineStrong}`,
  color: T.text,
};

const Search: React.FC = () => {
  return (
    <div className="min-h-screen pb-24 font-body" style={{ background: T.ink }}>
      <FontLoader />
      <main className="max-w-4xl mx-auto px-6 py-16 md:py-20">

        {/* Hero */}
        <div className="mb-12">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 border"
            style={{ borderColor: T.hairlineStrong, background: T.primaryDim }}
          >
            <SearchIcon size={13} style={{ color: T.primary }} />
            <span className="font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: T.primary }}>
              database intelligence
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight mb-4" style={{ color: T.text }}>
            Search proteins
          </h1>
          <p className="text-lg leading-relaxed max-w-xl" style={{ color: T.muted }}>
            Query the database using sequence, UniProt ID, or temporary ID.
          </p>
        </div>

        {/* Form Card */}
        <div
          className="rounded-2xl p-8 md:p-10"
          style={{ background: T.surface, border: `1px solid ${T.hairline}` }}
        >
          <div className="space-y-7">
            <div>
              <label className="font-mono block text-[11px] uppercase tracking-[0.15em] mb-2.5" style={{ color: T.muted }}>
                Protein sequence
              </label>
              <input
                className="w-full rounded-xl px-5 py-4 outline-none font-medium transition-all font-mono text-sm"
                style={fieldStyle}
                onFocus={(e) => { e.target.style.border = `1.5px solid ${T.primary}`; e.target.style.background = T.surface; }}
                onBlur={(e) => { e.target.style.border = `1.5px solid ${T.hairlineStrong}`; e.target.style.background = T.ink; }}
                placeholder="Enter protein sequence..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="font-mono block text-[11px] uppercase tracking-[0.15em] mb-2.5" style={{ color: T.muted }}>
                  UniProt ID
                </label>
                <input
                  className="w-full rounded-xl px-5 py-4 outline-none font-medium transition-all"
                  style={fieldStyle}
                  onFocus={(e) => { e.target.style.border = `1.5px solid ${T.primary}`; e.target.style.background = T.surface; }}
                  onBlur={(e) => { e.target.style.border = `1.5px solid ${T.hairlineStrong}`; e.target.style.background = T.ink; }}
                  placeholder="e.g., P12345"
                />
              </div>
              <div>
                <label className="font-mono block text-[11px] uppercase tracking-[0.15em] mb-2.5" style={{ color: T.muted }}>
                  Temporary ID
                </label>
                <input
                  className="w-full rounded-xl px-5 py-4 outline-none font-medium transition-all"
                  style={fieldStyle}
                  onFocus={(e) => { e.target.style.border = `1.5px solid ${T.primary}`; e.target.style.background = T.surface; }}
                  onBlur={(e) => { e.target.style.border = `1.5px solid ${T.hairlineStrong}`; e.target.style.background = T.ink; }}
                  placeholder="Enter temporary ID..."
                />
              </div>
            </div>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t"
              style={{ borderColor: T.hairline }}
            >
              <button
                className="w-full sm:w-auto px-8 py-3.5 font-semibold text-sm rounded-xl transition-all"
                style={{ background: T.surface, border: `1.5px solid ${T.hairlineStrong}`, color: T.text }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = T.ink; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = T.surface; }}
              >
                Try Sample
              </button>
              <button
                className="w-full sm:w-auto px-8 py-3.5 font-semibold text-sm rounded-xl text-white flex items-center justify-center gap-2.5 transition-all hover:-translate-y-0.5"
                style={{ background: T.primary }}
              >
                <SearchIcon size={16} />
                <span>Search Database</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;