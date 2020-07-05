const express = require('express');
const router = express.Router();
const ArtworkInfo = require('../../models/ArtworkInfo');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './client/public/uploads')
        // cb(null, './client/public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }

})

const upload = multer({storage: storage})

//@route GET api/artworkInfo
//@description get all artoworks
router.get('/', (req, res) => {
    ArtworkInfo.find()
        .then(artworks => res.json(artworks))
})

router.delete('/delete/:fileName', (req, res) => {
    ArtworkInfo.deleteOne({ "fileName": req.params.fileName })
      .then(result => {res.json(result); console.log(res)})
      .catch(err => {res.json(err); console.log(err)})
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
(req, res, next) => {
    ArtworkInfo.create(req.body)
    .then((artwork)=>{
        res.send(artwork)
    })
    .catch(err => {
        res.json(err)
    })
})

router.post('/imageUpload', 
upload.single('artworkImage'), 
(req, res, rej) => {
    res.send('image file uploaded')
})

router.put("/update/:fileName", (req, res, next) => {
    console.log('udate file runs')
    console.log(req.params.fileName)

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