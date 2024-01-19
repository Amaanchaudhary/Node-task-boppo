import Router from 'express'
import { addCategory,  getAllCategory } from '../Controllers/Category.controllers.js';

const router = Router();

router.post("/add" , addCategory)
router.get("/all" , getAllCategory)

export default router;