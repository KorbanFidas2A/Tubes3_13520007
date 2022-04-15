const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({ limit: '50mb', extended: true }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())

const uri = process.env.ATLAS_URI

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

const hasilPrediksiRouter = require('./routes/hasilprediksi')
const penyakitRouter = require('./routes/penyakit')

app.use('/hasilprediksi', hasilPrediksiRouter)
app.use('/penyakit', penyakitRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

// mongoose.set('useFindAndModify', false);
