import topicController from './controllers/topicController.js'
import commentController from './controllers/commentController.js'
import userController from './controllers/userController.js'
import express from 'express'
import auth from './middleware/auth.js'

const router = express.Router()

router.route('/').get((req, res) => res.status(200).send('API is running'))

router
  .route('/topic')
  .get(topicController.getAll)
  .post(auth, topicController.post)

router
  .route('/topic/:id')
  .get(topicController.getIndividual)
  .put(auth, topicController.update)
  .delete(auth, topicController.remove)

router.route('/register').post(userController.register)
router.route('/login').post(userController.login)
router.route('/comment/:topicId')
  .get(commentController.getAll)
  .post(auth, commentController.create)
router.route('/comment/:topicId/:commentId')
  .put(auth, commentController.update)
  .delete(auth, commentController.remove)

router.route('/highest-comment').get(topicController.highestComment)
router.route('/most-likes').get(topicController.mostLikes)

export default router