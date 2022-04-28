const router = require("express").Router();
let Penyakit = require("../models/penyakit.model");
let algo = require("./algo");

router.route("/").get((req, res) => {
  Penyakit.find()
    .then((penyakit) => res.json(penyakit))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const namaPenyakit = req.body.namaPenyakit;
  const rantaiDNA = req.body.rantaiDNA;

  //input validation checker
  if (namaPenyakit == "" || rantaiDNA == null || rantaiDNA == "") {
    res.status(400).json("*Tidak boleh ada yang kosong.");
  } else {
    //check if DNA is consisted of A,C,G,T
    var status = algo.DNAValidation(rantaiDNA);

    if (status) {
      const newPenyakit = new Penyakit({
        namaPenyakit,
        rantaiDNA,
      });

      newPenyakit
        .save()
        .then(() => res.json("Penyakit added!"))
        .catch((err) => res.status(400).json("*Penyakit sudah terdaftar."));
    } else {
        res.status(400).json("*File tidak valid.");
    }
  }
});

router.route("/delete/:namaPenyakit").delete((req, res) => {
  const namaPenyakit = req.params.namaPenyakit;

  Penyakit.findOneAndDelete(namaPenyakit)
    .then(() => res.json("Penyakit deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
