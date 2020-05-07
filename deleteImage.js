var fs = require('fs');
const express = require('express');
const router = express.Router();

router.delete(`/delete/:fileName`, (req, res) => {
    console.log('delete request')
    console.log(req.params.fileName)

    const newName = req.params.fileName.slice(0, req.params.fileName.indexOf("."))
    const fileExtension = req.params.fileName.slice(req.params.fileName.indexOf("."), req.params.fileName.length)

    const paths = [
        `client/public/uploads/${req.params.fileName}`,
        `client/public/uploads/desktop/${newName}-desktop${fileExtension}`,
        `client/public/uploads/mobile/${newName}-mob${fileExtension}`,
        `client/public/uploads/thumbnails/${newName}-thumbnail${fileExtension}`
    ]
    console.log(paths)
    const path = `client/public/uploads/${req.params.fileName}`
    paths.forEach(path => {
        fs.unlinkSync(path)
    })
    res.send(true)
})

module.exports = router;