const express = require("express")
const router = express.Router()
const userExtractor = require("../middleware/userExtractor")


const vehicleController = require('../controllers/vehicleController')

router.get('/api/vehicles', vehicleController.get)
router.post('/api/vehicles', userExtractor, vehicleController.post)
router.put('/api/vehicles/:id', userExtractor, vehicleController.put)
router.delete('/api/vehicles/:id', userExtractor, vehicleController.delete)
router.get('/api/vehicles/:id', userExtractor, vehicleController.show)

module.exports = router