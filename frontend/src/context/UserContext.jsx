import {createContext, useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { server } from '../main';
import toast, { Toaster } from 'react-hot-toast'

const UserContext = createContext();

export const UserContextProvider = ({children}) => {

    const [user, setUser] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [loading, setLoading] = useState(true);

    async function loginUser(email, password, navigate){
        setBtnLoading(true);
        try {
            // Import backend data --> from backend server
            const {data} = await axios.post(`${server}/api/user/login`,{email,password,});

            toast.success(data.message);
            localStorage.setItem('token', data.token);
            setUser(data.user);
            setIsAuth(true)
            setBtnLoading(false);
            navigate("/")
        } catch (error) {
            setBtnLoading(false)
            setIsAuth(false);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An error occurred. Please try again.');
            }
            console.error('Login error:', error); // Log the error for debugging purposes
        }
    }

    async function registerUser(name, email, password, navigate){
        setBtnLoading(true);
        try {
            // Import backend data --> from backend server
            const {data} = await axios.post(`${server}/api/user/register`,{name,email,password,});

            toast.success(data.message);
            localStorage.setItem('activationToken', data.activationToken);
            setBtnLoading(false);
            navigate("/verify")
        } catch (error) {
            setBtnLoading(false)
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An error occurred. Please try again.');
            }
            console.error('Register error:', error); // Log the error for debugging purposes
        }
    }

    async function verifyOtp(otp, navigate){
        setBtnLoading(true);
        const activationToken = localStorage.getItem('activationToken');

        try {
            const {data} = await axios.post(`${server}/api/user/verify`,{otp, activationToken});
            toast.success(data.message);
            navigate('/login');
            localStorage.clear();
            setBtnLoading(false);
        } catch (error) {
            setBtnLoading(false);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An error occurred. Please try again.');
            }
            console.error('Register error:', error); // Log the error for debugging purposes
        }
    }

    async function fetchUser() {
        try {
            const {data} = await axios.get(`${server}/api/user/me`, {
                headers: {
                    token: localStorage.getItem('token'),
                }
            })

            setIsAuth(true);
            setUser(data.user);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    

    useEffect(()=>{
        fetchUser()
    },[]);

    return (
    <UserContext.Provider value={{ user, setUser, setIsAuth, isAuth, loginUser, btnLoading, loading, registerUser, verifyOtp}}>
        {children}
        <Toaster />
    </UserContext.Provider>)
}

export const UserData = () => useContext(UserContext);