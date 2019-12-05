var fs = require('fs');
const express = require('express');
const router = express.Router();

router.delete('/', (req, res) => {
    console.log('delete request')
    // console.log(req.body)
    // res.send(req.body)
    // console.log(req)
    const path = `client/public/uploads/${req.body}`
    fs.unlinkSync(path)
    res.send(true)
})

module.exports = router;