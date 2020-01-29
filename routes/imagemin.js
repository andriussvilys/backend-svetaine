const express = require('express');
const router = express.Router();
const Jimp = require('jimp')

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
 
router.post(`/`, (req, res, next) => {
    (async () => {
        const files = await imagemin([`./client/public/uploads/*.jpg`], {
            destination: './client/public/uploads/imagemin',
            plugins: [
                imageminJpegtran({progressive: true, quality: 0.8}),
                imageminPngquant({
                    quality: [0.6, 0.8]
                })
            ]
        });
        
        console.log(files);
        //=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
    })();
})

module.exports = router;