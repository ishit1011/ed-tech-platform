import React, { useEffect, useState } from 'react'
import './coursedesc.css'
import { useNavigate, useParams } from 'react-router-dom'
import { CourseData } from '../../context/CourseContext';
import { server } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserData } from '../../context/UserContext';
import Loading from '../../components/loading/Loading';

const CourseDesc = ({user}) => {
    const params = useParams(); // used to get course ID : "paramas.id"
    const navigate = useNavigate();

    const {fetchSingleCourse, course, fetchCourses, fetchMyCourse} = CourseData();
    const {fetchUser} = UserData();

    useEffect(()=>{
        fetchSingleCourse(params.id);
    },[]);

    const [loading,setLoading] = useState(false);
    const checkoutHandler = async() =>{
        const token = localStorage.getItem('token');
        setLoading(true);

        const {
            data: {order},
        } = await axios.post(`${server}/api/course/checkout/${params.id}`,{},{
            headers: {
                token,
            },
        });

        const options = {
            "key": "rzp_test_ws27nyT5bWUrp5", // Enter the Key ID generated from the Dashboard
            "amount": order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Learners", //your business name
            "description": "Learners Transaction Portal",
            // "image": "https://example.com/your_logo",
            "order_id": order.id, //This is a sample Order ID. 

            // making callback handler
            handler: async function(response){
                const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = response;

                try {
                    // payment verification
                    const {data} = await axios.post(`${server}/api/verification/${params.id}`,{
                        razorpay_order_id, razorpay_payment_id, razorpay_signature
                    },{
                        headers:{
                            token,
                        },
                    })

                    await fetchUser();
                    await fetchCourses();
                    await fetchMyCourse();
                    toast.success(data.message);
                    setLoading(false);
                    navigate(`/payment-success/${razorpay_payment_id}`)
                } catch (error) {
                    toast.error(error.response.data.message);
                    setLoading(false);
                }
            },

            theme: {
                color: '#8a4baf'
            }
        }

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    }
  return (
    <>
        {loading ? <Loading/> : 
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

                <p>{course.description}</p>
                <p>Let's get started with the course at ₹{course.price}</p>

                    {
                        user && user.subscription.includes(course._id) ? (
                            <button onClick={()=>navigate(`/course/study/${course._id}`)} className='common-btn'>Study</button>
                        ) : (
                            <button onClick={checkoutHandler} className='common-btn'>Buy Now</button>
                        )
                    }
            </div>
        )}
    </>}
    </>
  )
}

export default CourseDesc