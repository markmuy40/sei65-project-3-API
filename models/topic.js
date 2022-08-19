import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})



const topicSchema = new mongoose.Schema({
  topic: { type: String, required: true, unique: true },
  description: String,
  comments: [commentSchema],
  imageUrl: String,
  like: { type: Number, default: 0 },
  likedBy: [],
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})

export default mongoose.model('Topic', topicSchema)