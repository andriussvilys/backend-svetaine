fs = require('fs');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    fs.writeFile("client/src/components/FrontEnd/staticState.js", req.body.string, () => {
        res.send(true)
    })
})

router.get('/', (req, res) => {
    const staticState = fs.readFileSync("client/public/static-state/filename.json")
    res.send(staticState)
})


module.exports = router;