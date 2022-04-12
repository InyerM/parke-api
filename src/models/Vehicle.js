const mongoose = require("mongoose") 
const Schema = mongoose.Schema

const VehicleSchema = new Schema({
    plate: String,
    vehicle_type: String,
}, {versionKey:false})

module.exports = mongoose.model('vehicles', VehicleSchema)