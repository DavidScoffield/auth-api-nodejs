const authRoutes = require('express').Router()
const authControllers = require('../controllers/auth.controllers')
const { verifyJWT, isAdmin, isClient } = require('../middlewares/authJWT')
const checkRolesExisted = require('../middlewares/verifySingup')

// Routes /api/auth
authRoutes.post('/login', authControllers.login)

authRoutes.post('/register', [checkRolesExisted], authControllers.register)

authRoutes.get('/pruebaJWT', [verifyJWT, isAdmin], (req, res) => {
  res.send('solo si tiene token y es administrador')
})

module.exports = authRoutes
