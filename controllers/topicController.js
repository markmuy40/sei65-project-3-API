import TopicModel from '../models/topic.js'

const getAll = async (req, res) => {
  const allTopics = await TopicModel.find()
  return res.status(200).json(allTopics)
}

const getIndividual = async (req, res, next) => {
  const { id } = req.params
  try {
    const foundTopic = await TopicModel.findById(id).populate(
      'createdBy' ,
      '-password'
    )
    if (!foundTopic) {
      return res
        .status(404)  
        .json({ message: `Topic with id ${id} could not be found.` })
    }
    return res.status(200).json(foundTopic)
  } catch (error) {
    next(error)
  }
}

const post = async (req, res, next) => {
  const { body: newTopic } = req
  try {
    if (req.currentUser.role !== 'admin'){
      return res.status(401).json({ message: 'Unauthorized to create topics!' })
    }
    const createdDocument = await TopicModel.create({ ...newTopic, createdBy: req.currentUser.id, topicUser: req.currentUser.userName })
    return res.status(200).json(createdDocument)
  } catch (error) {
    next(error)
  }    
}

const update = async (req, res, next) => {
  const { id } = req.params
  const { body: updatedTopic } = req
  console.log('ciao>',{vero: updatedTopic})
  try {
    const documentToUpdate = await TopicModel.findById(id)
    if (!documentToUpdate) {
      return res.status(404).json({ message: `Topic ${id} can't be found!` })
    } 
    if(!updatedTopic.like) {
    // se non stai facendo like fai avvenire quello che viene dopo
    if (
      documentToUpdate.createdBy.toString() !== req.currentUser.id 
            && req.currentUser.role !== 'admin'
    ){
      return res
        .status(403)
        .json({ message: 'Forbidden updating this element!' })
    }
    }
    if (documentToUpdate.likedBy.indexOf(req.currentUser.id) !== -1){
      documentToUpdate.like -= 1 
      documentToUpdate.likedBy.splice(documentToUpdate.likedBy.indexOf(req.currentUser.id)-1, 1)
      await documentToUpdate.save()
      return res
      .status(200)
      .json({message: "Liked removed!"})
  }
    const updatedDocument = await TopicModel.findByIdAndUpdate(id, updatedTopic, {
      new: true,
    })
    //this function is to save the users'name who made like.
    documentToUpdate.likedBy.push(req.currentUser.id)
    await documentToUpdate.save()

    return res.status(200).json(updatedDocument)

  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  const { id } = req.params
  const { body: deleteTopic } = req
  // console.log("curent user -->", req.currentUser)
  try {
    const documentToDelete = await TopicModel.findById(id)

    if (!documentToDelete) {
      return res.status(404).json({ message: `Topic ${id} can't be found!` })
    } 
    if (
      documentToDelete.createdBy.toString() !== req.currentUser.id && req.currentUser.role !== 'admin'
    ){
      return res
        .status(403)
        .json({ message: 'Forbidden deleting this element!' })
    }
    const deleteDocument = await TopicModel.findByIdAndDelete(id, deleteTopic)
    return res.status(200).json(deleteDocument)
  } catch (error) {
    next(error)
  }
}
export default {
  getAll,
  getIndividual,
  post,
  update,
  remove,
}
