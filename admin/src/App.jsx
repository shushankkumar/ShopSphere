import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminProtectedRoute from './Components/AdminProtectedRoute'
import Admin from './Pages/Admin'
import AdminLogin from './Pages/AdminLogin'
import Navbar from './Components/Navbar'

const App = () => {
  return ( 
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route
        path="/*"
        element={
          <AdminProtectedRoute>
            <div>
              <Navbar />
              <Admin />
            </div>
          </AdminProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
 
