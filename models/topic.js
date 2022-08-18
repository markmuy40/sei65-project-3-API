import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  comments: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})



const topicSchema = new mongoose.Schema({
  topic: { type: String, required: true, unique: true },
  comments: [commentSchema],
  imageUrl: String,
  like: { type: Number, default: 0 },
  likedBy: [],
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})

export default mongoose.model('Topic', topicSchema)