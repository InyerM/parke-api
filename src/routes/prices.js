const express = require("express")
const router = express.Router()
const userExtractor = require("../middleware/userExtractor")

const priceController = require('../controllers/priceController')

router.get('/api/prices', userExtractor, priceController.get)
router.post('/api/prices', userExtractor, priceController.post)
router.put('/api/prices/:id', userExtractor, priceController.put)
router.delete('/api/prices/:id', userExtractor, priceController.delete)
router.get('/api/prices/:id', userExtractor, priceController.show)

module.exports = router