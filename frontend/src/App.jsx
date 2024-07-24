import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Verify from './pages/auth/Verify'
import About from './pages/about/About'
import Account from './pages/account/Account'
import { UserData } from './context/UserContext'

const App = () => {
  const {isAuth} = UserData();
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/account' element={isAuth ? <Account /> : <Login />} />
      <Route path='/login' element={isAuth ? <Home/> : <Login />} />
      <Route path='/register' element={isAuth ? <Home/> : <Register />} />
      <Route path='/verify' element={isAuth ? <Home/> : <Verify />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App