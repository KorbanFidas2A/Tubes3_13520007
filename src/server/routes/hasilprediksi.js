const router = require("express").Router();
let HasilPrediksi = require("../models/hasilprediksi.model");
let Penyakit = require("../models/penyakit.model");
let algo = require("./algo");

router.route("/").get((req, res) => {
  HasilPrediksi.find()
    .then((hasilprediksi) => res.json(hasilprediksi))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/riwayat").get((req, res) => {
  const q = req.query.q;
  const [tanggal, penyakit] = algo.queryExtract(q);
  HasilPrediksi.find({
    penyakitPrediksi: { $regex: penyakit, $options: "i" },
    tanggalPrediksi: { $regex: tanggal, $options: "i" },
  })
    .then((hasilPencarian) => res.json(hasilPencarian))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  //get request from frontend
  const namaPasien = req.body.namaPasien;
  const penyakitPrediksi = req.body.penyakitPrediksi;
  const dnaPasien = req.body.dnaPasien;
  var date = new Date(Date.now());
  var tanggalBerformat = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

  //input validation checker
  if (
    namaPasien == "" ||
    dnaPasien == null ||
    dnaPasien == "" ||
    penyakitPrediksi == "Pilih Penyakit/Kelainan"
  ) {
    res.status(400).json("*Tidak boleh ada yang kosong.");
  } else {
    //get rantai DNA penyakitPrediksi from database
    const filter = { namaPenyakit: penyakitPrediksi };
    var rantai = "";

    Penyakit.find(filter).then((doc) => {
      rantai = doc[0].rantaiDNA;
      //check if DNA is consisted of A,C,G,T
      var status = algo.DNAValidation(dnaPasien);
      if (!status) {
        res.status(400).json("*File tidak valid.");
      } else {
        //result
        var similarityLevel;
        var result;

        var checking_result = algo.kmpMatch(dnaPasien, rantai);
        if (checking_result != -1) {
          result = true;
          similarityLevel = 100;
        } else {
          result = false;
          similarityLevel = algo.similarityTest(dnaPasien, rantai);
          if (similarityLevel >= 80) {
            result = true;
          }
        }
        const tanggalPrediksi = tanggalBerformat
        const statusTerprediksi = Boolean(result);
        const tingkatKemiripan = similarityLevel;

        const newHasilPrediksi = new HasilPrediksi({
          tanggalPrediksi,
          namaPasien,
          penyakitPrediksi,
          tingkatKemiripan,
          statusTerprediksi,
        });

        newHasilPrediksi
          .save()
          .then(() => res.json("Hasil Prediksi added!"))
          .catch((err) => res.status(400).json("Error: " + err));
      }
    });
  }
});

router.route("/delete/:id").delete((req, res) => {
  HasilPrediksi.findByIdAndDelete(req.params.id)
    .then(() => res.json("Hasil Prediksi deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
