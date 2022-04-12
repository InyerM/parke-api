const User = require('../models/User')

module.exports.get = (req, res) => {
    User.find({}, (error, users) => {
        if(error) return res.status(500).json({
            message: "Error showing users"
        })
        res.json(users)
    })
}

module.exports.post = (req, res) => {
    const user = new User({
        username: req.body.username,
        name: req.body.name,
        password: req.body.password,
        phone: req.body.phone,
        email: req.body.email,
        role: req.body.role
    })
    user.save((error) => {
        if(error) return res.status(500).json({
            message: "Error posting users"
        })
        res.json({message: "User saved"})
    })
}

module.exports.put = async (req, res) => {
    const id = req.params.id
    const body = req.body
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
    const id = req.params.id
    try{
        const data = await User.findById(id, {useFindAndModify: false})
        res.json({data})
    }
    catch(err){
        res.status(500).json({message: "Error showing user"})
    }
}

module.exports.auth = (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    
    User.find({}, (error, users) => {
        if(error) return res.status(500).json({
            message: "Authentication failed"
        })
        const found = users.find(i => i.username === user.username && i.password === user.password)

        if(found){
            res.json({message: 'Succesfully authenticated'})
        }
        else{
            res.json({message: 'Authentication failed'})
        }
    })
}