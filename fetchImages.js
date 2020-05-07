var fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let filesArray = fs.readdirSync('client/public/uploads/thumbnails')
    res.send(filesArray)
})

module.exports = router;
