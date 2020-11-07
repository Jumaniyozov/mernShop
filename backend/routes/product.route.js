import express from 'express';
import {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct, createProductReview, getTopProducts
} from "../controllers/product.controller.js";
import {isAdmin, protect} from "../middlewares/auth.middleware.js";

const router = express.Router();


router.route('/')
    .get(getProducts)
    .post(protect, isAdmin, createProduct)

router.route('/top')
    .get(getTopProducts)

router.route('/:id')
    .get(getProductById)
    .delete(protect, isAdmin, deleteProduct)
    .put(protect, isAdmin, updateProduct)

router.route('/:id/reviews')
    .post(protect,createProductReview)


export default router;
