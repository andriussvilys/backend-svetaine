const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ArtworkFamilyListSchema = new Schema({
    list: {
        type: Array
    },
    main:{
        type: String,
        required: false
    }
}
    // {
    // $addToSet: {
    //     type: String,
    //     required: true
    // }
    // // theme: {
    // //     type: String,
    // //     required: true
    // // }
    // }
);

module.exports = ArtworkFamilyListSchema = mongoose.model('artworkFamilyList', ArtworkFamilyListSchema);