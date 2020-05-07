fs = require('fs');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const jsonString = JSON.stringify(req.body)
    fs.writeFile("client/public/static-state/filename.json", jsonString, () => {
        res.send(true)
    })
})

router.get('/', (req, res) => {
    const staticState = fs.readFileSync("client/public/static-state/filename.json")
    res.send(staticState)
})


module.exports = router;