const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const Users = require('../../models/Users')

//GET ROUTE
router.get('/', (req, res) => {
    Users.find()
        .then(users => {
          res.send(users)
        })
})
router.get('/:user', (req, res) => {
    Users.findOne({"username": req.params.user})
        .then(user => {
          // console.log(main); 
          res.send(user)
        })
})

router.post('/create', (req, res) => {
    console.log(req.body)
      Users.create(req.body)
        .then((user)=>{res.send(user)})
    })

module.exports = router;