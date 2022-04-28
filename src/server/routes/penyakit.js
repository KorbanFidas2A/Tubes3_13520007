const router = require("express").Router();
let Penyakit = require("../models/penyakit.model");

router.route("/").get((req, res) => {
  Penyakit.find()
    .then((penyakit) => res.json(penyakit))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const namaPenyakit = req.body.namaPenyakit;
  const rantaiDNA = req.body.rantaiDNA;
  var status = true;

  if (status) {
    const newPenyakit = new Penyakit({
      namaPenyakit,
      rantaiDNA,
    });

    newPenyakit
      .save()
      .then(() => res.json("Penyakit added!"))
      .catch((err) => res.status(400).json("*Penyakit sudah terdaftar"));
  }
});

router.route("/delete/:namaPenyakit").delete((req, res) => {
  const namaPenyakit = req.params.namaPenyakit;

  Penyakit.findOneAndDelete(namaPenyakit)
    .then(() => res.json("Penyakit deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
