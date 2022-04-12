const express = require("express")
const router = express.Router()

const vehicleController = require('../controllers/vehicleController')

router.get('/api/vehicles', vehicleController.get)
router.post('/api/vehicles', vehicleController.post)
router.put('/api/vehicles/:id', vehicleController.put)
router.delete('/api/vehicles/:id', vehicleController.delete)
router.get('/api/vehicles/:id', vehicleController.show)

module.exports = router