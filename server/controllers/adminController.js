import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/courseModel.js";
import { Lecture } from "../models/lectureModel.js";
import {rm, unlink} from 'fs';
import {promisify} from 'util'
import fs from 'fs'
import { User } from "../models/userModel.js";

export const createCourse = TryCatch(async(req,res)=>{
    const {title, description, category, createdBy, duration, price} = req.body;

    const image = req.file;

    await Courses.create({
        title, description, category, createdBy,image: image?.path, duration, price,
    })

    res.status(201).json({
        message: "Course Created Successfully",
    })
})

export const addLectures = TryCatch(async(req,res)=>{
    const course = await Courses.findById(req.params.id);

    if(!course){
        return res.status(404).json({
            message: "No Course with this id",
        })
    } 

    const {title, description} = req.body;

    const file = req.file;

    const lecture = await Lecture.create({
        title, description, video: file?.path, course: course._id,
    })

    res.status(201).json({
        message: "Lecture added",
        lecture, 
    })
})

export const deleteLecture = TryCatch(async(req,res)=>{
    const lecture = await Lecture.findById(req.params.id);

    // delete lecture from file storage
    rm(lecture.video, ()=>{
        console.log("Video deleted");
    })

    await lecture.deleteOne();

    res.json({
        message: 'Lecture deleted'
    })
})
 
const unlinkAsync = promisify(fs.unlink);

export const deleteCourse = TryCatch(async(req,res)=>{
    const course = await Courses.findById(req.params.id);

    const lectures = await Lecture.find({course: course._id})

    // delete all videos of the lectures in the course
    await Promise.all(
        lectures.map(async(lecture) => {
            await unlinkAsync(lecture.video);
            console.log('Video deleted');
        })
    )

    // delete all course images
    rm(course.image, ()=>{
        console.log("Image deleted");
    })

    // delete all lectures from database
    await Lecture.find({course: req.params.id}).deleteMany();

    await course.deleteOne();

    await User.updateMany({}, {$pull: {subscription: req.params.id}});

    res.status(200).json({
        message: "Course Deleted"
    })
})

export const getAllStats = TryCatch(async(req,res)=>{
    const totalCourses = (await Courses.find()).length;
    const totalLectures = (await Lecture.find()).length;
    const totalUsers = (await User.find()).length;

    const stats = {totalCourses, totalLectures, totalUsers};

    res.status(200).json({
        stats,
    })
})

export const getAllUsers = TryCatch(async(req,res)=>{
    const users = await User.find({_id:{$ne: req.user._id}}).select('-password');

    res.json({users});
})

export const updateRole = TryCatch(async(req,res)=>{
    const user = await User.findById(req.params.id)

    if(user.role === 'user'){
        user.role = 'admin';
        await user.save();

        return res.status(200).json({
            message: 'Role updated to admin'
        })
    }

    if(user.role === 'admin'){
        user.role = 'user';
        await user.save();

        return res.status(200).json({
            message: 'Role updated to user'
        })
    }
})