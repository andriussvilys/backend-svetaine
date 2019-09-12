const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
mongoose.set('useFindAndModify', false)
const ArtworkFamilyList = require('../../models/ArtworkFamilyList')

//GET ROUTE
router.get('/', (req, res) => {
    ArtworkFamilyList.find()
        .then(main => {
            console.log(main); 
            res.send(main)
        })
})

router.post('/create', (req, res) => {
    ArtworkFamilyList.create(req.body).then((artwork)=>{res.send(artwork)})
})

//UPDATE ROUTE
router.put("/update/", (req, res, next) => {

    ArtworkFamilyList.findOneAndUpdate(
      { main: true },  // <-- find stage
      { $addToSet: req.body },
      {new: true}
    )
    .then(newObj => { 
      res.status(200).send(newObj)
    })
    .catch(err => {console.log(err); res.status(500).send('problem')})
})

//DELETE THEME

router.put('/delete/', (req, res) => {
    ArtworkFamilyList.findOneAndUpdate(
        { main: true },  // <-- find stage
        { $pull: req.body },
        {new: true}
    )
    .then(newObj => {
        res.status(200).send(newObj)
      })
      .catch(err => {console.log(err); res.status(500).send('problem')})
})

module.exports = router;