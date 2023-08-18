import express from "express"
import controller from "../controllers/Product.js"

const router = express.Router()

router.get('/', controller.readAllProduct)
router.get('/:productId', controller.readProduct)
router.post('/create', controller.createProduct)
router.patch('/update/:productId', controller.updateProduct)
router.delete('/delete/:productId', controller.deleteProduct)

export default router
