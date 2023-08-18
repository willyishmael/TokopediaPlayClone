import express from "express"
import controller from "../controllers/Video.js"

const router = express.Router()

router.get('/', controller.readAllVideo)
router.get('/:videoId', controller.readVideo)
router.post('/create', controller.createVideo)
router.patch('/update/:videoId', controller.updateVideo)
router.delete('/delete/:videoId', controller.deleteVideo)

export default router
