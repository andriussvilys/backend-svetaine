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
  console.log(req.body)
      FamilySetup.create(req.body, (err, result) => {
        if(err){
          console.log("ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR")
          console.log(err.errmsg)
          console.log("ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR")
          res.status(500).send({error: err.errmsg})
          // res.status(500).send({error: err.errmsg})
        }
        else{
          console.log("SUCCCCCCCCCCCCCCCCCCCCCCCCCCCCC")
          console.log(result)
          res.send(result)
          console.log("SUCCCCCCCCCCCCCCCCCCCCCCCCCCCCC")
        }
      })
        // .then((familySetup)=>{res.send(familySetup)})
        // .catch(next => {
        //   console.log("ERRRRRRRRRRRORRRRRRRRR");
        //   console.log(next.errmsg); 
        //   console.log("ERRRRRRRRRRRORRRRRRRRR");
        //   // res.status(500).send(err)
        // })
  })

router.put('/update/:artworkFamily', (req, res, next) => {

    // const obj = {}
    // Object.keys(req.body).forEach(key => {
    //     obj[key] = req.body[key]
    // })

    FamilySetup.replaceOne(
      {artworkFamily: req.body.artworkFamily},
      req.body
    ) 

   .then(newObj => {
     res.status(200).send(newObj)
   })
   .catch(err => {console.log(err); res.status(500).send('problem')})

    // FamilySetup.findOneAndReplace(
    //   { "artworkFamily": req.params.artworkFamily },  // <-- find stage
    //   { $set: req.body },
    //   {new: true}
    // )

    // .then(newObj => {
    //   res.status(200).send(newObj)
    // })
    // .catch(err => {console.log(err); res.status(500).send('problem')})
})

module.exports = router;