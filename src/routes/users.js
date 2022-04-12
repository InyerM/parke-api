const express = require("express")
const router = express.Router()

const userController = require('../controllers/userController')

router.get('/api/users', userController.get)
router.post('/api/users', userController.post)
router.put('/api/users/:id', userController.put)
router.delete('/api/users/:id', userController.delete)
router.get('/api/users/:id', userController.show)
router.post('/api/auth/login', userController.auth)

module.exports = router