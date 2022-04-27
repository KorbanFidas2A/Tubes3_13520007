const router = require('express').Router();
let Penyakit = require('../models/penyakit.model');

router.route('/').get((req, res) => {
    Penyakit.find()
        .then(penyakit => res.json(penyakit))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const namaPenyakit = req.body.namaPenyakit;
    const rantaiDNA = String(req.body.rantaiDNA);


    //input validation checker
    if(namaPenyakit == "" || rantaiDNA == null || rantaiDNA == ""){
        res.status(400).json('Invalid input.')
    }else{

        //check if DNA is consisted of A,C,G,T
        var Ar = Array.from(req.body.rantaiDNA)
        var ArLength = Ar.length
        var i;
        var status = true;
        for(i = 0; i < ArLength; i++){
            if(Ar[i] == 'A' || Ar[i] == 'C' || Ar[i] == 'G' || Ar[i] == 'T'){
                //do nothing
            }else{
                status = false;
                res.status(400).json('Invalid DNA pattern.')
                break;
            }
        }

        if(status){
            const newPenyakit = new Penyakit({
                namaPenyakit,
                rantaiDNA
            });
        
            newPenyakit.save()
                .then(() => res.json('Penyakit added!'))
                .catch(err => res.status(400).json('*Penyakit sudah terdaftar'));
        }
    }
})

router.route('/delete/:namaPenyakit').delete((req, res) =>{
    const namaPenyakit = req.params.namaPenyakit

    Penyakit.findOneAndDelete(namaPenyakit)
    .then(() => res.json('Penyakit deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
