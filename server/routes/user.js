import express from 'express';
import { forgotPass, loginUser, myProfile, register, resetPassword, verifyUser } from '../controllers/userControllers.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

router.post("/user/register", register);
router.post("/user/verify", verifyUser);
router.post("/user/login",loginUser);
router.get("/user/me", isAuth, myProfile);
router.post('/user/forgot', forgotPass);
router.post('/user/reset', resetPassword);

export default router; 