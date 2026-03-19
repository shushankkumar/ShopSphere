import React from 'react'
import navlogo from '../assets/nav-logo.svg'
import navProfile from '../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div>
      <img src={navlogo} alt="" className="nav-logo" />
      <img src={navProfile}  className='navProfile' alt="" />
    </div>
  )
}

export default Navbar
