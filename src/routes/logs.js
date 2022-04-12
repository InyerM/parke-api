const express = require("express")
const router = express.Router()

const logController = require('../controllers/logController')

router.get('/api/logs', logController.get)
router.post('/api/logs', logController.post)
router.put('/api/logs/:id', logController.put)
router.delete('/api/logs/:id', logController.delete)
router.get('/api/logs/:id', logController.show)

module.exports = router