const authRoutes = require('express').Router()
const authControllers = require('../controllers/auth.controllers')
const { verifyToken } = require('../middlewares/authJWT')

// Routes /api/auth
authRoutes.post('/login', authControllers.login)

authRoutes.post('/register', authControllers.register)

authRoutes.get('/pruebaJWT', [verifyToken], (req, res) => {
  res.send('solo si tiene token')
})

module.exports = authRoutes
