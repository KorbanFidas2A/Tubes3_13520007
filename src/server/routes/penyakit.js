const router = require('express').Router();
let Penyakit = require('../models/penyakit.model');

router.route('/').get((req, res) => {
    print("test")
    Penyakit.find()
        .then(penyakit => res.json(penyakit))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const namaPenyakit = req.body.namaPenyakit;
    const rantaiDNA = req.body.rantaiDNA;

    const newPenyakit = new Penyakit({
        namaPenyakit,
        rantaiDNA
    });

    newPenyakit.save()
        .then(() => res.json('Penyakit added!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/delete/:id').delete((req, res) =>{
    Penyakit.findByIdAndDelete(req.params.id)
    .then(() => res.json('Penyakit deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;