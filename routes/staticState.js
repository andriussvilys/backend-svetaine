fs = require('fs');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {

    console.log("static state post req body")
    fs.writeFileSync("client/public/static-state/staticState.js", req.body.jsImport.string)
    fs.writeFileSync("client/public/static-state/staticState.json", req.body.JSON)

    fs.writeFileSync("client/build/static-state/staticState.js", req.body.jsImport.string)
    fs.writeFileSync("client/build/static-state/staticState.json", req.body.JSON)

    fs.writeFileSync("client/src/components/FrontEnd/staticState.js", req.body.jsImport.string)
    fs.writeFileSync("client/src/components/FrontEnd/staticState.json", req.body.JSON)

        res.send(true)
})

router.get('/', (req, res) => {
    const staticState = fs.readFileSync("client/public/static-state/staticState.json")
    res.send(staticState)
})


module.exports = router;