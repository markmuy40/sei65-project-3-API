const errorHandler = (error, req, res, next) => {

  console.log('error handler>>>>>>>>>')
  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Incorrect Object ID' })
  }
  if (error.name === 'SyntaxError') {
    return res.status(400).json({ message: 'Syntax error: Incorrect credentials' })
  }

  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'JSON token is invalid' }) 
  }

  if (error.name === 'TypeError') {
    res.status(500).json({ message: 'Something went wrong, please try again' })
  }
  if (error.name === 'MongoServerError') {
    res.status(500).json({ message: 'Try another Title!' })
  }

  return res.status(500).json({ message: 'Something went wrong' })


}

export default errorHandler