import express from 'express'

console.log('hello from express!')
const PORT = 4000
const app = express()

const connectToDb = async () => {
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  return mongoose.connect('mongodb://localhost:27017/topic', opts)
}
const startServer = async () => {
  await connectToDb()
  console.log('Database has connected successfully')
  app.listen(PORT, () => {
    console.log(`:rocket: Express server running on port ${PORT} :rocket:`)
  })
}
  
startServer()



