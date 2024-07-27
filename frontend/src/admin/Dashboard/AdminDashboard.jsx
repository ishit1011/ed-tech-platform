import React from 'react'
import Layout from '../Utils/Layout'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = ({user}) => {
    const navigate = useNavigate();

    if(user && user.role !== 'admin')
        return navigate('/');
    
  return (
    <div>
        <Layout>
            Admin Dashboard
        </Layout>
    </div>
  )
}

export default AdminDashboard