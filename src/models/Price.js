const mongoose = require("mongoose") 
const Schema = mongoose.Schema

const PriceSchema = new Schema({
    vehicle_type: String,
    rate: Number,
}, {versionKey:false})

module.exports = mongoose.model('prices', PriceSchema)