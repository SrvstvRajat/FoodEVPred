// // /* eslint-disable jsx-a11y/anchor-is-valid */
// // import React from "react";
// // import {
// //   Github,
// //   Linkedin,
// //   Twitter,
// //   Facebook,
// //   Instagram,
// //   Mail,
// //   Phone,
// //   MapPin,
// //   ExternalLink,
// //   Utensils,
// // } from "lucide-react";
// // import IIITD from "../Layout/IIITDLogo.jpg";

// // const Footer: React.FC = () => {
// //   return (
// //     <footer style={{ background: "linear-gradient(135deg, #2C1810 0%, #1A0F0A 100%)" }} className="mt-20">
// //       <div className="max-w-7xl mx-auto px-6 py-16">

// //         {/* TOP SECTION */}
// //         <div className="grid md:grid-cols-3 gap-12 mb-12">
// //           {/* Column 1: Logo & Description */}
// //           <div className="md:col-span-2">
// //             <div className="flex items-center gap-3 mb-5">
// //               <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #E8824A, #C84B2F)" }}>
// //                 <Utensils className="text-white" size={22} />
// //               </div>
// //               <div>
// //                 <span className="text-2xl font-black text-[#F5F0E8] tracking-tight block leading-none">MultiTaste</span>
// //                 <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8824A]/70">Intelligence</span>
// //               </div>
// //             </div>
// //             <p className="text-[#F5F0E8]/50 text-sm leading-relaxed max-w-md mb-8 font-medium">
// //             Predict multiple taste properties of proteins using advanced machine learning and AI models
// //             </p>

// //             {/* IIITD Logo */}
// //             <div className="flex items-center gap-4">
// //               <img
// //                 src={IIITD}
// //                 alt="IIITD Logo"
// //                 className="h-14 w-auto object-contain rounded-xl p-2"
// //                 style={{ background: "rgba(245,240,232,0.1)" }}
// //               />
// //             </div>
// //           </div>

// //           {/* Column 2: Contact Info */}
// //           <div>
// //             <h3 className="text-[#F5F0E8] font-black text-xs uppercase tracking-[0.2em] mb-6">Contact</h3>
// //             <ul className="space-y-4">
// //               <li>
// //                 <p className="text-[#F5F0E8]/90 text-sm font-bold mb-1">Prof. Ganesh Bagler</p>
// //                 {/* <p className="text-[#E8824A]/70 text-xs font-bold uppercase tracking-widest">Principal Investigator</p> */}
// //               </li>
// //               <li className="flex gap-3 items-start pt-2">
// //                 <Mail className="text-[#E8824A] flex-shrink-0 mt-0.5" size={15} />
// //                 <a
// //                   href="mailto:bagler+multitaste@iiitd.ac.in"
// //                   className="text-[#F5F0E8]/50 hover:text-[#E8824A] text-sm transition-colors font-medium"
// //                 >
// //                   bagler+multitaste@iiitd.ac.in
// //                 </a>
// //               </li>
// //               <li className="flex gap-3 items-start">
// //                 <Phone className="text-[#E8824A] flex-shrink-0 mt-0.5" size={15} />
// //                 <span className="text-[#F5F0E8]/50 text-sm font-medium">+91-11-26907-443</span>
// //               </li>
// //               <li className="flex gap-3 items-start">
// //                 <MapPin className="text-[#E8824A] flex-shrink-0 mt-0.5" size={15} />
// //                 <span className="text-[#F5F0E8]/50 text-sm font-medium">IIIT-Delhi, India</span>
// //               </li>
// //               <li className="pt-2">
// //                 <a
// //                   href="https://cosylab.iiitd.edu.in/"
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="inline-flex items-center gap-2 text-[#E8824A] hover:text-[#F5A96A] text-sm font-bold transition-colors"
// //                 >
// //                   <span>Visit CoSyLab</span>
// //                   <ExternalLink size={13} />
// //                 </a>
// //               </li>
// //             </ul>
// //           </div>
// //         </div>

// //         {/* DIVIDER */}
// //         <div className="border-t border-[#F5F0E8]/10 mb-8"></div>

// //         {/* BOTTOM SECTION */}
// //         <div className="flex flex-col md:flex-row justify-between items-center gap-6">
// //           {/* Social Icons */}
// //           <div className="flex items-center gap-3">
// //             {[
// //               { Icon: Github, label: "GitHub" },
// //               { Icon: Linkedin, label: "LinkedIn" },
// //               { Icon: Twitter, label: "Twitter" },
// //               { Icon: Facebook, label: "Facebook" },
// //               { Icon: Instagram, label: "Instagram" },
// //             ].map(({ Icon, label }) => (
// //               <a
// //                 key={label}
// //                 href="#"
// //                 className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group"
// //                 style={{ background: "rgba(245,240,232,0.05)" }}
// //                 aria-label={label}
// //               >
// //                 <Icon
// //                   className="text-[#F5F0E8]/40 group-hover:text-[#E8824A] transition-colors"
// //                   size={18}
// //                 />
// //               </a>
// //             ))}
// //           </div>

// //           {/* Copyright */}
// //           <div className="text-center md:text-right">
// //             <p className="text-[#F5F0E8]/40 text-sm mb-1 font-medium">
// //               © 2026 MultiTaste. All rights reserved.
// //             </p>
// //             <p className="text-[#F5F0E8]/25 text-xs">
// //               Indraprastha Institute of Information Technology Delhi
// //             </p>
// //           </div>
// //         </div>

// //         {/* DISCLAIMER */}
// //         <div className="mt-8 pt-8 border-t border-[#F5F0E8]/5">
// //           <p className="text-[#F5F0E8]/25 text-xs leading-relaxed text-center max-w-5xl mx-auto">
// //             <span className="font-bold text-[#F5F0E8]/40">Disclaimer:</span> All
// //             material on this website is a product of research and is provided
// //             for your information only and may not be construed as medical advice
// //             or instruction. No action or inaction should be taken based solely
// //             on the contents of this information; instead, readers should consult
// //             appropriate health professionals on any matter relating to their
// //             health and well-being.
// //           </p>
// //         </div>
// //       </div>
// //     </footer>
// //   );
// // };

// // export default Footer;
// import React from "react";
// import {
//   Github,
//   Linkedin,
//   Twitter,
//   Facebook,
//   Instagram,
//   Mail,
//   Phone,
//   MapPin,
//   ExternalLink,
// } from "lucide-react";
// import IIITD from "../Layout/IIITDLogo.jpg";

// const BLUE = "rgb(0, 34, 157)";
// const BLUE_HOVER = "rgb(30, 60, 180)";
// const BLUE_TINT = "rgba(0, 34, 157, 0.12)";
// const BLUE_BORDER = "rgba(0, 34, 157, 0.25)";

// const Footer: React.FC = () => {
//   return (
//     <footer
//       className="mt-20"
//       style={{
//         marginTop: "0rem",
//         background: "#0e0e0e",
//         borderTop: "1px solid rgba(255,255,255,0.07)",
//       }}
//     >
//       <div className="max-w-7xl mx-auto px-6 py-14">

//         {/* TOP SECTION */}
//         <div className="grid md:grid-cols-3 gap-12 mb-10">

//           {/* Column 1: Logo & Description */}
//           <div className="md:col-span-2">
//             <div className="flex items-center gap-3 mb-5">

//               {/* Badge */}
//               <div
//                 className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-[11px] font-black tracking-tight"
//                 style={{
//                   background: `linear-gradient(135deg, ${BLUE}, rgb(0,0,0))`,
//                 }}
//               >
//                 MEV
//               </div>

//               <div>
//                 <span
//                   className="text-xl font-black tracking-tight block leading-none"
//                   style={{ color: "#F5F0E8" }}
//                 >
//                   MultiEV
//                 </span>

//                 <span
//                   className="text-[10px] font-bold uppercase tracking-[0.2em]"
//                   style={{ color: "rgb(190,188,227)" }}
//                 >
//                   Intelligence
//                 </span>
//               </div>
//             </div>

//             <p
//               className="text-sm leading-relaxed max-w-sm mb-8"
//               style={{
//                 color: "rgba(255,255,255,0.45)",
//                 lineHeight: "1.7",
//               }}
//             >
//               Predict multiple taste properties of proteins using advanced
//               machine learning and AI models
//             </p>

//             {/* IIITD Logo */}
//             <div className="flex items-center gap-4">
//               <img
//                 src={IIITD}
//                 alt="IIITD Logo"
//                 className="h-12 w-auto object-contain rounded-lg p-2"
//                 style={{
//                   background: "rgba(255,255,255,0.05)",
//                   border: "1px solid rgba(255,255,255,0.08)",
//                 }}
//               />
//             </div>
//           </div>

//           {/* Column 2: Contact Info */}
//           <div>
//             <h3
//               className="text-xs font-bold uppercase tracking-[0.18em] mb-5"
//               style={{ color: "rgba(255,255,255,0.35)" }}
//             >
//               Contact
//             </h3>

//             <ul className="space-y-4">

//               <li>
//                 <p
//                   className="text-sm font-semibold"
//                   style={{ color: "rgba(255,255,255,0.92)" }}
//                 >
//                   Prof. Ganesh Bagler
//                 </p>
//               </li>

//               {/* Email */}
//               <li className="flex gap-3 items-start pt-1">
//                 <Mail
//                   size={14}
//                   className="flex-shrink-0 mt-0.5"
//                   style={{ color: "rgba(255,255,255,0.8)" }}
//                 />

//                 <a
//                   href="mailto:bagler+multiev@iiitd.ac.in"
//                   className="text-sm transition-colors"
//                   style={{ color: "rgba(255,255,255,0.72)" }}
//                   onMouseEnter={(e) =>
//                     ((e.target as HTMLElement).style.color = "#ffffff")
//                   }
//                   onMouseLeave={(e) =>
//                     ((e.target as HTMLElement).style.color =
//                       "rgba(255,255,255,0.72)")
//                   }
//                 >
//                   bagler+multiev@iiitd.ac.in
//                 </a>
//               </li>

//               {/* Phone */}
//               <li className="flex gap-3 items-start">
//                 <Phone
//                   size={14}
//                   className="flex-shrink-0 mt-0.5"
//                   style={{ color: "rgba(255,255,255,0.8)" }}
//                 />

//                 <span
//                   className="text-sm"
//                   style={{ color: "rgba(255,255,255,0.72)" }}
//                 >
//                   +91-11-26907-443
//                 </span>
//               </li>

//               {/* Location */}
//               <li className="flex gap-3 items-start">
//                 <MapPin
//                   size={14}
//                   className="flex-shrink-0 mt-0.5"
//                   style={{ color: "rgba(255,255,255,0.8)" }}
//                 />

//                 <span
//                   className="text-sm"
//                   style={{ color: "rgba(255,255,255,0.72)" }}
//                 >
//                   IIIT-Delhi, India
//                 </span>
//               </li>

//               {/* CoSyLab Link */}
//               <li className="pt-1">
//                 <a
//                   href="https://cosylab.iiitd.edu.in/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
//                   style={{ color: "rgba(255,255,255,0.82)" }}
//                   onMouseEnter={(e) =>
//                     ((e.currentTarget as HTMLElement).style.color = "#ffffff")
//                   }
//                   onMouseLeave={(e) =>
//                     ((e.currentTarget as HTMLElement).style.color =
//                       "rgba(255,255,255,0.82)")
//                   }
//                 >
//                   <span>Visit CoSyLab</span>

//                   <ExternalLink
//                     size={12}
//                     style={{ color: "rgba(255,255,255,0.82)" }}
//                   />
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* DIVIDER */}
//         <div
//           style={{
//             borderTop: "1px solid rgba(255,255,255,0.07)",
//           }}
//           className="mb-7"
//         />

//         {/* BOTTOM SECTION */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-5">

//           {/* Social Icons */}
//           <div className="flex items-center gap-2">
//             {[
//               { Icon: Github, label: "GitHub" },
//               { Icon: Linkedin, label: "LinkedIn" },
//               { Icon: Twitter, label: "Twitter" },
//               { Icon: Facebook, label: "Facebook" },
//               { Icon: Instagram, label: "Instagram" },
//             ].map(({ Icon, label }) => (
//               <a
//                 key={label}
//                 href="#"
//                 aria-label={label}
//                 className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
//                 style={{
//                   background: "rgba(255,255,255,0.04)",
//                   border: "1px solid rgba(255,255,255,0.07)",
//                 }}
//                 onMouseEnter={(e) => {
//                   (e.currentTarget as HTMLElement).style.background =
//                     BLUE_TINT;

//                   (e.currentTarget as HTMLElement).style.borderColor =
//                     BLUE_BORDER;
//                 }}
//                 onMouseLeave={(e) => {
//                   (e.currentTarget as HTMLElement).style.background =
//                     "rgba(255,255,255,0.04)";

//                   (e.currentTarget as HTMLElement).style.borderColor =
//                     "rgba(255,255,255,0.07)";
//                 }}
//               >
//                 <Icon
//                   size={16}
//                   style={{ color: "rgba(255,255,255,0.55)" }}
//                 />
//               </a>
//             ))}
//           </div>

//           {/* Copyright */}
//           <div className="text-center md:text-right">
//             <p
//               className="text-sm mb-0.5"
//               style={{ color: "rgba(255,255,255,0.4)" }}
//             >
//               © 2026 MultiEV. All rights reserved.
//             </p>

//             <p
//               className="text-xs"
//               style={{ color: "rgba(255,255,255,0.25)" }}
//             >
//               Indraprastha Institute of Information Technology Delhi
//             </p>
//           </div>
//         </div>

//         {/* DISCLAIMER */}
//         <div
//           className="mt-7 pt-7"
//           style={{
//             borderTop: "1px solid rgba(255,255,255,0.05)",
//           }}
//         >
//           <p
//             className="text-xs text-center max-w-5xl mx-auto"
//             style={{
//               color: "rgba(255,255,255,0.22)",
//               lineHeight: "1.75",
//             }}
//           >
//             <span
//               style={{
//                 color: "rgba(255,255,255,0.4)",
//                 fontWeight: 600,
//               }}
//             >
//               Disclaimer:
//             </span>{" "}
//             All material on this website is a product of research and is
//             provided for your information only and may not be construed as
//             medical advice or instruction. No action or inaction should be
//             taken based solely on the contents of this information; instead,
//             readers should consult appropriate health professionals on any
//             matter relating to their health and well-being.
//           </p>
//         </div>

//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";
import IIITD from "../Layout/IIITDLogo.jpg";

const T = {
  ink: "#12211C",
  primary: "#2DD4BF",
  text: "#F1F4F9",
};

const Footer: React.FC = () => {
  return (
    <footer
      className="mt-20 font-body"
      style={{
        marginTop: "0rem",
        background: T.ink,
        borderTop: "1px solid rgba(45,212,191,0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* TOP SECTION */}
        <div className="grid md:grid-cols-3 gap-12 mb-10">

          {/* Column 1: Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="font-mono w-11 h-11 rounded-xl flex items-center justify-center text-[#0A140F] text-[11px] font-bold tracking-tight"
                style={{ background: T.primary }}
              >
                MEV
              </div>
              <div>
                <span className="font-display text-xl font-semibold block leading-none" style={{ color: T.text }}>
                  MultiEV
                </span>
                <span
                  className="font-mono text-[10px] font-medium uppercase tracking-[0.2em]"
                  style={{ color: T.primary }}
                >
                  Intelligence
                </span>
              </div>
            </div>

            <p
              className="text-sm leading-relaxed max-w-sm mb-8"
              style={{ color: "rgba(241,244,249,0.55)" }}
            >
              Multi-class classification of food-derived extracellular vesicle proteins
              from protein sequence alone — no docking, no structural data.
            </p>

            {/* IIITD Logo */}
            <div className="flex items-center gap-4">
              <img
                src={IIITD}
                alt="IIITD Logo"
                className="h-12 w-auto object-contain rounded-lg p-2"
                style={{
                  background: "rgba(241,244,249,0.06)",
                  border: "1px solid rgba(241,244,249,0.1)",
                }}
              />
            </div>
          </div>

          {/* Column 2: Contact Info */}
          <div>
            <h3
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] mb-5"
              style={{ color: "rgba(241,244,249,0.4)" }}
            >
              Contact
            </h3>

            <ul className="space-y-4">
              <li>
                <p className="font-display text-sm font-semibold" style={{ color: T.text }}>
                  Prof. Ganesh Bagler
                </p>
              </li>

              {/* Email */}
              <li className="flex gap-3 items-start pt-1">
                <Mail size={14} className="flex-shrink-0 mt-0.5" style={{ color: T.primary }} />
                <a
                  href="mailto:bagler+multiev@iiitd.ac.in"
                  className="text-sm transition-colors"
                  style={{ color: "rgba(241,244,249,0.65)" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = T.text)}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(241,244,249,0.65)")}
                >
                  bagler+multiev@iiitd.ac.in
                </a>
              </li>

              {/* Phone */}
              <li className="flex gap-3 items-start">
                <Phone size={14} className="flex-shrink-0 mt-0.5" style={{ color: T.primary }} />
                <span className="text-sm" style={{ color: "rgba(241,244,249,0.65)" }}>
                  +91-11-26907-443
                </span>
              </li>

              {/* Location */}
              <li className="flex gap-3 items-start">
                <MapPin size={14} className="flex-shrink-0 mt-0.5" style={{ color: T.primary }} />
                <span className="text-sm" style={{ color: "rgba(241,244,249,0.65)" }}>
                  IIIT-Delhi, India
                </span>
              </li>

              {/* CoSyLab Link */}
              <li className="pt-1">
                <a
                  href="https://cosylab.iiitd.edu.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                  style={{ color: T.primary }}
                >
                  <span>Visit CoSyLab</span>
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div style={{ borderTop: "1px solid rgba(241,244,249,0.08)" }} className="mb-7" />

        {/* BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {[
              { Icon: Github, label: "GitHub" },
              { Icon: Linkedin, label: "LinkedIn" },
              { Icon: Twitter, label: "Twitter" },
              { Icon: Facebook, label: "Facebook" },
              { Icon: Instagram, label: "Instagram" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                style={{
                  background: "rgba(241,244,249,0.04)",
                  border: "1px solid rgba(241,244,249,0.08)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(45,212,191,0.12)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(45,212,191,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(241,244,249,0.04)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(241,244,249,0.08)";
                }}
              >
                <Icon size={16} style={{ color: "rgba(241,244,249,0.5)" }} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm mb-0.5" style={{ color: "rgba(241,244,249,0.4)" }}>
              © 2026 MultiEV. All rights reserved.
            </p>
            <p className="text-xs" style={{ color: "rgba(241,244,249,0.25)" }}>
              Indraprastha Institute of Information Technology Delhi
            </p>
          </div>
        </div>

        {/* DISCLAIMER */}
        <div className="mt-7 pt-7" style={{ borderTop: "1px solid rgba(241,244,249,0.06)" }}>
          <p
            className="text-xs text-center max-w-5xl mx-auto"
            style={{ color: "rgba(241,244,249,0.22)", lineHeight: "1.75" }}
          >
            <span style={{ color: "rgba(241,244,249,0.4)", fontWeight: 600 }}>Disclaimer:</span>{" "}
            All material on this website is a product of research and is provided for your
            information only and may not be construed as medical advice or instruction. No
            action or inaction should be taken based solely on the contents of this
            information; instead, readers should consult appropriate health professionals on
            any matter relating to their health and well-being.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;