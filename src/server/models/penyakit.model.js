const mongoose = require('mongoose')

const Schema = mongoose.Schema

const penyakitSchema = new Schema({
    namaPenyakit: {
        type: String,
        required: true,
        unique: true
    },
    rantaiDNA: {
        type: String,
        required: true
    },
})

const Penyakit = mongoose.model('Penyakit', penyakitSchema)

module.exports = Penyakit