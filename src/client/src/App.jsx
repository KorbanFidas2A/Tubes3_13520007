import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { Beranda, Penyakit, Prediksi, Riwayat, Tentang } from "./pages";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/Penyakit" element={<Penyakit />} />
          <Route path="/Prediksi" element={<Prediksi />} />
          <Route path="/Riwayat" element={<Riwayat />} />
          <Route path="/Tentang" element={<Tentang />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
