const express = require('express');
const router = express.Router();

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
 
router.post(`/:directory`, (req, res, next) => {
    (async () => {
        const files = await imagemin([`./client/build/uploads/${req.params.directory}/*.{jpg,png}`], {
            destination: `./client/build/uploads/${req.params.directory}`,
        // const files = await imagemin([`./client/public/uploads/${req.params.directory}/*.{jpg,png}`], {
        //     destination: `./client/public/uploads/${req.params.directory}`,
            plugins: [
                imageminMozjpeg({progressive: true, quality: 80}),
                imageminPngquant({
                    quality: [0.6, 0.8],
                    strip: true
                })
            ]
        });

        return res.send(`operation complete in ${req.params.directory}`)
    })();
})

module.exports = router;