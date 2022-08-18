import dotenv from 'dotenv'

dotenv.config()

const consts = {
  DB_CONNECTION_STRING:
    process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/topic',
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.JWT_SECRET || '12345',
  ADMIN_HASHPASSWORD: process.env.ADMIN_HASHPASSWORD || '12345',
  USER__HASHPASSWORD: process.env.ADMIN_HASHPASSWORD || '12345',
}

export default consts