const authRoutes = require('express').Router()
const authControllers = require('../controllers/auth.controllers')
const { verifyToken, isAdmin, isClient } = require('../middlewares/authJWT')

// Routes /api/auth
authRoutes.post('/login', authControllers.login)

authRoutes.post('/register', authControllers.register)

authRoutes.get('/pruebaJWT', [verifyToken, isAdmin], (req, res) => {
  res.send('solo si tiene token y es administrador')
})

module.exports = authRoutes
