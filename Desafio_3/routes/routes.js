import { Router } from "express";
import {getProductByIdController, getProductsController} from '../controllers/controller.js'

const router = Router()
router.get('/', getProductsController)
router.get('/:id', getProductByIdController)
export default router