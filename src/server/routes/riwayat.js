const router = require("express").Router();
let HasilPrediksi = require("../models/hasilprediksi.model");
let searchbar = require("./searchbar");

router.route('/').get((req, res) => {
    HasilPrediksi.find()
        .then(hasilprediksi => res.json(hasilprediksi))
        .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/cari').get((req, res) => {
    const userInput = req.body
    if(searchbar.isPenyakitorNama(userInput)){
        const filter = {penyakitPrediksi: userInput}
        HasilPrediksi.find(filter).then((doc) => {
            respond_riwayat(res, doc)
        })
    }

})

function respond_riwayat(response, records) {
    const array_of_response = [];
    for (const record of records) {
        array_of_response.push({
            name: record.namaPasien,
            Date: record.tanggalPrediksi,
            Disease: record.penyakitPrediksi,
            Similarity: record.tingkatKemiripan,
            result: record.statusPrediksi,
        });
    }
    response.status(200).send(array_of_response).end();
}
  