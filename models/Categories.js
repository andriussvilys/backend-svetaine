const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategoriesSchema = (category, subcategory, listitem) =>  {
    new Schema({
        [category]: {
            type: Schema.Types.Mixed,
            [subcategory]: {
                type: Schema.Types.Mixed,
                [listItem]: {
                    type: Array
                }
            }
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
    )
}

module.exports = CategoriesSchema = mongoose.model('categories', CategoriesSchema);