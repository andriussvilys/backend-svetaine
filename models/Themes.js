const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ThemesSchema = new Schema({
    list: {
        type: Array
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

module.exports = ThemesSchema = mongoose.model('themes', ThemesSchema);