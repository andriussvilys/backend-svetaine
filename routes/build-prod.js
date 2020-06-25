const express = require('express');
const router = express.Router();
const {exec} = require('child_process')

router.post('/', (req, res) => {
        // exec('npm run build-prod')

        exec("npm run build-prod", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });

        // res.send(true)
})



module.exports = router;