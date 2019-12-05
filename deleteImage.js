var fs = require('fs');
const express = require('express');
const router = express.Router();

router.delete(`/delete/:fileName`, (req, res) => {
    console.log('delete request')
    console.log(req.params.fileName)
    const path = `client/public/uploads/${req.params.fileName}`
    fs.unlinkSync(path)
    res.send(true)
})

module.exports = router;