const mongoose = require('mongoose')

const Schema = mongoose.Schema

const hasilPrediksiSchema = new Schema({
    tanggalPrediksi: {
        type: Date,
        required: true
    },
    namaPasien: {
        type: String,
        required: true,
    },
    penyakitPrediksi: {
        type: String,
        required: true
    },
    tingkatKemiripan: {
        type: Number,
        required: true
    },
    statusTerprediksi: {
        type: Boolean,
        required: true
    },
})

const HasilPrediksi = mongoose.model('HasilPrediksi', hasilPrediksiSchema)

module.exports = HasilPrediksi