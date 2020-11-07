import express from 'express';
import {
    authUser,
    deleteUser,
    getAllUsers, getUserById,
    getUserProfile,
    registUser, updateUser,
    updateUserProfile
} from "../controllers/user.controller.js";
import {isAdmin, protect} from "../middlewares/auth.middleware.js";

const router = express.Router();


router.route('/')
    .get(protect, isAdmin, getAllUsers)
    .post(registUser)

router.route('/login')
    .post(authUser)

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)


router.route('/:id')
    .get(protect, isAdmin, getUserById)
    .put(protect, isAdmin, updateUser)
    .delete(protect, isAdmin, deleteUser)

export default router;
