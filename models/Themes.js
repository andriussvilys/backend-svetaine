const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ThemesSchema = new Schema({
    list: {
        type: Array
    }
}
);

module.exports = ThemesSchema = mongoose.model('themes', ThemesSchema);