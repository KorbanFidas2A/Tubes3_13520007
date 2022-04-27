const router = require('express').Router()
let HasilPrediksi = require('../models/hasilprediksi.model')
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
    const penyakitPrediksi = req.body.penyakitPrediksi
    
    //get string from database



    //result
    var checking_result = kmpMatch();

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
