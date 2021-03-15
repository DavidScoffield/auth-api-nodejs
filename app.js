const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const authRoutes = require('./routes/auth.routes')
const welcomeRoute = require('./routes/welcome.route')
const config = require('./utils/config')
const { initializeRoles } = require('./utils/initializeRoles')
const { unknownEndpoint, errorHandler } = require('./controllers/extras.controllers')

// Setting
initializeRoles()

// Connection at the DB
logger.info('🔎🔎 connecting to', config.MONGO_URI)
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('✅️✅️ Connections to database succefully')
  })
  .catch((err) => {
    logger.info('❌ error connecting to MongoDB:', err.message)
  })

// Middlewares
app.use(express.json())
app.use(cors())

// Welcome Route
app.get('/', welcomeRoute)

// Routes
app.use('/api/auth', authRoutes)

// Route unknown
app.use(unknownEndpoint)
// Error handler
app.use(errorHandler)

module.exports = app
