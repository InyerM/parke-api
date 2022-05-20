const express = require("express")
const router = express.Router()
const userExtractor = require("../middleware/userExtractor")

const placeController = require('../controllers/placeController')

router.get('/api/places', userExtractor, placeController.get)
router.post('/api/places', userExtractor, placeController.post)
router.put('/api/places/:id', userExtractor, placeController.put)

module.exports = router