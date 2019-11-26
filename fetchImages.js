var fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let filesArray = fs.readdirSync('client/public/uploads')
    res.send(filesArray)
})

module.exports = router;
