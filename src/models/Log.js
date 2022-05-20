const mongoose = require("mongoose") 
const Schema = mongoose.Schema

const LogSchema = new Schema({
    plate: String,
    registered_at: Date,
    departure_at: Date,
    token : String,
    cost : Number
}, {versionKey:false})

module.exports = mongoose.model('logs', LogSchema)