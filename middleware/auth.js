import jwt from 'jsonwebtoken'
import CONSTS from '../const.js'
import UserModel from '../models/user.js'

const auth = async (req, res, next) => {
  const rawToken = req.headers.authorization
  if (!rawToken) {
    return res.status(401).json({ message: 'Unauthorized, no token provided' })
  }
  
  const token = rawToken.split(' ')[1]
  try {
    const decodedToken = jwt.verify(token, CONSTS.JWT_SECRET)
    const authUser = await UserModel.findOne({ userName: decodedToken.userName })
    if (!authUser) {
      return res.status(401).json({ message: 'The token has expired' })
    }
    req.currentUser = authUser
    next()
  } catch (error) {
    console.log('error ----->', error)
    next(error)
  }
}

export default auth