const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const Themes = require('../../models/Themes')

//GET ROUTE
router.get('/', (req, res) => {
    Themes.findOne({main: true})
        .then(main => {
          // console.log(main); 
          res.send(main)
        })
})

//UPDATE ROUTE
router.put("/update/", (req, res, next) => {
    const getThemesList = new Promise((resolve, reject) => {
      Themes.findOne({main: true})
        .then(res => {
          if(res.list.includes(req.body.list)){
            reject(`The theme ${req.body.list} has already been recorded.`)
          }
          else{
            resolve(res)
          }
        })
        .catch(err => reject(err))
    })

    getThemesList
      .then(() => {
          Themes.findOneAndUpdate(
            { main: true },  // <-- find stage
            { $addToSet: req.body },
            {new: true}
          )
          .then(newList => {
              res.status(200).send(`Theme ${req.body.list} has been successfully recorded`)
          })
          .catch(err => next(err))
        })
      .catch(next)
})

//DELETE THEME

router.put('/delete/', (req, res) => {
    Themes.findOneAndUpdate(
        { main: true },  // <-- find stage
        { $pull: req.body },
        {new: true}
    )
    .then(newObj => {
        console.log("theme deleted")
        console.log(newObj)
        res.status(200).send(newObj)
      })
      .catch(err => {console.log(err); res.status(500).send('problem')})
})

module.exports = router;