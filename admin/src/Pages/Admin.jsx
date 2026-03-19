import React from 'react'
import Sidebar from '../Components/Sidebar'
import {Link} from 'react-router-dom'
//import add_product_icon from '../../assests/Product_Cart.svg'

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <link to={'/addProduct'} style={{textdecoration:'none'}} >
      <div className="sidebar-item">

      </div>
      </link>  
    </div>
  )
}

export default Admin
