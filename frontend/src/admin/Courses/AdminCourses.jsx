import React, { useState } from 'react'
import Layout from '../Utils/Layout'
import { useNavigate } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import CourseCard from '../../components/coursecard/CourseCard';
import './admincourses.css'

const AdminCourses = ({user}) => {
    const navigate = useNavigate();

    if(user && user.role !== 'admin')
        return navigate('/');

    const categories = ['App Development', 'Web Development', 'Game Development', 'Data Science', 'Machine Learning', 'Artificial Intelligence', 'Cybersecurity', 'Cloud Computing', 'DevOps', 'Quantum Computing', 'Internet of Things (IoT)', 'Blockchain Development', 'AR-VR Development', 'UX/UI Designing' ]

    const [title,setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [createdBy, setCreatedBy] = useState('')
    const [duration, setDuration] = useState('')
    const [image, setImage] = useState('')
    const [imagePrev, setImagePrev] = useState('')
    const [btnLoading, setBtnLoading] = useState(false)


    const {courses, fetchCourses} = CourseData();

    const changeImageHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setImagePrev(reader.result);
            setImage(file);
        }
    }

  return (
    <Layout>
        <div className="admin-courses">
            <div className="left">
                <h1>All Courses</h1>
                <div className="dashboard-content">
                    {
                        courses && courses.length > 0 ? courses.map((e)=>{
                            return <CourseCard key={e._id} course={e}/>
                        }) : <p>No Courses Yet</p>
                    }
                </div>
            </div>

            <div className="right">
                <div className="add-course">
                    <div className="course-form">
                        <h2>Add Course</h2>
                        <form>
                            <label htmlFor="text">Title</label>
                            <input type="text" value={title} onChange={()=>setTitle(e.target.value) } required />

                            <label htmlFor="text">Description</label>
                            <input type="text" value={description} onChange={()=>setDescription(e.target.value) } required />

                            <label htmlFor="text">Price</label>
                            <input type="number" value={price} onChange={()=>setPrice(e.target.value) } required />

                            <label htmlFor="text">Created By</label>
                            <input type="text" value={createdBy} onChange={()=>setCreatedBy(e.target.value) } required />

                            <select value={category} onChange={e=>setCategory(e.target.value)}>
                                <option value={''}>Select Category</option>
                                {
                                    categories.map((e)=>{
                                        <option value={e} key={e}>{e}</option>
                                    })
                                }
                            </select>

                            <label htmlFor="text">Duration</label>
                            <input type="number" value={duration} onChange={()=>setDuration(e.target.value) } required />

                            <label htmlFor="thumbnail-input">Choose Thumbnail</label>    
                            <input type="file" onChange={changeImageHandler} required/>
                            {imagePrev && <img src={imagePrev} alt='' width={300} />}

                            <button type='submit' disabled={btnLoading} className='common-btn'>
                                {btnLoading ? 'Please Wait....' : 'Add'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default AdminCourses