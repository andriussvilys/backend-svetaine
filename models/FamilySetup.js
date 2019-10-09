const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FamilySetupSchema = new Schema({
    category: {
        type: Schema.Types.Mixed,
        default: {}
    },
    artworkFamily: {
        type: String,
        required: true,
        unique: true
    },
    familyDescription: {
        type: String,
        required: false,
        default: ""
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
    }
}, {minimize: false});

module.exports = FamilySetupSchema = mongoose.model('familySetup', FamilySetupSchema);

//sample model
// {"category": [],
// "artworkFamily": ["good"],
// "themes": ["good"],
// "seeAlso": ["good"],
// "location": "home",
// "year": "2012"
// }