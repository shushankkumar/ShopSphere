import { Navigate } from 'react-router-dom'

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('admin-auth-token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default AdminProtectedRoute
