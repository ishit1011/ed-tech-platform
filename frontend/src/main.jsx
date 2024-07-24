import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { UserContextProvider } from './context/UserContext.jsx'
import { CourseContextProvider } from './context/CourseContext.jsx'

export const server = 'http://localhost:5000' // backend server PORT

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <CourseContextProvider>
        <App />
      </CourseContextProvider>
    </UserContextProvider>
  </React.StrictMode>
)
