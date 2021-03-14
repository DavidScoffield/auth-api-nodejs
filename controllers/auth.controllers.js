const register = (req, res) => {
  const body = req.body
  res.send('pass to register')
}
const login = (req, res) => {
  res.send('login')
}

module.exports = {
  register,
  login,
}
