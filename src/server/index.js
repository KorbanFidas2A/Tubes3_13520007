const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 5000
const {
  get_hasil_prediksi_by_tanggal_penyakit,
  get_hasil_prediksi_by_penyakit,
  get_hasil_prediksi_by_tanggal,
  get_hasil_prediksi_by_name,
  get_all_prediksi,
} = require("./controllers/hasilPrediksi");



//establishing connection

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

app.post("/Riwayat", (req, res) => {
    /**
     * @type {{
     *  query: string
     * }}
     */
    let { query } = req.body;
  
    if (query == undefined) {
      get_all_prediksi().then((result) => respond_riwayat(res, result));
      return;
    }
  
    const diseaseRegex = /^([A-Za-z\s]+)$/;
    const fullRegex = /^(.*)(?<=\d)\s([A-Za-z\s]+)$/;
    const date = string_to_date(query);
  
    if (fullRegex.test(query)) {
      const match = query.match(fullRegex);
      const disease = match[2];
      const rawDate = match[1];
      const date = string_to_date(rawDate);
      if (date == null) {
        res.status(400).end();
      } else {
        get_hasil_prediksi_by_tanggal_penyakit(date, disease).then((result) => {
          respond_riwayat(res, result);
        });
      }
    } else if (diseaseRegex.test(query)) {
      get_hasil_prediksi_by_penyakit(query).then((result) => {
        respond_riwayat(res, result);
      });
    } else if (date != null) {
      get_hasil_prediksi_by_tanggal(date).then((result) => {
        respond_riwayat(res, result);
      });
    } else {
      res.status(400).end();
    }
  });

app.use(express.static("dist"));

function respond_riwayat(response, records) {
  const responseData = [];
  for (const record of records) {
    const date = new Date(Date.parse(record.tanggalPrediksi));
    responseData.push({
      name: record.namaPasien,
      Date: date_to_string(date),
      Disease: record.penyakitPrediksi,
      Kemiripan: record.tingkatKemiripan,
      result: record.statusPrediksi,
    });
  }
  response.status(200).send(responseData).end();
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

// mongoose.set('useFindAndModify', false);

