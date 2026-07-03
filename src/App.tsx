import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

import Home from "./pages/Home";
import Predict from "./pages/Predict";
//optional for future use
// import Search from "./pages/Search";
import HowToUse from "./pages/HowToUse";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/foodevpred">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Predict />} />
        {/* <Route path="/search" element={<Search />} /> */}
        <Route path="/how-to-use" element={<HowToUse />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/contact" element={<Contact />} />

        {/* Optional: catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;