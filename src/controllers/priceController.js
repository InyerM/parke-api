const Price = require('../models/Price')

module.exports.get = (req, res) => {
    Price.find({}, (error, prices) => {
        if(error) return res.status(500).json({
            message: "Error showing prices"
        })
        res.json(prices)
    })
}

module.exports.post = (req, res) => {
    const price = new Price({
        vehicle_type : req.body.vehicle_type,
        rate : req.body.rate
    })
    
    price.save((error) => {
        if(error) return res.status(500).json({
            message: "Error posting prices"
        })
        res.json({message: "Price saved"})
    })
}

module.exports.put = async (req, res) => {
    const id = req.params.id
    const body = req.body
    try{
        await Price.findByIdAndUpdate(id, body, {useFindAndModify: false})
        res.json({message: "Price updated"})
    }
    catch(err){
        res.status(500).json({message: "Error updating price"})
    }
}

module.exports.delete = async (req, res) => {
    const id = req.params.id
    try{
        await Price.findByIdAndDelete(id, {useFindAndModify: false})
        res.json({message: "Price deleted"})
    }
    catch(err){
        res.status(500).json({message: "Error deleting price"})
    }
}

module.exports.show = async (req, res) => {
    const id = req.params.id
    try{
        const data = await Price.findById(id, {useFindAndModify: false})
        res.json({data})
    }
    catch(err){
        res.status(500).json({message: "Error showing price"})
    }
}