import TopicModel from "../models/topic.js";

const getAll = async (req, res) => {
  const allTopics = await TopicModel.find().sort({ createdAt: -1 });
  return res.status(200).json(allTopics);
};

const latestTopic = async (req, res) => {
  const allTopics = await TopicModel.find().sort({ createdAt: -1 }).limit(1);
  return res.status(200).json(allTopics);
};

const highestComment = async (req, res) => {
  const allTopics = await TopicModel.find()
    .sort({ numberOfComments: -1 })
    .limit(1);
  return res.status(200).json(allTopics);
};

const mostLikes = async (req, res) => {
  const allTopics = await TopicModel.find().sort({ like: -1 }).limit(1);
  return res.status(200).json(allTopics);
};

const getIndividual = async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundTopic = await TopicModel.findById(id).populate(
      "createdBy",
      "-password"
    );
    if (!foundTopic) {
      return res
        .status(404)
        .json({ message: `Topic with id ${id} could not be found.` });
    }
    return res.status(200).json(foundTopic);
  } catch (error) {
    next(error);
  }
};

const post = async (req, res, next) => {
  const { body: newTopic } = req;
  try {
    if (req.currentUser.role !== "admin" && req.currentUser.role !== "user") {
      return res
        .status(401)
        .json({ message: "Unauthorized to create topics!" });
    }
    const createdDocument = await TopicModel.create({
      ...newTopic,
      createdBy: req.currentUser.id,
      topicUser: req.currentUser.userName,
    });

    return res.status(200).json(createdDocument);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { reaction, topic, description, imageUrl } = req.body;
  const userId = req.currentUser.id;

  try {
    const doc = await TopicModel.findById(id);
    if (!doc) {
      return res.status(404).json({ message: `Topic ${id} can't be found!` });
    }

    if (reaction !== undefined) {
      // reaction update flow
      doc.likedBy = doc.likedBy.filter((u) => u.toString() !== userId);
      doc.dislikeBy = doc.dislikeBy.filter((u) => u.toString() !== userId);

      if (reaction === "like") {
        doc.likedBy.push(userId);
      } else if (reaction === "dislike") {
        doc.dislikeBy.push(userId);
      }

      doc.like = doc.likedBy.length;
      doc.dislike = doc.dislikeBy.length;
    } else {
      // normal field update flow
      if (topic !== undefined) doc.topic = topic;
      if (description !== undefined) doc.description = description;
      if (imageUrl !== undefined) doc.imageUrl = imageUrl;
    }

    await doc.save();
    return res.status(200).json(doc);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  const { body: deleteTopic } = req;
  try {
    const documentToDelete = await TopicModel.findById(id);

    if (!documentToDelete) {
      return res.status(404).json({ message: `Topic ${id} can't be found!` });
    }
    if (
      documentToDelete.createdBy.toString() !== req.currentUser.id &&
      req.currentUser.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Forbidden deleting this element!" });
    }
    const deleteDocument = await TopicModel.findByIdAndDelete(id, deleteTopic);
    return res.status(200).json(deleteDocument);
  } catch (error) {
    next(error);
  }
};
export default {
  getAll,
  getIndividual,
  post,
  update,
  remove,
  latestTopic,
  highestComment,
  mostLikes,
};
