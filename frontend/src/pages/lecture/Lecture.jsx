import React, { useEffect, useState } from 'react'
import './lecture.css'
import { useParams } from 'react-router-dom';
import { server } from '../../main';
import axios from 'axios';
import Loading from '../../components/loading/Loading';

const Lecture = ({user}) => {
    const [lectures, setLectures] = useState([]);
    const [singleLecture, setSingleLecture] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lecLoading, setLecLoading] = useState(false);
    const params = useParams();

    const [show, setShow] = useState(false);

    async function fetchLectures() {
        try {
            const {data} = await axios.get(`${server}/api/lectures/${params.id}`,{
                headers: {
                    token: localStorage.getItem('token'),
                },
            })

            setLectures(data.lectures)
            setLoading(false);
            
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    async function fetchSingleLecture(id) {
        setLecLoading(true);
        try {
            const {data} = await axios.get(`${server}/api/lecture/${id}`,{
                headers: {
                    token: localStorage.getItem('token'),
                },
            })

            setSingleLecture(data.lecture)
            setLecLoading(false);
        } catch (error) {
            console.log(error);
            setLecLoading(false);
        }
    }

    useEffect(()=>{
        fetchLectures()
    },[])


  return <>{loading ? <Loading /> : <>
    <div className="lecture-page">
        {/* Lecture video shown here */}
        <div className="left">
            {lecLoading ? <Loading /> : <>
                {
                    singleLecture.video ? <>
                    <video 
                        src={`${server}/${singleLecture.video}`} 
                        width={'100%'}
                        controls
                        controlsList='nodownload noremoteplayback'
                        disablePictureInPicture
                        disableRemotePlayback
                        autoPlay
                    ></video>
                    <h1>{singleLecture.title}</h1>
                    <h3>{singleLecture.description}</h3>
                    </> : <h1>Please Select a Lecture</h1> 
                }
                </>
            }
        </div>

        {/* List of all lectures here */}
        <div className="right">
            {user && user.role === 'admin' && (
                <button onClick={()=>setShow(!show)} className="common-btn">
                    {show ? "Close" :"Add Lecture +"}
                </button>
            )}

            {
                show && (
                    <div className="lecture-form">
                        <h2>Add Lecture</h2>

                        <form>
                            <label htmlFor="text">Title</label>
                            <input type="text" required />

                            <label htmlFor="text">Description</label>
                            <input type="text" required />

                            <input type="file" placeholder='Choose video' required />

                            <button type='submit' className="common-btn">Add</button>
                        </form>
                    </div>
                )
            }

            {
                lectures && lectures.length > 0 ? lectures.map((e,i) => (
                    <>
                        <div onClick={()=> fetchSingleLecture(e._id)} key={i} className={`lecture-number ${singleLecture._id === e._id && 'active'}`}>
                            {i+1}. {e.title}
                        </div>

                        {
                            user && user.role === 'admin' && (
                                <button style={{background:'red'}} className="common-btn">
                                    Delete {e.title}
                                </button>
                            )
                        }
                    </>
                )) : <p>No Lectures Yet</p>
            }
        </div>
    </div>
  </> }</>
};

export default Lecture