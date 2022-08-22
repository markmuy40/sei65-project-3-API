import UserModel from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import CONSTS from '../const.js'

const register = async (req, res, next) => {

  const { body: newUser } = req

  const emailExists = await UserModel.findOne({ email: newUser.email })
  if (emailExists) {
    return res.status(400).json({ message: 'Email address already exists, please use different one' })
  }

  const usernameExists = await UserModel.findOne({ userName: newUser.userName })
  if (usernameExists) {
    return res.status(400).json({ message: 'Username already exists, please use different one' })
  }

  if (newUser.password !== newUser.confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match, please try again' })
  }

  if (!newUser.userName || !newUser.email || !newUser.password || !newUser.confirmPassword) {
    return res.status(400).json({ message: 'All empty fields must be filled in' })
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(newUser.password, salt)
  const createdUser = await UserModel.create({ ...newUser, password: hashedPassword })
  return res.status(200).json({ createdUser })

}

const login = async (req, res, next) => {
  const { userName, password } = req.body
  try {
    const user = await UserModel.findOne({ userName })
    if (!user) {
      return res.status(400).json({ message: 'error, incorrect credentials' })
    }
    const passwordsMatch = await bcrypt.compare(password, user.password)
    if (!passwordsMatch) {
      return res.status(400).json({ message: 'error, incorrect credentials' })
    }

    const payload = {
      userName: user.userName,
      email: user.email,
    }
    const opts = {
      expiresIn: '2 days',
    }

    const token = jwt.sign(payload, CONSTS.JWT_SECRET, opts)

    return res.status(200).json({ token })
  } catch (error) {
    next(error)
  }



}

export default { register, login }