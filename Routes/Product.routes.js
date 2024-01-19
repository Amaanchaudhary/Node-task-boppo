import Router from 'express'
import { addProduct , getSingleProduct , updateProduct , deleteProduct , getAllproducts , addMultipleProducts} from '../Controllers/Product.controllers.js';

const router = Router();

router.post("/add", addProduct)
router.get("/:getByHandle", getSingleProduct)
router.put("/update/:productId", updateProduct)
router.delete("/delete/:productId", deleteProduct)
router.get("/products/all", getAllproducts)
router.post("/addproducts", addMultipleProducts )


export default router;