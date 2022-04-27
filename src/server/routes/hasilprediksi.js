const router = require('express').Router()
let HasilPrediksi = require('../models/hasilprediksi.model')
let Penyakit = require('../models/penyakit.model')
let algo = require('./algo')

router.route('/').get((req, res) => {
    HasilPrediksi.find()
        .then(hasilprediksi => res.json(hasilprediksi))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    var today = new Date()
    const tanggalPrediksi = Date(today)

    //get request from frontend
    const namaPasien = req.body.namaPasien
    const penyakitPrediksi = String(req.body.penyakitPrediksi)
    const dnaPasien = String(req.body.dnaPasien)
    
    //get string from database
    const filter = {namaPenyakit: penyakitPrediksi}
    var rantai = ""
    Penyakit.find(filter).then(doc => {
        rantai = doc[0].rantaiDNA
        //result
        var checking_result = algo.kmpMatch(dnaPasien, rantai);
        var similarityLevel;
        var result;
        if(checking_result != -1){
            result = true;
            similarityLevel = 100
        }else{
            result = false;
            similarityLevel = algo.similarityTest(dnaPasien, rantai)
            if(similarityLevel >= 80){
                result = true;
            }
        }
        const statusTerprediksi = Boolean(result);
        const tingkatKemiripan = similarityLevel;
    
        const newHasilPrediksi = new HasilPrediksi({
            tanggalPrediksi,
            namaPasien,
            penyakitPrediksi,
            tingkatKemiripan,
            statusTerprediksi
        });
    
        newHasilPrediksi.save()
            .then(() => res.json('Hasil Prediksi added!'))
            .catch(err => res.status(400).json('Error: ' + err))
    })
})

router.route('/delete/:id').delete((req, res) =>{
    HasilPrediksi.findByIdAndDelete(req.params.id)
    .then(() => res.json('Hasil Prediksi deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
