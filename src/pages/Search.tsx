import React from "react";
import { Search as SearchIcon } from "lucide-react";

const Search: React.FC = () => {
  return (
    <div className="min-h-screen pb-24" style={{ background: "linear-gradient(160deg, #FDF6EC 0%, #F5EDD8 50%, #FDF0E0 100%)" }}>
      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">

        {/* Hero */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 rounded-full px-5 py-2 text-xs uppercase tracking-[0.2em] font-black mb-6"
            style={{ background: "rgba(200,75,47,0.1)", color: "#C84B2F", border: "1px solid rgba(200,75,47,0.2)" }}>
            <SearchIcon size={13} />
            <span>Database Intelligence</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-5 uppercase" style={{ color: "#2C1810" }}>
            Search <span className="font-serif italic lowercase tracking-normal pr-2" style={{ color: "#C84B2F" }}>Proteins</span>
          </h2>
          <p className="text-lg font-medium" style={{ color: "rgba(44,24,16,0.55)" }}>
            Query our comprehensive database using sequence, UniProt ID, or Temporary ID.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[2.5rem] shadow-sm p-8 md:p-12" style={{ border: "1px solid rgba(44,24,16,0.06)" }}>
          <div className="space-y-8">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest mb-3" style={{ color: "rgba(44,24,16,0.45)" }}>
                Protein Sequence
              </label>
              <input
                className="w-full rounded-[1.5rem] px-6 py-5 outline-none font-medium transition-all"
                style={{ background: "#FDF6EC", border: "2px solid rgba(44,24,16,0.1)", color: "#2C1810" }}
                onFocus={(e) => { e.target.style.border = "2px solid #C84B2F"; e.target.style.background = "white"; }}
                onBlur={(e) => { e.target.style.border = "2px solid rgba(44,24,16,0.1)"; e.target.style.background = "#FDF6EC"; }}
                placeholder="Enter protein sequence..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-3" style={{ color: "rgba(44,24,16,0.45)" }}>
                  UniProt ID
                </label>
                <input
                  className="w-full rounded-[1.5rem] px-6 py-5 outline-none font-medium transition-all"
                  style={{ background: "#FDF6EC", border: "2px solid rgba(44,24,16,0.1)", color: "#2C1810" }}
                  onFocus={(e) => { e.target.style.border = "2px solid #C84B2F"; e.target.style.background = "white"; }}
                  onBlur={(e) => { e.target.style.border = "2px solid rgba(44,24,16,0.1)"; e.target.style.background = "#FDF6EC"; }}
                  placeholder="e.g., P12345"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-3" style={{ color: "rgba(44,24,16,0.45)" }}>
                  Temporary ID
                </label>
                <input
                  className="w-full rounded-[1.5rem] px-6 py-5 outline-none font-medium transition-all"
                  style={{ background: "#FDF6EC", border: "2px solid rgba(44,24,16,0.1)", color: "#2C1810" }}
                  onFocus={(e) => { e.target.style.border = "2px solid #C84B2F"; e.target.style.background = "white"; }}
                  onBlur={(e) => { e.target.style.border = "2px solid rgba(44,24,16,0.1)"; e.target.style.background = "#FDF6EC"; }}
                  placeholder="Enter temporary ID..."
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t" style={{ borderColor: "rgba(44,24,16,0.07)" }}>
              <button
                className="w-full sm:w-auto px-10 py-4 font-black text-sm uppercase tracking-widest rounded-full transition-all"
                style={{ background: "white", border: "2px solid rgba(44,24,16,0.12)", color: "#2C1810" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#FDF6EC"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "white"; }}
              >
                Try Sample
              </button>
              <button
                className="w-full sm:w-auto px-10 py-4 font-black text-sm uppercase tracking-widest rounded-full text-white flex items-center justify-center gap-3 transition-colors"
                style={{ background: "#C84B2F" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#2C1810"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#C84B2F"; }}
              >
                <SearchIcon size={17} />
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