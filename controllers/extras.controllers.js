const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  console.log(`❌ ${err.name}, ${err.message}`)

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  } else if (err.name === 'TokenExpiredError') {
    return res.status(400).json({ error: err.message })
  }

  next(err)
}

module.exports = {
  unknownEndpoint,
  errorHandler,
}
