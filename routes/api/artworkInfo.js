const express = require('express');
const router = express.Router();
const ArtworkInfo = require('../../models/ArtworkInfo');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './client/public/uploads')
        // cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }

})

const upload = multer({storage: storage})
//model

//@route GET api/artworkInfo
//@description get all artoworks
//@access Public

router.get('/', (req, res) => {
    ArtworkInfo.find()
        .then(artworks => res.json(artworks))
})

router.get('/:artworkFamily', (req, res) => {
    console.log('REQ PARMS')
    console.log(req.params.artworkFamily)
    ArtworkInfo.find( {"artworkFamily": req.params.artworkFamily} )
        .then(artworks => res.json(artworks))
        .catch(err => console.log(err))
})

//@route post api/artworkInfo
//@description add a new artwork
//@access Public


router.post('/create', 
upload.single('artworkImage'), 
(req, res) => {
    ArtworkInfo.create(req.body).then((artwork)=>{res.send(artwork)})
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

router.post('/imageUpload', upload.single('artworkImage'), (req, res) => {
})

// .then(res => {
//     console.log('REQ')
//     console.log(req)
//     console.log('RES')
//     console.log(res)
// })

//@route GET api/artworkInfo/:id
//@description delete an artwork
//@access Public

router.delete('/delete/:id', (req, res) => {
    ArtworkInfo.findById(req.params.id)
        .then(artwork => {
            artwork.remove()
                .then(() => res.json({success: true}))
                .catch(err => res.status(404).json({success: "404: not found"}))
            }
        )
})

router.put("/update/:fileName", (req, res, next) => {
    console.log(Object.keys(req.body))
    const obj = {}
    Object.keys(req.body).forEach(key => {
        obj[key] = req.body[key]
    })
    console.log(obj)

    ArtworkInfo.findOneAndUpdate(
      { fileName: req.params.id },  // <-- find stage
      { $set: obj },
      {new: true}
    )

    .then(newObj => {
      res.status(200).send(newObj)
    })
    .catch(err => {console.log(err); res.status(500).send('problem')})
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