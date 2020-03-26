const express = require('express');
const router = express.Router();
const FamilySetup = require('../../models/FamilySetup');

//get all
router.get('/', (req, res) => {
  FamilySetup.find()
      .then(category => res.json(category))
})

//find one
router.get('/:artworkFamily', (req, res) => {
    console.log(req.params.artworkFamily)
    FamilySetup.findOne( {"artworkFamily": req.params.artworkFamily} )
        .then(setup => res.json(setup))
        .catch(next)
})

//create new
router.post('/create', (req, res, next) => {
  console.log(req.body)
      FamilySetup.create(req.body)
        .then(result => {
          res.send(result)
        })
        .catch(next)
  })

//update
router.put('/update/:artworkFamily', (req, res, next) => {

    FamilySetup.replaceOne(
      {artworkFamily: req.body.artworkFamily},
      req.body
    ) 

   .then(newObj => {
     res.status(200).send(newObj)
   })
   .catch(err => {console.log(err); res.status(500).send('problem')})
})

module.exports = router;