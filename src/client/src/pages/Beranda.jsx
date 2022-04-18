import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components";
import { images } from "../constants";

const Beranda = () => {
  return (
    <div className="flex flex-col justify-between px-[1.75rem] pt-[4.5rem] pb-[3rem] lg:flex-row lg:px-[9.75rem] lg:pt-[12.5rem] lg:pb-[7.75rem]">
      <div className="order-2 lg:order-1 lg:basis-5/12">
        <h1 className="mb-[2.25rem] text-[3rem] font-extrabold lg:mb-[5.25rem] lg:text-[4.5rem]">
          Kenali Genetikmu dengan CocokGen
        </h1>
        <Button>
          <Link to="/Prediksi">Periksa Sekarang</Link>
        </Button>
      </div>
      <div className="order-1 mb-[2.25rem] lg:order-2 lg:mb-0 lg:basis-7/12">
        <img src={images.DNA_Monochromatic} alt="DNA" className="w-full" />
      </div>
    </div>
  );
};

export default Beranda;
