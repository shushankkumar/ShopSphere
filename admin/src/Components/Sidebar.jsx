import React from 'react'
import {Link} from 'react-router-dom'
import add_product_icon from '../assets/Product_Cart.svg'
import list_product_icon from '../assets/Product_list_icon.svg'

const Sidebar = () => {
  return (
    <div className='sidebar'>

      <div className="sidebar-item">
        <img src={add_product_icon} alt="" />
      <Link to={'/addProduct'} style={{textDecoration:'none'}} >
        <p>Add Product</p>
      </Link> 
      </div>


      <div className="sidebar-item">
        <img src={list_product_icon} alt="" />
      <Link to={'/listProduct'} style={{textDecoration:'none'}} >
        <p> Product List</p>
      </Link> 
      </div>
    </div>
  )
}

export default Sidebar

