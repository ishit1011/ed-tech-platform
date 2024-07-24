import React, { useEffect } from 'react'
import './coursedesc.css'
import { useNavigate, useParams } from 'react-router-dom'
import { CourseData } from '../../context/CourseContext';
import { server } from '../../main';

const CourseDesc = ({user}) => {
    const params = useParams(); // used to get course ID : "paramas.id"
    const navigate = useNavigate();

    const {fetchSingleCourse, course} = CourseData();

    useEffect(()=>{
        fetchSingleCourse(params.id);
    },[]);
  return (
    <>
        {course && (
            <div className="course-description">
                <div className="course-header">
                    <img src={`${server}/${course.image}`} alt="" className='course-image' />

                    <div className="course-info">
                        <h2>{course.title}</h2>
                        <p>Instructor: {course.createdBy}</p>
                        <p>Duration: {course.duration} weeks</p>
                    </div>
                </div>
                <p>Let's get started with the course at ₹{course.price}</p>

                    {
                        user && user.subscription.includes(course._id) ? (
                            <button onClick={()=>navigate(`/course/study/${course._id}`)} className='common-btn'>Study</button>
                        ) : (
                            <button className='common-btn'>Buy Now</button>
                        )
                    }
            </div>
        )}
    </>
  )
}

export default CourseDesc