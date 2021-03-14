const authRoutes = require('express').Router()
const authControllers = require('../controllers/auth.controllers')

// Routes /api/auth
authRoutes.post('/login', authControllers.login)

authRoutes.post('/register', authControllers.register)

module.exports = authRoutes
