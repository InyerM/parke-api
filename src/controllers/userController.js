const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.get = (req, res) => {
    User.find({}, (error, users) => {
        if(error) return res.status(500).json({
            message: "Error showing users"
        })
        res.json(users)
    })
}

module.exports.post = async (req, res) => {
    const { body } = req
    const { username, name, password, phone, email, role } = body

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        username,
        name,
        passwordHash : passwordHash,
        phone,
        email,
        role
    })
    try{
        const savedUser = await user.save()

        res.status(201).json({ message : "User created",
            savedUser})
    }
    catch(err){
        res.status(500).json({message: "Error creating user"})
    }
}

module.exports.put = async (req, res) => {
    const { id } = req.params
    const { body } = req

    try{
        await User.findByIdAndUpdate(id, body, {useFindAndModify: false})
        res.json({message: "User updated"})
    }
    catch(err){
        res.status(500).json({message: "Error updating user"})
    }
}

module.exports.delete = async (req, res) => {
    const id = req.params.id
    try{
        await User.findByIdAndDelete(id, {useFindAndModify: false})
        res.json({message: "User deleted"})
    }
    catch(err){
        res.status(500).json({message: "Error deleting user"})
    }
}

module.exports.show = async (req, res) => {
    const { id } = req.params
    try{
        const data = await User.findById(id, {useFindAndModify: false})
        res.json({ data })
    }
    catch(err){
        res.status(500).json({message: "Error showing user"})
    }
}

module.exports.auth = async (req, res) => {
    const { body } = req
    const { username, password } = body

    const user = await User.findOne({ username })

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        res.status(401).json({
            message : "Authentication failed"
        })
        return
    }
    
    const userForToken = {
        id : user._id,
        username : user.username
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    res.send({
        id : user._id,
        username : user.username,
        token
    })
}