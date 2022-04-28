let HasilPrediksi = require('../models/hasilprediksi.model')


const get_all_prediksi = () =>{
    var datas
    HasilPrediksi.find().then(doc => {
        datas = doc
        return datas
    })
}

const get_hasil_prediksi_by_name = (name) =>{
    var datas
    var filter = {namaPasien: name}
    HasilPrediksi.find(filter).then(doc => {
        datas = doc
        return datas
    })
}

const get_hasil_prediksi_by_tanggal = (date) =>{
    var datas
    var filter = {tanggalPrediksi: date}
    HasilPrediksi.find(filter).then(doc => {
        datas = doc
        return datas
    })
}

const get_hasil_prediksi_by_penyakit = (penyakit) =>{
    var datas
    var filter = {namaPenyakit: penyakit}
    HasilPrediksi.find(filter).then(doc => {
        datas = doc
        return datas
    })
}

const get_hasil_prediksi_by_tanggal_penyakit = (date, penyakit) => {
    var filter = {tanggalPrediksi: date, namaPenyakit: penyakit}
    var datas
    HasilPrediksi.find(filter).then(doc => {
        datas = doc
        return datas
    })
}
