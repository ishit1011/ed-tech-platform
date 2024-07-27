import React, { useState } from 'react';
import Layout from '../Utils/Layout';
import { useNavigate } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import CourseCard from '../../components/coursecard/CourseCard';
import './admincourses.css';
import axios from 'axios';
import { server } from '../../main';
import toast from 'react-hot-toast';

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== 'admin') navigate('/');

  const categories = [
    'App Development', 'Web Development', 'Game Development', 'Data Science', 'Machine Learning', 'Artificial Intelligence', 'Cybersecurity', 'Cloud Computing', 'DevOps', 'Quantum Computing', 'Internet of Things (IoT)', 'Blockchain Development', 'AR-VR Development', 'UX/UI Designing'
  ];

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [duration, setDuration] = useState('');
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const [btnLoading, setBtnLoading] = useState(false);

  const { courses, fetchCourses } = CourseData();

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();

    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('category', category);
    myForm.append('price', price);
    myForm.append('createdBy', createdBy);
    myForm.append('duration', duration);
    myForm.append('file', image);

    try {
      const { data } = await axios.post(`${server}/api/course/new`, myForm, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });

      toast.success(data.message);

      await fetchCourses();

      // Reset form fields
      setTitle('');
      setDescription('');
      setCategory('');
      setPrice('');
      setCreatedBy('');
      setDuration('');
      setImage('');
      setImagePrev('');

    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <Layout>
      <div className="admin-courses">
        <div className="left">
          <h1>All Courses</h1>
          <div className="dashboard-content">
            {courses && courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))
            ) : (
              <p>No Courses Yet</p>
            )}
          </div>
        </div>

        <div className="right">
          <div className="add-course">
            <div className="course-form">
              <h2>Add Course</h2>
              <form onSubmit={submitHandler}>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />

                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />

                <label htmlFor="createdBy">Created By</label>
                <input
                  type="text"
                  id="createdBy"
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                  required
                />

                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option value={cat} key={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <label htmlFor="duration">Duration</label>
                <input
                  type="number"
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />

                <label htmlFor="thumbnail-input">Choose Thumbnail</label>
                <input
                  type="file"
                  id="thumbnail-input"
                  onChange={changeImageHandler}
                  required
                />
                {imagePrev && <img src={imagePrev} alt="Preview" width={300} />}

                <button type="submit" disabled={btnLoading} className="common-btn">
                  {btnLoading ? 'Please Wait....' : 'Add'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;
