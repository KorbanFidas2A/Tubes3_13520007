import React, {useState, useEffect} from "react";
import { Button } from "../components";
import axios from "axios";

const Riwayat = () => {
  // const url = "https://tubes-cocokgen.herokuapp.com/";
  const url = "http://localhost:5000/";
  const tableHeader = ["Nama", "Tanggal Tes", "Penyakit/Kelainan", "Hasil"];
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios(url + "hasilprediksi");
      setRiwayat(result.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const getFormattedDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  }

  const deleteRiwayat = (idx) => {
    // axios.delete(url + "hasilprediksi/" + idx);
    // setPenyakit(penyakit.filter(penyakit => penyakit.id !== idx));
  }

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
        <div className="flex basis-8/12 flex-nowrap justify-between gap-[0.5rem] lg:gap-[1.5rem]">
          <input
            type="text"
            name="search"
            placeholder="Cari Riwayat Tes"
            className="w-full rounded-[0.5rem] bg-lightgrey px-[1rem] py-[0.75rem] text-[0.667rem] text-darkgrey lg:px-[1.75rem] lg:py-[1rem] lg:text-[1rem]"
          />
          <Button
            className={`py-[0.45rem] px-[2rem] text-[0.85rem] lg:py-[0.75rem] lg:px-[3.75rem]`}
            onClick={() => {
              e.preventDefault();
            }}
          >
            Cari
          </Button>
        </div>
      </div>

      {/* TABLE */}
      <div className="flex flex-col">
        {/* TABLE HEADER */}
        <div className="flex flex-row gap-[1rem] rounded-t-[0.5rem] bg-lightorange px-[0.667rem] py-[0.667rem] lg:py-[1.125rem] lg:px-[2.25rem]">
          {tableHeader.map((item, index) => (
            <p
              key={index}
              className="flex-1 basis-1/4 text-[0.667rem] font-medium lg:text-[1.5rem]"
            >
              {item}
            </p>
          ))}
        </div>
        {/* TABLE DATA */}
        <div className="flex flex-col divide-y-[1px] lg:divide-y-2">
          {loading && (
            <div className="flex justify-center py-[0.25rem] lg:py-[1.25rem]">
              <p className="text-[0.667rem] lg:text-[1.25rem]">Memuat...</p>
            </div>
          )}
          {!loading && (
          riwayat.length === 0 ? (
            <div className="flex justify-center py-[0.25rem] lg:py-[1.25rem]">
              <p className="text-[0.667rem] lg:text-[1.25rem]">
                Riwayat Tidak Ditemukan
              </p>
            </div>
          ) : (
            riwayat.map((item, index) => (
              <div
                key={index}
                className="flex flex-row gap-[1rem] px-[0.667rem] py-[0.25rem] lg:px-[2.25rem] lg:py-[1.25rem]"
              >
                <p className="basis-1/4 text-[0.667rem] lg:text-[1.25rem]">
                  {item.namaPasien}
                </p>
                <p className="basis-1/4 text-[0.667rem] lg:text-[1.25rem]">
                  {getFormattedDate(item.tanggalPrediksi)}
                </p>
                <p className="basis-1/4 text-[0.667rem] lg:text-[1.25rem]">
                  {item.penyakitPrediksi}
                </p>
                <p className="basis-1/4 text-[0.667rem] lg:text-[1.25rem]">
                  {item.hasilPrediksi ? "POSITIF" : "NEGATIF"}
                </p>
                <a
                  href="#"
                  className="text-[0.667rem] underline hover:cursor-pointer lg:text-[1.25rem]"
                  onClick={() => deleteRiwayat(index)}
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
