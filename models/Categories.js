const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategoriesSchema = 
    new Schema({
        category: {
            type: String,
            required: true,
            unique: true
        },
        subcategory: {
            type:  Schema.Types.Mixed
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


module.exports = CategoriesSchema = mongoose.model('categories', CategoriesSchema);