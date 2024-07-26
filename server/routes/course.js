import express from 'express'
import { checkout, fetchLectures, fetchSingleLecture, getAllCourses, getMyCourses, getSingleCourse, paymentVerification } from '../controllers/courseController.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

router.get('/course/all', getAllCourses);
router.get('/course/:id', getSingleCourse);
router.get("/lectures/:id", isAuth, fetchLectures); 
router.get("/lecture/:id", isAuth, fetchSingleLecture); 
router.get('/mycourse', isAuth, getMyCourses);
router.post('/course/checkout/:id', isAuth, checkout);
router.post('/verification/:id', isAuth, paymentVerification);

export default router; 