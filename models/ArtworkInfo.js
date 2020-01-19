const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ArtworkInfoSchema = new Schema({
    category: {
        type:Schema.Types.Mixed,
        required: true
    },
    displayTriggers: {
        type:Schema.Types.Mixed,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true,
        unique: true
    },
    artworkFamily: {
        type: String,
        required: false,
        default: "none"
    },
    familyDescription: {
        type: String,
        required: false
    },
    artworkTitle: {
        type: String,
        required: false
    },
    artworkDescription: {
        type: String,
        required: false
    },
    displayMain: {
        type: Boolean,
        required: false,
        default: false
    },
    familyDisplayIndex: {
        type: Number,
        required: false,
    },
    fileType: {
        type: String,
        required: true
    },
    themes: {
        type: Array,
        required: false,
        default: []
    },
    seeAlso: {
        type: Array,
        required: false,
        default: []
    },
    location: {
        type: String,
        required: false,
        default: ""
    },
    year: {
        type: String,
        required: false,
        default: ""
    },
    naturalSize: {
        type:Schema.Types.Mixed,
    }
}, {minimize: false});

module.exports = ArtworkInfoSchema = mongoose.model('artworkInfo', ArtworkInfoSchema);
