import TopicModel from '../models/topic.js'

const getAll = async (req, res, next) => {
  const { topicId } = req.params
  try {
    const topic = await TopicModel.findById(topicId)
    if (!topic) {
      return res.status(404).json({ message: `topic with ${topicId} not found` })
    }
    const allComments = topic.comments
    return res.status(200).json(allComments)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

// ! create a comment
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

    const newComment = { ...req.body, createdBy: req.currentUser.id, commentUser: req.currentUser.userName }
    topic.comments.push(newComment)

    await topic.save()

    return res.status(200).json({ message: 'Comment successfuly created!', createdcomment: newComment })

  } catch (error) {
    next(error)
  }
}
// ! delete a comment
const remove = async (req, res, next) => {
  const { topicId, commentId } = req.params
  const { id: userId } = req.currentUser
  console.log('req body', req)

  try {
    const topic = await TopicModel.findById(topicId)
    console.log('topic id', topicId)
    console.log('user ID', userId)

    const deleteComment = topic.comments.find((comment) => comment.id === commentId)
    console.log('topic comments', topic.comments)
    console.log('topic comments id', topic.comments.id)
    console.log('user status', req.currentUser.role)
    console.log('comment Id', commentId)

    if (deleteComment.createdBy.toString() !== userId && req.currentUser.role !== 'admin') {
      //console.log('current user', userId)
      //console.log('created by', deleteComment.createdBy)

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

// ! edit or update a comment
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
  getAll,
  create,
  remove,
  update,
}