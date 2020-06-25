fs = require('fs');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    // fs.writeFileSync("client/src/components/FrontEnd/staticState.js", req.body.string)
    // console.log("__________1____________________")
    fs.writeFileSync("client/public/static-state/staticState.js", req.body.string)
    // console.log("__________2____________________")
    fs.writeFileSync("client/build/static-state/staticState.js", req.body.string)
    console.log("__________3____________________")
    // fs.writeFile("client/src/components/FrontEnd/staticState.js", req.body.string, () => {
    //     res.send(true)
    // })
        res.send(true)
})

router.get('/', (req, res) => {
    const staticState = fs.readFileSync("client/public/static-state/filename.json")
    res.send(staticState)
})


module.exports = router;