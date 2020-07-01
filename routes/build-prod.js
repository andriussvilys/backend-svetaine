const express = require('express');
const router = express.Router();
const {exec} = require('child_process')

router.post('/', (req, res, next) => {
        // exec('npm run build-prod')
        console.log("run buil prod")
        exec("npm run build-prod", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                next
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                next
                return;
            }
            console.log(`stdout: ${stdout}`);
        });

        // res.send(true)
})

// exec("npm run build-prod", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });



module.exports = router;