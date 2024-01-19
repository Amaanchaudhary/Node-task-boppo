import Router from "express";
import CategoryRoutes from './Category.routes.js'
import ProductRoutes from './Product.routes.js'

const router = Router();

router.use("/category" , CategoryRoutes)
router.use("/product" , ProductRoutes)


export default router
