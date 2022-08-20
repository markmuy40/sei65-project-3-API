// function to populate seddingData into the databse
import connectToDb from './db.js'
import TopicModel from '../models/topic.js'
import UserModel from '../models/user.js'
import seedingData from './seedingData.js'
import mongoose from 'mongoose'

const seed = async () => {
  await connectToDb()
  console.log('database connected')

  await mongoose.connection.db.dropDatabase()

  const dbTopic = await TopicModel.create(seedingData.topic)
  const dbUser = await UserModel.create([seedingData.user.admin, seedingData.user.user])

  dbUser.map((user) => console.log(`${user.userName}  with ${user.role} status has been registered onto the database`))
  console.log(`You have successfully created ${dbTopic.length} topics onto the database`)

  if (mongoose.Connection.readyState !== 0) {
    mongoose.disconnect()
  }

  console.log('database reset! Now run npm run start 👏 ')
}

seed()