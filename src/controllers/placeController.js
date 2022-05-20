const Place = require('../models/Place')

module.exports.get = (req, res) => {
    Place.find({}, (error, places) => {
        if(error) return res.status(500).json({
            message: "Error showing places"
        })
        res.json(places)
    })
}

module.exports.post = (req, res) => {
    const {total_places, places_available, vehicles_in_parking} = req.body
    const place = new Place({
        total_places, 
        places_available, 
        vehicles_in_parking
    })
    place.save((error) => {
        if(error) return res.status(500).json({
            message: "Error posting places"
        })
        res.json({message: "Place saved"})
    })
}

module.exports.put = async (req, res) => {
    const {id} = req.params
    const {body} = req
    try{
        const data = await Place.findByIdAndUpdate(id, body, {useFindAndModify: false})
        data.places_available = body.places_available
        data.vehicles_in_parking = body.vehicles_in_parking
        res.json({message: "Place updated", data})
    }
    catch(err){
        res.status(500).json({message: "Error updating place"})
    }
}