import express from 'express';
import {authUser, getAllUsers, getUserProfile, registUser, updateUserProfile} from "../controllers/user.controller.js";
import {isAdmin, protect} from "../middlewares/auth.middleware.js";

const router = express.Router();


router.route('/')
    .get(protect, isAdmin, getAllUsers)
    .post(registUser);

router.route('/login')
    .post(authUser)

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);


export default router;
