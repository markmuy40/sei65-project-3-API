import express from 'express'
import mongoose from 'mongoose'

console.log('hello from express!')
const PORT = 4000
const app = express()

const connectToDb = async () => {
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  // URI connection string: unique identifier to point to a database
  // in our case, we're connecting to a local database
  // connection string is of pattern:
  // DB_FLAVOUR://HOST:PORT/DATABASE_NAME
  // DATABASE_NAME does not have to exist yet, mongoose will create it automatically.
  // Host and port have to be right though! If no DB server is running there, we won't
  // be able to connect.
  return mongoose.connect('mongodb://localhost:27017/tapas', opts)
}
const startServer = async () => {
  await connectToDb()
  console.log('Database has connected successfully')
  // app.listen(PORT, print out information when app is listening)
  // after running app.listen(), we are going to be listening on any
  // incoming requests onto our localhost:PORT
  app.listen(PORT, () => {
    console.log(`:rocket: Express server running on port ${PORT} :rocket:`)
  })
}
  
startServer()



