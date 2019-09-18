const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FamilySetupSchema = new Schema({
    category: Schema.Types.Mixed,
    artworkFamily: {
        type: String,
        required: true
    },
    familyDescription: {
        type: String,
        required: false
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

module.exports = FamilySetupSchema = mongoose.model('familySetup', FamilySetupSchema);

//sample model
// {"category": [],
// "artworkFamily": ["good"],
// "themes": ["good"],
// "seeAlso": ["good"],
// "location": "home",
// "year": "2012"
// }