const Vehicle = require('../models/Vehicle')

module.exports.get = (req, res) => {
    Vehicle.find({}, (error, vehicles) => {
        if(error) return res.status(500).json({
            message: "Error showing vehicles"
        })
        res.json(vehicles)
    })
}

module.exports.post = (req, res) => {
    const vehicle = new Vehicle({
        plate: req.body.plate,
        vehicle_type: req.body.vehicle_type,
    })
    vehicle.save((error) => {
        if(error) return res.status(500).json({
            message: "Error posting vehicles"
        })
        res.json({message: "vehicle saved"})
    })
}

module.exports.put = async (req, res) => {
    const id = req.params.id
    const body = req.body
    try{
        await Vehicle.findByIdAndUpdate(id, body, {useFindAndModify: false})
        res.json({message: "Vehicle updated"})
    }
    catch(err){
        res.status(500).json({message: "Error updating vehicle"})
    }
}

module.exports.delete = async (req, res) => {
    const id = req.params.id
    try{
        await Vehicle.findByIdAndDelete(id, {useFindAndModify: false})
        res.json({message: "Vehicle deleted"})
    }
    catch(err){
        res.status(500).json({message: "Error deleting vehicle"})
    }
}

module.exports.show = async (req, res) => {
    const id = req.params.id
    try{
        const data = await Vehicle.findById(id, {useFindAndModify: false})
        res.json({data})
    }
    catch(err){
        res.status(500).json({message: "Error showing vehicle"})
    }
}

