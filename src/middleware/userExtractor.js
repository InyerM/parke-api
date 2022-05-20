const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authorization = req.get('authorization')
  let token = ''
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  let decodedToken

  try{
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch {}

  if (!token || !decodedToken?.id) {
    return res.status(401).json({message : 'Invalid or missing token'})
  }

  const { id } = decodedToken
  req.userId = id

  next()
}