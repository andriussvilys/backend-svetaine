const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ArtworkInfoSchema = new Schema({
    category: Schema.Types.Mixed,
    uploadURL: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    artworkFamily: {
        type: String,
        required: true
    },
    artworkTitle: {
        type: String,
        required: false
    },
    displayMain: {
        type: Boolean,
        required: true
    },
    familyDisplayIndex: {
        type: Number,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    themes: {
        type: Array,
        required: false
    },
    seeAlso: {
        type: Array,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    year: {
        type: String,
        required: false
    }
});

module.exports = ArtworkInfoSchema = mongoose.model('artworkInfo', ArtworkInfoSchema);

// window.addEventListener('DOMContentLoaded', (event) => {

//     function idLoop(id){
//         if(!document.getElementById(id)){
//             return
//         }
//         console.log(document.getElementById(id))
//         document.getElementById(id).setAttribute("ga-la","devices_on_top");
//         document.getElementById(id).setAttribute("data-omni-type","microsite_contentinter");
//         document.getElementById(id).setAttribute("data-omni","devices_on_top");
//         document.getElementById(id).setAttribute("ga-ca","tagasiost");
//         document.getElementById(id).setAttribute("ga-ac","feature");
//     }

//     const arr = ["gabtn01", "gabtn02", "gabtn03", "gabtn04"]

//     arr.forEach(id => idLoop(id))

//     });