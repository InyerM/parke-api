const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    name: String,
    passwordHash: String,
    phone: Number,
    email: {
        type: String,
        unique: true
    },
    role: String
}, {versionKey:false})

UserSchema.set('toJSON', {
    transform : (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('users', UserSchema)