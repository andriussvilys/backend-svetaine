const express = require('express');
const router = express.Router();
// const ArtworkInfo = require('../../models/ArtworkInfo')
const FamilySetup = require('../../models/FamilySetup');

router.get('/', (req, res) => {
    FamilySetup.find()
        .then(setup => res.json(setup))
})

router.post('/', (req, res) => {
    FamilySetup.create(req.body).then((setup)=>{res.send(setup)})
})

module.exports = router;