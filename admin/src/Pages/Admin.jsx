import React from 'react'
import Sidebar from '../Components/Sidebar'
import {Routes, Route} from 'react-router-dom'
import AddProduct from '../Components/AddProduct'
import ListProduct from '../Components/ListProduct'

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/> 
      <Routes>
        <Route path='/addProduct' element={<AddProduct/>} />
        <Route path='/listProduct' element={<ListProduct/>} />
      </Routes>
    </div>
  )
}

export default Admin
