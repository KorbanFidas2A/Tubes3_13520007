const router = require('express').Router()
let HasilPrediksi = require('../models/hasilprediksi.model')

router.route('/').get((req, res) => {
    HasilPrediksi.find()
        .then(hasilprediksi => res.json(hasilprediksi))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const tanggalPrediksi = Date.parse(req.body.tanggalPrediksi)
    const namaPasien = req.body.namaPasien
    const penyakitPrediksi = req.body.penyakitPrediksi
    const statusTerprediksi = Boolean(req.body.statusTerprediksi)

    const newHasilPrediksi = new HasilPrediksi({
        tanggalPrediksi,
        namaPasien,
        penyakitPrediksi,
        statusTerprediksi
    });

    newHasilPrediksi.save()
        .then(() => res.json('Hasil Prediksi added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/delete/:id').delete((req, res) =>{
    HasilPrediksi.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;