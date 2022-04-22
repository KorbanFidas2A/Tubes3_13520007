import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col bg-turquoise px-[1.75rem] pt-[1.5rem] pb-[3rem] text-left text-white lg:flex-row lg:px-[9.75rem] lg:pt-[3.5rem] lg:pb-[4rem]">
      {/* LOGO */}
      <div className="md:basis-1/3 lg:basis-7/12">
        <h1 className="flex items-start pb-[1.125rem] text-[2.25rem] font-extrabold lg:pb-[2.25rem]">
          <Link to="/">CocokGen</Link>
        </h1>
        <p className="pb-[1.125rem] text-[1.125rem] font-semibold lg:pb-[2.25rem] lg:text-[1.5rem]">
          Regexerigo
        </p>
        <p className="pb-[1.125rem] text-[0.875rem] lg:pb-[2.25rem] lg:text-[1.125rem]">
          Tugas Besar III IF2211 Strategi Algoritma <br />
          Semester II Tahun 2021/2022
        </p>
      </div>

      {/* PRODUCTS */}
      <div className="md:basis-1/3 lg:basis-2/12">
        <h2 className="pb-[1.125rem] text-[1.125rem] font-semibold lg:pb-[2.25rem] lg:text-[2rem]">
          Produk
        </h2>
        <p className="pb-[1.125rem] text-[1rem] lg:pb-[2.25rem] lg:text-[1.5rem] hover:underline">
          <Link to="/Prediksi">Prediksi</Link>
        </p>
        <p className="pb-[1.125rem] text-[1rem] lg:pb-[2.25rem] lg:text-[1.5rem] hover:underline">
          <Link to="/Riwayat">Riwayat</Link>
        </p>
        <p className="pb-[1.125rem] text-[1rem] lg:pb-[2.25rem] lg:text-[1.5rem] hover:underline">
          <Link to="/Penyakit">Penyakit</Link>
        </p>
      </div>

      {/* TENTANG */}
      <div className="md:basis-1/3 lg:basis-3/12">
        <h2 className="pb-[1.125rem] text-[1.125rem] font-semibold lg:pb-[2.25rem] lg:text-[2rem]">
          Tentang Kami
        </h2>
        <p className="pb-[1.125rem] text-[1rem] lg:pb-[2.25rem] lg:text-[1.5rem] hover:underline">
          <Link to="/Tentang">Tentang</Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
