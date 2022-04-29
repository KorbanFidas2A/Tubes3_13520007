import React, { useState, useEffect } from "react";
import { Button } from "../components";
import axios from "axios";

const Riwayat = () => {
  // debugging purposes
  // const url = "http://localhost:5000/";

  const url = "https://tubes-cocokgen.herokuapp.com/";

  const tableHeader = [
    "Nama",
    "Tanggal Tes",
    "Penyakit/Kelainan",
    "Tingkat Kemiripan",
    "Hasil",
  ];
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(url + "hasilprediksi")
      .then((res) => {
        setRiwayat(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  /* MENCARI DATA BERDASARKAN QUERY */
  const handleSubmit = (e) => {
    setQuery(query.replace(/\s/g, "%20"));
    e.preventDefault();
    setLoading(true);
    axios
      .get(url + "hasilprediksi/riwayat?q=" + query)
      .then((res) => {
        setRiwayat(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  /* MENGHAPUS RIWAYAT */
  const deleteRiwayat = (id) => {
    axios.delete(url + "hasilprediksi/delete/" + id);
    setRiwayat(riwayat.filter((el) => el._id !== id));
  };

  return (
    <div
      className={
        `px-[1.75rem] pt-[4.5rem] lg:px-[9.75rem] lg:pt-[10rem] lg:pb-[8.5rem] ` +
        (riwayat.length <= 2 ? `pb-[5rem]` : `pb-[3rem]`)
      }
    >
      {/* HEADER AND SEARCH BAR */}
      <div className="mb-[1.5rem] flex flex-col lg:mb-[5rem] lg:flex-row lg:gap-[1.5rem]">
        <h1 className="mb-[1.5rem] basis-4/12 text-[1.5rem] font-extrabold lg:mb-0 lg:text-[2.25rem]">
          Cari Riwayat Tes
        </h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex basis-8/12 flex-nowrap justify-between gap-[0.5rem] lg:gap-[1.5rem]">
            <input
              type="text"
              name="search"
              placeholder="Cari Riwayat Tes"
              className="w-full rounded-[0.5rem] bg-lightgrey px-[1rem] py-[0.75rem] text-[0.667rem] text-darkgrey lg:px-[1.75rem] lg:py-[1rem] lg:text-[1rem]"
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              className={`py-[0.45rem] px-[2rem] text-[0.85rem] lg:py-[0.75rem] lg:px-[3.75rem]`}
              type="submit"
            >
              Cari
            </Button>
          </div>
        </form>
      </div>

      {/* TABLE */}
      <div className="flex flex-col">
        {/* TABLE HEADER */}
        <div className="flex flex-row gap-[0.5rem] rounded-t-[0.5rem] bg-lightorange px-[0.667rem] py-[0.667rem] lg:gap-[1rem] lg:py-[1.125rem] lg:px-[2.25rem]">
          {tableHeader.map((item, index) => (
            <p
              key={index}
              className={
                `flex items-center justify-start text-[0.667rem] font-medium lg:text-[1.5rem] ` +
                (index === 0 || index === 2
                  ? ` basis-2/12 break-all lg:basis-3/12 `
                  : ` basis-2/12 break-words `)
              }
            >
              {item}
            </p>
          ))}
          <p className="invisible text-[0.667rem] lg:text-[1.25rem]">Hapus</p>
        </div>
        {/* TABLE DATA */}
        <div className="flex flex-col divide-y-[1px] lg:divide-y-2">
          {loading && (
            <div className="flex justify-center py-[0.25rem] lg:py-[1.25rem]">
              <p className="text-[0.667rem] lg:text-[1.25rem]">Memuat...</p>
            </div>
          )}
          {!loading &&
            (riwayat.length === 0 ? (
              <div className="flex justify-center py-[0.25rem] lg:py-[1.25rem]">
                <p className="text-[0.667rem] lg:text-[1.25rem]">
                  Riwayat Tidak Ditemukan
                </p>
              </div>
            ) : (
              riwayat.map((item, index) => (
                <div
                  key={item._id}
                  className="flex flex-1 flex-row gap-[0.5rem] px-[0.667rem] py-[0.25rem] lg:gap-[1rem] lg:px-[2.25rem] lg:py-[1.25rem]"
                >
                  <p className="basis-2/12 break-all text-[0.667rem] lg:basis-3/12 lg:text-[1.25rem]">
                    {item.namaPasien}
                  </p>
                  <p className="basis-2/12 break-all text-[0.667rem] lg:text-[1.25rem]">
                    {item.tanggalPrediksi}
                  </p>
                  <p className="basis-2/12 text-[0.667rem] lg:basis-3/12 lg:text-[1.25rem]">
                    {item.penyakitPrediksi}
                  </p>
                  <p className="basis-2/12 text-[0.667rem] lg:text-[1.25rem]">
                    {item.tingkatKemiripan.toFixed(2)}%
                  </p>
                  <p className="basis-2/12 text-[0.667rem] lg:text-[1.25rem]">
                    {item.statusTerprediksi ? "POSITIF" : "NEGATIF"}
                  </p>
                  <a
                    className="text-[0.667rem] underline hover:cursor-pointer lg:text-[1.25rem]"
                    onClick={() => deleteRiwayat(item._id)}
                  >
                    Hapus
                  </a>
                </div>
              ))
            ))}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Riwayat;
