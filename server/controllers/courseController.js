import { instance } from "../index.js";
import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/courseModel.js";
import { Lecture } from "../models/lectureModel.js";
import { User } from "../models/userModel.js";
import crypto from 'crypto';
import {Payment} from '../models/paymentModel.js'

export const getAllCourses = TryCatch(async(req,res)=>{
    const courses = await Courses.find();

    res.json({
        courses,
    })
})

export const getSingleCourse = TryCatch(async(req,res)=>{
    const course = await Courses.findById(req.params.id);

    res.json({
        course,
    })
})

export const fetchLectures = TryCatch(async(req, res) =>{
    const lectures = await Lecture.find({
        course: req.params.id
    })

    const user = await User.findById(req.user._id);

    if(user.role === "admin"){
        return res.json({
            lectures
        })
    }

    if(!user.subscription.includes(req.params.id)){
        return res.status(400).json({
            message: "You haven't subscribed to this course"
        })
    }

    res.status(200).json({
        lectures
    })
})

export const fetchSingleLecture = TryCatch(async(req,res)=>{
    const lecture = await Lecture.findById(req.params.id);

    const user = await User.findById(req.user._id);

    if(user.role === "admin"){
        return res.json({
            lecture
        })
    }

    if(!user.subscription.includes(req.params.id)){
        return res.status(400).json({
            message: "You haven't subscribed to this course"
        })
    }

    res.status(200).json({
        lecture
    })
})

export const getMyCourses = TryCatch(async(req,res)=>{
    const courses = await Courses.find({
        _id: req.user.subscription
    })

    res.status(200).json({
        courses,
    })
})

export const checkout = TryCatch(async(req,res)=>{
    const user = await User.findById(req.user._id);

    const course = await Courses.findById(req.params.id);

    if(user.subscription.includes(course.id)){
        return res.status(400).json({
            message: "You alreasy have this course",
        })
    }

    const options = {
        amount: Number(course.price * 100),
        currency: "INR",
    }

    const order = await instance.orders.create(options);
    console.log('Order created: ', order); // Log the order

    res.status(201).json({
        order,course,
    })
})

export const paymentVerification = TryCatch(async(req,res)=>{
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac("sha256", process.env.Razorpay_Secret).update(body).digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if(isAuthentic){
        await Payment.create({
            razorpay_order_id,
            razorpay_signature,
            razorpay_payment_id,
        })

        const user = await User.findById(req.user._id);

        const course = await Courses.findById(req.params.id);

        user.subscription.push(course._id);

        await user.save();

        res.status(200).json({
            message: "You have successfully purchased the course"
        })
    } else{
        return res.status(400).json({
            message: "Payment Failed",
        })
    }

})


