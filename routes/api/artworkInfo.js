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

router.delete('/delete/:id', (req, res) => {
    ArtworkInfo.deleteOne({ fileName: req.params.id }, function (err) {
        console.log(req.params.id)
        if (err) return handleError(err);
        if (res) return res
        // deleted at most one tank document
      })
      .then(res => console.log(res))
})

//filter records by artworkFamily
router.get('/:artworkFamily', (req, res) => {
    ArtworkInfo.find( {"artworkFamily": req.params.artworkFamily} )
        .then(artworks => res.json(artworks))
        .catch(err => console.log(err))
}
)
router.get('/fileName/:fileName', (req, res) => {
    ArtworkInfo.find( {"fileName": req.params.fileName} )
        .then(artworks => res.json(artworks))
        .catch(err => console.log(err))
})

//@route post api/artworkInfo
//@description add a new artwork
//@access Public


router.post('/create', 
upload.single('artworkImage'), 
(req, res, rej) => {
    ArtworkInfo.create(req.body)
    .then((artwork)=>{res.send(artwork)})
    .catch(err => console.error(err))
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
    console.log('udate file runs')
    console.log(req.params.fileName)
    console.log(req.body.familyDisplayIndex)

    const obj = {}
    Object.keys(req.body).forEach(key => {
        if(key === "_id"){
            return
        }
        obj[key] = req.body[key]
    })
    // console.log('req.params')


    ArtworkInfo.findOneAndUpdate(
      { fileName: req.params.fileName },  // <-- find stage
      { $set: obj },
      {new: true, overwrite: true, upsert: false}
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