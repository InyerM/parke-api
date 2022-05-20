const express = require("express")
const router = express.Router()
const userExtractor = require("../middleware/userExtractor")

const logController = require('../controllers/logController')

router.get('/api/logs', userExtractor, logController.get)
router.post('/api/logs', userExtractor, logController.post)
router.put('/api/logs/:id', userExtractor, logController.put)
router.delete('/api/logs/:id', userExtractor, logController.delete)
router.get('/api/logs/:id', userExtractor, logController.show)
router.get('/api/logsByToken/:token', logController.getByToken)

module.exports = router