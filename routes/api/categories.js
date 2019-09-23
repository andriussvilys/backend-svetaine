const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
mongoose.set('useFindAndModify', false)
const Categories = require('../../models/Categories')

//GET ROUTE

router.get('/', (req, res) => {
  Categories.find()
      .then(category => res.json(category))
})

router.post('/create', (req, res) => {
  Categories.create(req.body).then((category)=>{res.send(category)})
  // const newArtwork = new ArtworkInfo({
  //     category: req.body.category, 
  //     uploadURL: req.body.uploadURL, 
  //     fileName: req.body.fileName, 
  //     artworkFamily: req.body.artworkFamily, 
  //     artworkTitle: req.body.artworkTitle, 
  //     displayMain: req.body.displayMain, 
  //     familyDisplayIndex: req.body.familyDisplayIndex, 
  //     fileType: req.body.fileType, 
  //     themes: req.body.themes, 
  //     seeAlso: req.body.seeAlso, 
  //     location: req.body.location, 
  //     year: req.body.year
  // })

  // newArtwork.save()
  //     .then(artwork => res.json(artwork))
})



//UPDATE ROUTE
router.put("/update/", (req, res, next) => {

    Themes.findOneAndUpdate(
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
    Themes.findOneAndUpdate(
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