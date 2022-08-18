import express from 'express'
import connectToDb from "./utils/db.js"
import logger from "./middleware/logger.js"
import router from "./router.js"
// import CONSTS from "./consts.js"
// import cors from 'cors'

console.log('hello from express!')
const PORT = 4000
const app = express()
//app.use(cors())

const startServer = async () => {
  await connectToDb()
  console.log('Database has connected successfully')

  app.listen(PORT, () => {
    console.log(`:rocket: Express server running on port ${PORT} :rocket:`)
  })
}
  
startServer()



