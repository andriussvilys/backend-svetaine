const express = require('express');
const router = express.Router();
const Jimp = require('jimp')


router.post("/:fileName", (req, res, next) => {
      Jimp.read(`./client/public/uploads/${req.params.fileName}`)
        .then(image => {
            let thumbnailSize = {width: null, height: null}
            let mobileSize = {width: null, height: null}
            let desktopSize = {width: null, height: null}

            const countDimension = () => {
                const width = image.bitmap.width
                const height = image.bitmap.height
                if(width > height){
                    const mobHeight = (height * 640) / width
                    mobileSize.width = 640
                    mobileSize.height = Math.round(mobHeight)

                    const thumbHeight = (height * 200) / width
                    thumbnailSize.width = 200
                    thumbnailSize.height = Math.round(thumbHeight)

                    const desktopHeight = (height * 1080) / width
                    desktopSize.width = 1080
                    desktopSize.height = Math.round(desktopHeight)
                }
                else{
                    const mobWidth = (width * 640) / height
                    mobileSize.width = Math.round(mobWidth)
                    mobileSize.height = 640

                    const thumbWidth = (width * 200) / height
                    thumbnailSize.width = Math.round(thumbWidth)
                    thumbnailSize.height = 200

                    const desktopWidth = (width * 1080) / height
                    desktopSize.width = Math.round(desktopWidth)
                    desktopSize.height = 1080
                }
                return mobileSize
            }

            countDimension()
            image
            .quality(90)
            .resize(desktopSize.width, desktopSize.height)
            .write(`./client/public/uploads/desktop/${req.params.fileName}-desktop2.jpg`, () => {

                image
                    .quality(90)
                    .resize(mobileSize.width, mobileSize.height)
                    .write(`./client/public/uploads/mobile/${req.params.fileName}-mob.jpg`, () => {
                    
                image
                    .quality(90)
                    .resize(thumbnailSize.width, thumbnailSize.height)
                    .write(`./client/public/uploads/thumbnails/${req.params.fileName}-thumbnail.jpg`, () => {
                        return res.json(`${req.params.fileName} resized`)
                    })
                })
            })

        })
        .catch(err => {
            res.json(`ERROR: ${err}`)
        })
})

module.exports = router;