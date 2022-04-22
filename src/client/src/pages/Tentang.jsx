import React from "react";
import { images } from "../constants";
import { ProfileCard } from "../components";

const Tentang = () => {
  return (
    <div className="relative flex flex-col px-[1.75rem] pt-[4.5rem] pb-[3rem] lg:px-[9.75rem] lg:pt-[10rem] lg:pb-[8.5rem]">
      {/* Tentang DNA Sequence Analysis */}
      <h1 className="mb-[1.5rem] text-[1.5rem] font-extrabold lg:mb-[3rem] lg:text-[2.25rem]">
        Tentang <i>DNA Sequence Analysis</i>
      </h1>
      <div className="mb-[2.25rem] flex flex-col lg:mb-[3rem] lg:flex-row">
        <div className="order-2 lg:order-1 lg:basis-7/12">
          <p className="text-justify text-[1rem] lg:text-[1.5rem]">
            <i>DNA sequence analysis</i> adalah sebuah cara yang dapat digunakan
            untuk memprediksi berbagai macam penyakit yang tersimpan pada basis
            data berdasarkan urutan sekuens DNA-nya. Sebuah sekuens DNA adalah
            suatu representasi <i>string of nucleotides</i> yang disimpan pada
            suatu rantai DNA, sebagai contoh: ATTCGTAACTAGTAAGTTA.
          </p>
        </div>
        <div className="order-1 mb-[2.25rem] flex justify-center lg:order-2 lg:mb-0 lg:basis-5/12">
          <img
            src={images.DNA_Monochromatic}
            alt="DNA"
            className="w-full lg:w-[18rem]"
          />
        </div>
      </div>

      {/* Tentang CocokGen */}
      <h1 className="mb-[1.5rem] text-[1.5rem] font-extrabold lg:mb-[3rem] lg:text-[2.25rem]">
        Tentang CocokGen
      </h1>
      <div className="mb-[2.25rem] flex flex-col lg:mb-[3rem] lg:flex-row">
        <div className="order-2 lg:order-1 lg:basis-7/12">
          <p className="text-justify text-[1rem] lg:text-[1.5rem]">
            CocokGen adalah aplikasi web untuk melakukan DNA Sequence Matching
            yang menggunakan algoritma String Matching dan Regular Expression
            untuk membantu penyedia jasa kesehatan dalam memprediksi penyakit
            pasien. CocokGen adalah hasil karya Regexerigo, kelompok 9 Tugas
            Besar III IF2211 Strategi Algoritma Semester II Tahun Ajaran
            2021/2022. Regexerigo berdiri sejak tugas besar ini rilis pada
            tanggal 11 April 2022. Kelompok yang beranggotakan tiga mahasiswa/i
            Teknik Informatika Institut Teknologi Bandung angkatan 2020 ini
            berharap untuk mendapatkan nilai setinggi mungkin dalam mata kuliah
            ini :).
          </p>
        </div>
        <div className="order-1 mb-[2.25rem] flex justify-center lg:order-2 lg:mb-0 lg:basis-5/12">
          <img src={images.logo} alt="logo" className="w-full lg:w-[18rem]" />
        </div>
      </div>

      {/* Tim Kami */}
      <h1 className="mb-[1.5rem] text-center text-[1.5rem] font-extrabold lg:mb-[3rem] lg:text-[2.25rem]">
        Tim Kami
      </h1>
      <div className="mb-[2.25rem] flex flex-col gap-[1.5rem] self-center lg:mb-[3rem] lg:flex-row lg:gap-[2.8rem]">
        <ProfileCard
          image={images.Nadia}
          nim="13520007"
          nama="Nadia Putri Mareta Leiden"
        />
        <ProfileCard
          image={images.Helmi}
          nim="13520014"
          nama="Muhammad Helmi Hibatullah"
        />
        <ProfileCard
          image={images.Taufan}
          nim="13520031"
          nama="Taufan Fajarama Putrawansyah Ruslanali"
        />
      </div>

      <img src={images.TwoCircle} className="absolute right-0 bottom-0 -z-10" />
    </div>
  );
};

export default Tentang;
