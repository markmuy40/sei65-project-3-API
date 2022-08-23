import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  commentUser: { type: String, required: true },
})

const topicSchema = new mongoose.Schema({
  topic: { type: String, required: true, unique: true },
  description: String,
  comments: [commentSchema],
  imageUrl: String,
  like: { type: Number, default: 0 },
  dislike:{ type: Number, default: 0 },
  dislikeBy: [],
  likedBy: [],
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  topicUser: { type: String, required: true }
})

export default mongoose.model('Topic', topicSchema)