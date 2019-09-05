const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FamilySetupSchema = new Schema({
    category: Schema.Types.Mixed,
    artworkFamily: {
        type: [],
        required: true
    },
    themes: {
        type: Array,
        required: true
    },
    seeAlso: {
        type: Array,
        required: true
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

module.exports = FamilySetupSchema = mongoose.model('familySetup', FamilySetupSchema);

//sample model
// {"category": [],
// "artworkFamily": ["good"],
// "themes": ["good"],
// "seeAlso": ["good"],
// "location": "home",
// "year": "2012"
// }