import moviesController from "./controller/topicController.js";
import express from "express";

const router = express.Router

router.route("/").get((req, res) => res.status(200).send("API is running"));

router
    .route("/topic")
    .get(topic.getAll)
    .post(topicController.post);

router
    .route("/topic/:id")
    .get(topicController.getIndividual)
    .put(topicController.update)
    .delete(topicController.remove);

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/comment/:topicId").post(commentController.create)
router.route("/comment/:topicId/:commentId")
.put(commentController.update)
.delete(commentController.remove);

export default router