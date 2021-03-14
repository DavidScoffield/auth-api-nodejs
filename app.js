const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const authRoutes = require('./routes/auth.routes')
const welcomeRoute = require('./routes/welcome.route')
const config = require('./utils/config')

// Connection at the DB
logger.info('🔎🔎 connecting to', config.MONGODB_URI)
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('✅️✅️ Connections to database succefully')
  })
  .catch((err) => {
    logger.info(err)
  })

// Middlewares
app.use(express.json())
app.use(cors())

// Welcome Route
app.get('/', welcomeRoute)

// Routes
app.use('/api/auth', authRoutes)

module.exports = app
