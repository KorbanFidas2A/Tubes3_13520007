const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({ limit: '50mb', extended: true }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())


// Database connection
const uri = process.env.ATLAS_URI
const CONNECTION_URL = "mongodb+srv://regexerigo:regexerigo@tubesstima3.zdd9e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => {
        console.log("Database connected")
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((err) => {
    console.log(err.message)
})

// mongoose.set('useFindAndModify', false);
