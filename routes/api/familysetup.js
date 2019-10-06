const express = require('express');
const router = express.Router();
// const ArtworkInfo = require('../../models/ArtworkInfo')
const FamilySetup = require('../../models/FamilySetup');

router.get('/:artworkFamily', (req, res) => {
    console.log(req.params.artworkFamily)
    FamilySetup.findOne( {"artworkFamily": req.params.artworkFamily} )
        .then(setup => res.json(setup))
        .catch(err => console.log(err))
})

router.get('/', (req, res) => {
  FamilySetup.find()
      .then(category => res.json(category))
})

router.post('/create', (req, res) => {
    FamilySetup.create(req.body)
      .then((category)=>{res.send(category)})
  })

module.exports = router;