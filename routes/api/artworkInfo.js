const express = require('express');
const router = express.Router();

//model
const ArtworkInfo = require('../../models/ArtworkInfo');

//@route GET api/artworkInfo
//@description get all artoworks
//@access Public

router.get('/', (req, res) => {
    ArtworkInfo.find()
        .then(artworks => res.json(artworks))
})
//@route post api/artworkInfo
//@description add a new artwork
//@access Public

router.post('/', (req, res) => {
    const newArtwork = new ArtworkInfo({
        category: req.body.category, 
        uploadURL: req.body.uploadURL, 
        fileName: req.body.fileName, 
        artworkFamily: req.body.artworkFamily, 
        artworkTitle: req.body.artworkTitle, 
        displayMain: req.body.displayMain, 
        familyDisplayIndex: req.body.familyDisplayIndex, 
        fileType: req.body.fileType, 
        themes: req.body.themes, 
        seeAlso: req.body.seeAlso, 
        location: req.body.location, 
        year: req.body.year
    })

    newArtwork.save()
        .then(artwork => res.json(artwork))
})


module.exports = router;

//SAMPLE MODEL
// "category": {"medium": "photo"},
// "uploadURL": "",
// "fileName": "o.jpg",
// "artworkFamily": "lorenz",
// "artworkTitle": "picture-1",
// "displayMain": true,
// "familyDisplayIndex": 0, 
// "fileType": "img/jpg",
// "themes": ["social", "bw"],
// "seeAlso": [],
// "location": "panevezys",
// "year": "2015"