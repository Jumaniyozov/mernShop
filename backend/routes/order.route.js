import express from 'express';
import {isAdmin, protect} from "../middlewares/auth.middleware.js";
import {
    addOrderItems,
    getOrderById,
    getOrders,
    getUserOrders, updateOrderToDelivered,
    updateOrderToPaid
} from "../controllers/order.controller.js";

const router = express.Router();


router.route('/')
    .get(protect, isAdmin, getOrders)
    .post(protect, addOrderItems)

router.route('/myorders')
    .get(protect, getUserOrders)

router.route('/:id')
    .get(protect, getOrderById)

router.route('/:id/pay')
    .put(protect, updateOrderToPaid)

router.route('/:id/deliver')
    .put(protect, updateOrderToDelivered)


export default router;
