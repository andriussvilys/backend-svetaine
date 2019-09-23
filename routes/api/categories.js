const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
mongoose.set('useFindAndModify', false)
const Themes = require('../../models/Themes')

//GET ROUTE
router.get('/', (req, res) => {
})
    .then(main => {
        // console.log(main); 
        res.send(main)
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