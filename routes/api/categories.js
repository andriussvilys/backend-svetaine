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
  console.log("CATEGORIES CREATE")
  console.log(req.body)
  Categories.create(req.body)
    .then((category)=>{res.send(category)})
})

//UPDATE ROUTE
// router.put("/update/", (req, res, next) => {
//     console.log("CATEGORIES UPDATE")
//      Categories.replaceOne(
//        {category: req.body.category},
//        req.body
//      ) 

//     .then(newObj => {
//       category.save()
//       .then(() => {
//         res.status(200).send(newObj)
//       })
//       .catch(next)
//       // res.status(200).send(newObj)
//     })
//     .catch(err => {console.log(err); res.status(500).send('problem')})
// })
router.put("/update/", (req, res, next) => {
    console.log("CATEGORIES UPDATE")
    console.log(req.body)
     Categories.replaceOne(
       {category: req.body.category},
       req.body
     ) 

    .then(newObj => {
      res.status(200).send(newObj)
    })
    .catch(err => {console.log(err); res.status(500).send('problem')})
})

//DELETE THEME

router.get('/findOne/', (req,res) => {
  console.log("req.body.category")
  console.log(req.body.category)
  Themes.findOne(
    {category: req.body.category}
  )
  .then( category => {
    res.status(200).send(category)
  })
  .catch(err => {console.log(err)})
})

router.put('/delete/', (req, res) => {
    console.log("req.body")
    console.log(req.body)

    // Themes.findOne(
    //   {}
    // )

    Themes.findOneAndUpdate(
        { category: req.body.category },  // <-- find stage
        { $pull: "category" },
        {new: true}
    )
    .then(newObj => {
        res.status(200).send(newObj)
      })
      .catch(err => {console.log(err); res.status(500).send(err)})
})

module.exports = router;