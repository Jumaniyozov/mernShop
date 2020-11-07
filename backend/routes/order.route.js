import express from 'express';
import {protect} from "../middlewares/auth.middleware.js";
import {addOrderItems, getOrderById, getUserOrders, updateOrderToPaid} from "../controllers/order.controller.js";

const router = express.Router();


router.route('/')
    .post(protect, addOrderItems);

router.route('/myorders')
    .get(protect, getUserOrders);

router.route('/:id')
    .get(protect, getOrderById)

router.route('/:id/pay')
    .put(protect, updateOrderToPaid)


export default router;
