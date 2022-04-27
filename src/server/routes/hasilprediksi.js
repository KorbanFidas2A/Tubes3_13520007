const router = require('express').Router()
let HasilPrediksi = require('../models/hasilprediksi.model')
let Penyakit = require('../models/penyakit.model')
import {kmpMatch} from './algo.js'

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
    let doc = await Penyakit.findOne(filter)
    var rantai = doc.rantaiDNA



    //result
    var checking_result = kmpMatch(dnaPasien, rantai);

    var result;
    if(checking_result != -1){
        result = true;
    }else{
        result = false;
    }


    const statusTerprediksi = Boolean(result);

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
