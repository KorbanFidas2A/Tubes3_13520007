import React, { useRef, useState, useEffect } from "react";
import { Button } from "../components";
import axios from "axios";

const Penyakit = () => {
  // const url = "https://tubes-cocokgen.herokuapp.com/";
  const url = "http://localhost:5000/";

  const [penyakit, setPenyakit] = useState([]);
  const [name, setName] = useState("");
  const [DNA, setDNA] = useState(null);
  const [filename, setFilename] = useState("Tidak ada berkas yang dipilih");
  const fileInputRef = useRef(null);
  const [isFileValid, setIsFileValid] = useState(false);
  const [isAllFilled, setIsAllFilled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios(url + "penyakit");
        setPenyakit(result.data);
        setLoading(false);
      } catch (error) {
        // setError(error);
      }
    };
    fetchData();
  }, []);

  const deletePenyakit = (namaPenyakit) => {
    axios.delete(url + "penyakit/delete/" + namaPenyakit);
    setPenyakit(penyakit.filter((el) => el.namaPenyakit !== namaPenyakit));
  };

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
    setError("");
    const data = {
      namaPenyakit: name,
      rantaiDNA: DNA,
    };

    axios
      .post(url + "penyakit/add", data)
      .then((res) => {
        setPenyakit([...penyakit, data]);
        setName("");
        setDNA(null);
        setFilename("Tidak ada berkas yang dipilih");
        setIsFileValid(false);
        fileInputRef.current.value = null;
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data);
      });
  };

  return (
    <div className="px-[1.75rem] pt-[4.5rem] pb-[3rem] lg:px-[9.75rem] lg:pt-[10rem] lg:pb-[8.5rem]">
      <h1 className="mb-[1.5rem] text-[1.5rem] font-extrabold lg:mb-[3rem] lg:text-[2.25rem]">
        Tambahkan Jenis Penyakit/Kelainan
      </h1>
      <form className="mb-[3rem] lg:mb-[4.5rem]" onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row lg:gap-[7.5rem]">
          {/* NAMA PENYAKIT */}
          <div className="mb-[1.5rem] basis-5/12 lg:mb-[3rem]">
            <p className="mb-[1rem] text-[1rem] font-medium lg:mb-[1.5rem] lg:text-[1.5rem]">
              Nama Penyakit/Kelainan
            </p>
            <input
              type="text"
              name="namapenyakit"
              value={name}
              placeholder="Masukkan Nama Penyakit/Kelainan"
              className="w-full rounded-[0.5rem] bg-lightgrey px-[1rem] py-[0.688rem] text-[0.688rem] text-darkgrey lg:px-[1.5rem] lg:py-[1rem] lg:text-[1rem]"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* FILE DNA */}
          <div className="mb-[1.5rem] basis-5/12 lg:mb-[3rem]">
            <p className="mb-[1rem] text-[1rem] font-medium lg:mb-[1.5rem] lg:text-[1.5rem]">
              Berkas DNA
            </p>
            <div className="mb-[0.75rem] text-[0.668rem] font-medium text-darkgrey lg:mb-[1.125rem] lg:text-[1rem]">
              <p>*Berkas yang diunggah harus berekstensi .txt</p>
              <p>*Berkas hanya berisi huruf A, C, G, dan/atau T</p>
              <p>*Tidak boleh ada enter, spasi, dan huruf kecil</p>
            </div>
            <p className="text-[0.667rem] font-medium lg:text-[1rem]">
              <Button
                className={`!mr-[1rem] !bg-turquoise !py-[0.6rem] !px-[0.8rem] !text-[0.667rem] !font-medium hover:!bg-orange lg:!mr-[1.5rem] lg:!p-[1rem] lg:!text-[1rem]`}
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
        </div>

        <Button
          className={`mb-[1rem] px-[2.25rem] lg:px-[3.625rem]`}
          type="submit"
        >
          Tambahkan
        </Button>
        {error && (
          <p className="text-[0.667rem] font-medium text-red lg:text-[1rem]">
            {error}
          </p>
        )}
      </form>

      {/* TABLE */}
      <div className="flex flex-col">
        {/* TABLE HEADER */}
        <div className="flex rounded-t-[0.5rem] bg-lightorange px-[0.667rem] py-[0.667rem] lg:py-[1.125rem] lg:px-[2.25rem]">
          <p className="flex-1 text-[0.667rem] font-medium lg:text-[1.5rem]">
            Nama Penyakit/Kelainan yang Sudah Terdaftar
          </p>
        </div>
        {/* TABLE DATA */}
        <div className="flex flex-col divide-y-[1px] lg:divide-y-2">
          {loading && (
            <div className="flex justify-center py-[0.25rem] lg:py-[1.25rem]">
              <p className="text-[0.667rem] lg:text-[1.25rem]">Memuat...</p>
            </div>
          )}
          {!loading &&
            (penyakit.length === 0 ? (
              <div className="flex justify-center py-[0.25rem] lg:py-[1.25rem]">
                <p className="text-[0.667rem] lg:text-[1.25rem]">
                  Belum Ada Penyakit/Kelainan yang Terdaftar
                </p>
              </div>
            ) : (
              penyakit.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between px-[0.667rem] py-[0.25rem] lg:px-[2.25rem] lg:py-[1.25rem]"
                >
                  <p className="text-[0.667rem] lg:text-[1.25rem]">
                    {item.namaPenyakit}
                  </p>
                  <a
                    className="text-[0.667rem] underline hover:cursor-pointer lg:text-[1.25rem]"
                    onClick={() => deletePenyakit(item.namaPenyakit)}
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

export default Penyakit;
