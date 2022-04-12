const express = require("express")
const router = express.Router()

const priceController = require('../controllers/priceController')

router.get('/api/prices', priceController.get)
router.post('/api/prices', priceController.post)
router.put('/api/prices/:id', priceController.put)
router.delete('/api/prices/:id', priceController.delete)
router.get('/api/prices/:id', priceController.show)

module.exports = router