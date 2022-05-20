const mongoose = require("mongoose") 
const Schema = mongoose.Schema

const PlaceSchema = new Schema({
    total_places: Number,
    places_available: Number,
    vehicles_in_parking: Number
}, {versionKey:false})

module.exports = mongoose.model('places', PlaceSchema)