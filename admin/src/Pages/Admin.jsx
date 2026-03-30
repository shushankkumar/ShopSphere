import React from 'react'
import Sidebar from '../Components/Sidebar'
import { Navigate, Route, Routes } from 'react-router-dom'
import AddProduct from '../Components/AddProduct'
import ListProduct from '../Components/ListProduct'

const Admin = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/addProduct" replace />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/listProduct" element={<ListProduct />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default Admin
