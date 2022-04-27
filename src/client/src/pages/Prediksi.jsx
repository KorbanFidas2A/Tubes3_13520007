import React, { useRef, useState, useEffect } from "react";
import { Button } from "../components";
import { images } from "../constants";
import axios from "axios";

const Prediksi = () => {
  // const url = "https://tubes-cocokgen.herokuapp.com/";
  const url = "http://localhost:5000/";

  const [namaHasil, setNamaHasil] = useState("---");
  const [namaForm, setNamaForm] = useState("");
  const [tanggal, setTanggal] = useState("---");
  const [hasil, setHasil] = useState("---");
  const [hasilPrediksi, setHasilPrediksi] = useState(false);
  const [listPenyakit, setListPenyakit] = useState(["Pilih Penyakit/Kelainan"]);
  const [penyakitForm, setPenyakitForm] = useState(listPenyakit[0]);
  const [penyakitHasil, setPenyakitHasil] = useState("---");
  const [DNA, setDNA] = useState(null);
  const [filename, setFilename] = useState("Tidak ada berkas yang dipilih");
  const fileInputRef = useRef(null);
  const [isFileValid, setIsFileValid] = useState(false);
  const [isAllFilled, setIsAllFilled] = useState(true);
  const [error, setError] = useState([]);
  
  useEffect(() => {
    axios.get(url + "penyakit")
    .then(res => {
      const data = res.data;
      setListPenyakit(listPenyakit.concat(data.map(item => item.namaPenyakit)));
    })
  }, []);


  const handleUploadFileButton = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    setFilename(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setDNA(e.target.result);
    };
    reader.readAsText(file);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      namaPasien: namaForm,
      dnaPasien: DNA,
      penyakitPrediksi: penyakitForm,
    };
    console.log(data);
    axios.post(url + "hasilprediksi/add", data)
    .then(res => {
      axios.get(url + "hasilprediksi/")
      .then(res => {
        const data = res.data;
        setNamaHasil(data[data.length - 1].namaPasien);
        setTanggal(data[data.length - 1].tanggalPrediksi);
        setPenyakitHasil(data[data.length - 1].penyakitPrediksi);
        setHasilPrediksi(data[data.length - 1].statusTerprediksi);
        if (hasilPrediksi) {
          setHasil("POSITIF");
        } else {
          setHasil("NEGATIF");
        }
      })
    })

    setNamaForm("");
    setPenyakitForm(listPenyakit[0]);
    setDNA(null);
    setFilename("Tidak ada berkas yang dipilih");
  };

  const getFormattedDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  }

  return (
    <div className="relative flex flex-col px-[1.75rem] pt-[4.5rem] pb-[3rem] lg:flex-row lg:px-[9.75rem] lg:pt-[10rem] lg:pb-[8.5rem]">
      <div className="mb-[3rem] basis-5/12 lg:mr-[7.5rem] lg:mb-[8.5rem]">
        {/* FORM */}
        <h1 className="mb-[1.5rem] text-[1.5rem] font-extrabold lg:mb-[3rem] lg:text-[2.25rem]">
          Tes DNA-mu!
        </h1>
        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="mb-[1.5rem] lg:mb-[3rem]">
            <p className="mb-[1rem] text-[1rem] font-medium lg:mb-[1.5rem] lg:text-[1.5rem]">
              Nama
            </p>
            <input
              type="text"
              name="nama"
              placeholder="Masukkan Nama"
              className="w-full rounded-[0.5rem] bg-lightgrey px-[1rem] py-[0.688rem] text-[0.688rem] text-darkgrey lg:px-[1.5rem] lg:py-[1rem] lg:text-[1rem]"
              value={namaForm}
              onChange={(e) => setNamaForm(e.target.value)}
            />
          </div>

          {/* FILE DNA */}
          <div className="mb-[1.5rem] lg:mb-[3rem]">
            <p className="mb-[1rem] text-[1rem] font-medium lg:mb-[1.5rem] lg:text-[1.5rem]">
              Berkas DNA
            </p>
            <div
              className="mb-[0.75rem] text-[0.668rem] font-medium lg:mb-[1.125rem] lg:text-[1rem] text-darkgrey"
            >
              <p>*Berkas yang diunggah harus berekstensi .txt</p>
              <p>*Berkas hanya berisi huruf A, C, G, dan/atau T</p>
              <p>*Tidak boleh ada enter, spasi, dan huruf kecil</p>
            </div>
            <p className="text-[0.667rem] font-medium lg:text-[1rem]">
              <Button
                className={`!mr-[1rem] !bg-turquoise !p-[0.6rem] !text-[0.667rem] !font-medium hover:!bg-orange lg:!mr-[1.5rem] lg:!p-[1rem] lg:!text-[1rem]`}
                onClick={handleUploadFileButton}
              >
                Unggah Berkas
              </Button>
              {filename}
            </p>
            <input
              type="file"
              className="hidden"
              multiple={false}
              accept=".txt,.text,text/plain"
              onChange={handleFileUpload}
              ref={fileInputRef}
            />
          </div>

          {/* PENYAKIT/KELAINAN */}
          <div className="mb-[1.5rem] lg:mb-[3rem]">
            <p className="mb-[1rem] text-[1rem] font-medium lg:mb-[1.5rem] lg:text-[1.5rem]">
              Penyakit/Kelainan
            </p>
            <select
              name="penyakit"
              className="w-full rounded-[0.5rem] bg-lightgrey px-[1rem] py-[0.688rem] text-[0.688rem] text-darkgrey lg:px-[1.5rem] lg:py-[1rem] lg:text-[1rem]"
              onChange={(e) => setPenyakitForm(e.target.value)}
            >
              {listPenyakit.map((item, index) => (
                <option
                  key={index}
                  value={item}
                  className={index === 0 ? "disabled hidden" : ""}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          <Button className={`mb-[1rem]  px-[2.25rem] lg:px-[3.625rem]`} type="Submit">
            Lihat Hasil
          </Button>
          {error && error.length > 0 && (
          <div className="text-[0.667rem] font-medium text-red lg:text-[1rem]">
            {error.map((err) => (
              <p key={err}>"*"+{err}</p>
            ))}
          </div>
        )}
        </form>
      </div>

      {/* HASIL */}
      <div className="mb-[3rem] basis-6/12">
        <h1 className="mb-[1.5rem] text-[1.5rem] font-extrabold lg:mb-[3rem] lg:text-[2.25rem]">
          Hasil Tes
        </h1>
        <div className="flex flex-col gap-[1.5rem] lg:gap-[2.25rem]">
          <div className="flex flex-1 flex-row">
            <p className="basis-1/2 text-[1rem] font-semibold lg:text-[1.5rem]">
              Nama
            </p>
            <p className="basis-1/2 text-[1rem] text-darkgrey lg:text-[1.5rem]">
              <i>{namaHasil}</i>
            </p>
          </div>
          <div className="flex flex-1 flex-row">
            <p className="basis-1/2 text-[1rem] font-semibold lg:text-[1.5rem]">
              Tanggal Tes
            </p>
            <p className="basis-1/2 text-[1rem] text-darkgrey lg:text-[1.5rem]">
              <i>
                {getFormattedDate(tanggal)}
              </i>
            </p>
          </div>
          <div className="flex flex-1 flex-row">
            <p className="basis-1/2 text-[1rem] font-semibold lg:text-[1.5rem]">
              Penyakit/Kelainan
            </p>
            <p className="basis-1/2 text-[1rem] text-darkgrey lg:text-[1.5rem]">
              <i>{penyakitHasil}</i>
            </p>
          </div>
          <div className="flex flex-1 flex-row">
            <p className="basis-1/2 text-[1rem] font-semibold lg:text-[1.5rem]">
              Hasil
            </p>
            <p className="basis-1/2 text-[1rem] text-darkgrey lg:text-[1.5rem]">
              <i>
                {hasil}
              </i>
            </p>
          </div>
        </div>
      </div>

      <img
        src={images.TwoCircle}
        alt=""
        className="absolute right-0 bottom-0 -z-10"
      />
    </div>
  );
};

export default Prediksi;
