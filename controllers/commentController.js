import TopicModel from '../models/topic.js'

const create = async (req, res, next) => {
  const { topicId } = req.params

  try {
    const topic = await TopicModel.findById(topicId)
    if (!topic) {
      return res.status(404).json({ message: `topic with ${topicId} not found` })
    }

    // const commentIsRated = topic.comments.some((comment) => comment.createdBy.toString() === req.currentUser.id && comment.rating)

    // if (req.body.rating && commentIsRated) {
    //   return res.status(403).json({ message: 'You have already rated this topic!' })
    // }

    const newComment = { ...req.body, createdBy: req.currentUser.id }
    topic.comments.push(newComment)

    await topic.save()

    return res.status(200).json({ message: 'Comment successfuly created!', createdcomment: newComment })

  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  const { topicId, commentId } = req.params
  const { id: userId } = req.currentUser

  try {
    const topic = await TopicModel.findById(topicId)

    const deleteComment = topic.comments.find((comment) => comment.id === commentId)
    if (deleteComment.createdBy.toString() !== userId && req.currentUser.role !== 'admin') {
      return req.status(403).json({ message: 'Denied, you are not an admin or user who created this comment' })
    }

    topic.comments = topic.comments.filter((comment) => comment.id !== commentId); {
      const updatedtopic = await topic.save()
      return res.status(200).json({ message: 'Comment was deleted successfully', updatedComment: updatedtopic.comment })

    }
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  const { topicId, commentId } = req.params
  const updatedComment = req.body
  const { id: userId } = req.currentUser
  try {
    const topic = await TopicModel.findById(topicId) 
    const commentToUpdate = topic.comments.find((comment) => comment.id === commentId)

    if (commentToUpdate.createdBy.toString() !== userId && req.currentUser.role !== 'admin') {
      return res.status(403).json({ message: 'Denied, you are not an admin or user who created this comment' })
    }
    topic.comments = topic.comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, ...updatedComment }
      } else {
        return comment
      }
    })
    await topic.save()

    return res.status(200).json({ message: 'Comment has been updated suffessfully', updatedComment: topic.comments.find((comment) => comment.id === commentId) })
    
  } catch (error) {
    next(error)
  }
}

export default { 
  create,
  remove,
  update,
}