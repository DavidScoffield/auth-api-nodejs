const express = require('express')
const app = express()
const welcomeRoute = require('express').Router()
const pkg = require('../package.json')

app.set('pkg', pkg)

welcomeRoute.get('/', (req, res) => {
  res.json({
    message: 'Welcome to my Auth API',
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    repository: app.get('pkg').homepage,
  })
})

module.exports = welcomeRoute
