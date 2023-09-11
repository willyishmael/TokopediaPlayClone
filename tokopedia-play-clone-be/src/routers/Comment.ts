import express from "express"
import controller from "../controllers/Comment.js"

const router = express.Router()

router.get('/', controller.readAllComment)
router.get('/:commentId', controller.readComment)
router.get('/vi/:videoId', controller.readAllCommentByVideoId)
router.post('/create', controller.createComment)
router.patch('/update/:commentId', controller.updateComment)
router.delete('/delete/:commentId', controller.deleteComment)

export default router
