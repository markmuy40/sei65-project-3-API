import express from 'express'
import connectToDb from './utils/db.js'
import logger from './middleware/logger.js'
import router from './router.js'
import CONSTS from './const.js'
import errorHandler from './middleware/errorHandler.js'
import cors from 'cors'

console.log('hello from express!')

const app = express()

app.use(cors())

app.use(express.json())

app.use(logger)

app.use(router)

app.use(errorHandler)

app.use((req, res, next) => {
  return res.status(404).send('404 - Endpoint not found')
})

const startServer = async () => {
  await connectToDb()
  console.log('Database has connected successfully')

  app.listen(CONSTS.PORT, () => {
    console.log(`:rocket: Express server running on port ${CONSTS.PORT} :rocket:`)
  })
}
  
startServer()



