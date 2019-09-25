var fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    // let filesArray = null
    // fs.readdir('client/public/uploads', function(err, files){
    //     if (err) {console.log(err); return};
    //     if(err) {err.send(err.body)}
    //     console.log(files)
    //     filesArray = files
    // }
    // );
    
    // let filesArray = []

    // const filesArrayPromise = new Promise((resolve, reject) => {
    //     // do something asynchronous 
    //         fs.readdir('client/public/uploads', function(err, files){
    //             if (err) {console.log(err); return};
    //             // console.log(files)
    //             return filesArray = files
    //         }
    //         );
    //     //which eventually calls either:
    //     resolve('filesArray'); // fulfilled
    //     // or
    //     reject("failure reason"); // rejected
    //   });

    // filesArrayPromise

    // res => res.send(filesArray)



    let filesArray = fs.readdirSync('client/public/uploads')

    console.log(filesArray)
    res.send(filesArray)

})

module.exports = router;

// var fs = require('fs');
// const express = require('express');
// const router = express.Router();

// router.get('/', (req, res) => {
//     fs.readdir('client/public/uploads', function(err, items) {
//         if(err){console.log(err); return}
//         console.log(items)
//         return items
//     })
//     .then(res => res.send(res.body))
//     .catch(err => console.log(err))
//     // .then(array => res.send(array))
// })
