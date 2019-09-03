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