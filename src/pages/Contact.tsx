
// // import React from "react";
// // import { Mail, Phone, MapPin, Send } from "lucide-react";

// // const Contact: React.FC = () => {
// //   return (
// //     <div
// //       className="min-h-screen"
// //       style={{
// //         background:
// //           "linear-gradient(160deg, #FDF6EC 0%, #F5EDD8 50%, #FDF0E0 100%)",
// //       }}
// //     >
// //       <main className="max-w-6xl mx-auto px-6 py-16">
// //         {/* Header */}
// //         <div className="text-center mb-14">
// //           <div
// //             className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6"
// //             style={{
// //               background: "rgba(200,75,47,0.1)",
// //               color: "#C84B2F",
// //               border: "1px solid rgba(200,75,47,0.2)",
// //             }}
// //           >
// //             <Send size={13} />
// //             <span>Get In Touch</span>
// //           </div>

// //           <h2
// //             className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-4"
// //             style={{ color: "#2C1810" }}
// //           >
// //             Contact{" "}
// //             <span
// //               className="font-serif italic lowercase"
// //               style={{ color: "#C84B2F" }}
// //             >
// //               Us
// //             </span>
// //           </h2>

// //           <p
// //             className="font-medium"
// //             style={{ color: "rgba(44,24,16,0.55)" }}
// //           >
// //             Have questions? We'd love to hear from you
// //           </p>
// //         </div>

// //         <div className="grid md:grid-cols-2 gap-8">
// //           {/* Contact Info Card */}
// //           <div
// //             className="rounded-[2.5rem] shadow-xl p-10 text-[#F5F0E8]"
// //             style={{
// //               background:
// //                 "linear-gradient(135deg, #2C1810 0%, #4A2218 60%, #C84B2F 100%)",
// //             }}
// //           >
// //             <h3 className="text-2xl font-black mb-10 tracking-tight">
// //               Contact Information
// //             </h3>

// //             <div className="space-y-8">
// //               {/* Email */}
// //               <div className="flex gap-5 items-start">
// //                 <div
// //                   className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
// //                   style={{ background: "rgba(245,240,232,0.15)" }}
// //                 >
// //                   <Mail className="text-[#F5A96A]" size={22} />
// //                 </div>
// //                 <div>
// //                   <h4 className="font-black text-xs uppercase tracking-widest mb-2 text-[#F5A96A]">
// //                     Email
// //                   </h4>
// //                   <a
// //                     href="mailto:bagler+multiev@iiitd.ac.in"
// //                     className="text-[#F5F0E8]/75 hover:text-[#F5F0E8] transition-colors font-medium"
// //                   >
// //                     bagler+multiev@iiitd.ac.in
// //                   </a>
// //                 </div>
// //               </div>

// //               {/* Phone */}
// //               <div className="flex gap-5 items-start">
// //                 <div
// //                   className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
// //                   style={{ background: "rgba(245,240,232,0.15)" }}
// //                 >
// //                   <Phone className="text-[#F5A96A]" size={22} />
// //                 </div>
// //                 <div>
// //                   <h4 className="font-black text-xs uppercase tracking-widest mb-2 text-[#F5A96A]">
// //                     Phone
// //                   </h4>
// //                   <p className="text-[#F5F0E8]/75 font-medium">
// //                     +91-11-26907-443
// //                   </p>
// //                 </div>
// //               </div>

// //               {/* Address */}
// //               <div className="flex gap-5 items-start">
// //                 <div
// //                   className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
// //                   style={{ background: "rgba(245,240,232,0.15)" }}
// //                 >
// //                   <MapPin className="text-[#F5A96A]" size={22} />
// //                 </div>
// //                 <div>
// //                   <h4 className="font-black text-xs uppercase tracking-widest mb-2 text-[#F5A96A]">
// //                     Address
// //                   </h4>
// //                   <p className="text-[#F5F0E8]/75 leading-relaxed font-medium">
// //                     Indraprastha Institute of Information Technology Delhi
// //                     (IIIT Delhi)
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="mt-12 pt-8 border-t border-[#F5F0E8]/15">
// //               <h4 className="font-black text-[#F5F0E8] text-base mb-1">
// //                 Prof. Ganesh Bagler
// //               </h4>
// //             </div>
// //           </div>

// //           {/* Google Map */}
// //           <div
// //             className="bg-white rounded-[2.5rem] shadow-xl border p-3 overflow-hidden"
// //             style={{ borderColor: "rgba(44,24,16,0.08)" }}
// //           >
// //             <div className="w-full h-full min-h-[480px] rounded-[2rem] overflow-hidden">
// //               <iframe
// //                 title="IIIT-Delhi Location Map"
// //                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.859649960997!2d77.2716197!3d28.543938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3e45d85d3e3%3A0x691393414902968e!2sIIIT-Delhi%20R%26D%20Building!5e0!3m2!1sen!2sin!4v1775631823892!5m2!1sen!2sin"
// //                 width="100%"
// //                 height="100%"
// //                 style={{ border: 0 }}
// //                 allowFullScreen
// //                 loading="lazy"
// //                 referrerPolicy="no-referrer-when-downgrade"
// //                 className="rounded-[2rem]"
// //               ></iframe>
// //             </div>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// // export default Contact;



// import React from "react";
// import { Mail, Phone, MapPin, Send, ExternalLink } from "lucide-react";

// const Contact: React.FC = () => {
//   return (
//     <div style={{ background: "#f8fafc" }} className="min-h-screen">
//       <main className="max-w-6xl mx-auto px-5 py-14">

//         {/* Header */}
//         <div className="mb-10">
//           <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
//             <Send size={11} className="inline mr-1.5" />
//             Get In Touch
//           </p>
//           <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Contact Us</h1>
//           <p className="text-slate-500">Reach out with questions, collaborations, or feedback.</p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">

//           {/* Info Card */}
//           <div
//             className="rounded-2xl p-8"
//             style={{ background: "#0f172a", color: "#94a3b8" }}
//           >
//             <h2 className="text-lg font-bold text-white mb-8">Contact Information</h2>

//             <div className="space-y-7">
//               <div className="flex gap-4 items-start">
//                 <div
//                   className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
//                   style={{ background: "rgba(26,86,219,0.3)" }}
//                 >
//                   <Mail size={16} className="text-blue-400" />
//                 </div>
//                 <div>
//                   <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Email</p>
//                   <a
//                     href="mailto:bagler+multiev@iiitd.ac.in"
//                     className="text-sm text-slate-300 hover:text-white transition-colors"
//                   >
//                     bagler+multiev@iiitd.ac.in
//                   </a>
//                 </div>
//               </div>

//               <div className="flex gap-4 items-start">
//                 <div
//                   className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
//                   style={{ background: "rgba(26,86,219,0.3)" }}
//                 >
//                   <Phone size={16} className="text-blue-400" />
//                 </div>
//                 <div>
//                   <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Phone</p>
//                   <p className="text-sm text-slate-300">+91-11-26907-443</p>
//                 </div>
//               </div>

//               <div className="flex gap-4 items-start">
//                 <div
//                   className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
//                   style={{ background: "rgba(26,86,219,0.3)" }}
//                 >
//                   <MapPin size={16} className="text-blue-400" />
//                 </div>
//                 <div>
//                   <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Address</p>
//                   <p className="text-sm text-slate-300 leading-relaxed">
//                     Indraprastha Institute of Information Technology Delhi<br />
//                     Okhla Phase III, New Delhi 110020
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div
//               className="mt-10 pt-8"
//               style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
//             >
//               <p className="text-sm font-bold text-white">Prof. Ganesh Bagler</p>
//               <p className="text-xs text-slate-500 mt-0.5 mb-3">Principal Investigator, CoSyLab</p>
//               <a
//                 href="https://cosylab.iiitd.edu.in/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
//               >
//                 Visit CoSyLab <ExternalLink size={11} />
//               </a>
//             </div>
//           </div>

//           {/* Map */}
//           <div
//             className="rounded-2xl overflow-hidden p-2"
//             style={{ background: "white", border: "1px solid #e2e8f0" }}
//           >
//             <div className="w-full h-full min-h-[400px] rounded-xl overflow-hidden">
//               <iframe
//                 title="IIIT-Delhi Location Map"
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.859649960997!2d77.2716197!3d28.543938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3e45d85d3e3%3A0x691393414902968e!2sIIIT-Delhi%20R%26D%20Building!5e0!3m2!1sen!2sin!4v1775631823892!5m2!1sen!2sin"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0 }}
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//               />
//             </div>
//           </div>

//         </div>
//       </main>
//     </div>
//   );
// };

// export default Contact;
import React from "react";
import { Mail, Phone, MapPin, Send, ExternalLink } from "lucide-react";

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

const Contact: React.FC = () => {
  return (
    <div style={{ background: T.ink }} className="min-h-screen font-body">
      <FontLoader />
      <main className="max-w-6xl mx-auto px-5 py-14">

        {/* Header */}
        <div className="mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-2.5" style={{ color: T.primary }}>
            <Send size={11} className="inline mr-1.5 -mt-0.5" />
            Get in touch
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight mb-2" style={{ color: T.text }}>
            Contact us
          </h1>
          <p style={{ color: T.muted }}>Reach out with questions, collaborations, or feedback.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Info Card */}
          <div className="rounded-2xl p-8" style={{ background: "#12211C", color: "rgba(241,244,249,0.7)" }}>
            <h2 className="font-display text-lg font-semibold mb-8" style={{ color: "#F1F4F9" }}>
              Contact information
            </h2>

            <div className="space-y-7">
              <div className="flex gap-4 items-start">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(45,212,191,0.16)" }}
                >
                  <Mail size={16} style={{ color: "#2DD4BF" }} />
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] mb-1" style={{ color: "rgba(241,244,249,0.4)" }}>
                    Email
                  </p>
                  <a
                    href="mailto:bagler+multiev@iiitd.ac.in"
                    className="text-sm transition-colors"
                    style={{ color: "rgba(241,244,249,0.75)" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F1F4F9")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(241,244,249,0.75)")}
                  >
                    bagler+multiev@iiitd.ac.in
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(45,212,191,0.16)" }}
                >
                  <Phone size={16} style={{ color: "#2DD4BF" }} />
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] mb-1" style={{ color: "rgba(241,244,249,0.4)" }}>
                    Phone
                  </p>
                  <p className="text-sm" style={{ color: "rgba(241,244,249,0.75)" }}>+91-11-26907-443</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(45,212,191,0.16)" }}
                >
                  <MapPin size={16} style={{ color: "#2DD4BF" }} />
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] mb-1" style={{ color: "rgba(241,244,249,0.4)" }}>
                    Address
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(241,244,249,0.75)" }}>
                    Indraprastha Institute of Information Technology Delhi<br />
                    Okhla Phase III, New Delhi 110020
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8" style={{ borderTop: "1px solid rgba(241,244,249,0.08)" }}>
              <p className="font-display text-sm font-semibold" style={{ color: "#F1F4F9" }}>Prof. Ganesh Bagler</p>
              <p className="text-xs mt-0.5 mb-3" style={{ color: "rgba(241,244,249,0.4)" }}>
                Principal Investigator, CoSyLab
              </p>
              <a
                href="https://cosylab.iiitd.edu.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
                style={{ color: "#2DD4BF" }}
              >
                Visit CoSyLab <ExternalLink size={11} />
              </a>
            </div>
          </div>

          {/* Map */}
          <div
            className="rounded-2xl overflow-hidden p-2"
            style={{ background: T.surface, border: `1px solid ${T.hairline}` }}
          >
            <div className="w-full h-full min-h-[400px] rounded-xl overflow-hidden">
              <iframe
                title="IIIT-Delhi Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.859649960997!2d77.2716197!3d28.543938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3e45d85d3e3%3A0x691393414902968e!2sIIIT-Delhi%20R%26D%20Building!5e0!3m2!1sen!2sin!4v1775631823892!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Contact;