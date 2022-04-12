const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: String,
    name: String,
    password: String,
    phone: Number,
    email: String,
    role: String
}, {versionKey:false})

module.exports = mongoose.model('users', UserSchema)