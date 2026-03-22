import React from 'react'
import {Link} from 'react-router-dom'
import add_product_icon from '../assets/Product_Cart.svg'
import list_product_icon from '../assets/Product_list_icon.svg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <link to={'/addProduct'} style={{textdecoration:'none'}} >
      <div className="sidebar-item">
        <img src={add_product_icon} alt="" />
        <p>Add Product</p>
      </div>
      </link> 
      <link to={'/listProduct'} style={{textdecoration:'none'}} >
      <div className="sidebar-item">
        <img src={list_product_icon} alt="" />
        <p> Product List</p>
      </div>
      </link> 
    </div>
  )
}

export default Sidebar
