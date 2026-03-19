import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import cart from "../assets/cart_icon.png"
import logo from "../assets/logo.png"
import { ShopContext } from "../../Context/ShopContext"

const Navbar = () => {

  const [menu, setMenu] = useState("shop")
  const{getTotalCartItems} =  useContext(ShopContext)

  return (
    <div className="sticky top-0 bg-white shadow-md z-50 flex items-center justify-between px-12 py-4 bg-white shadow">

      {/* Logo */}
      <div className="flex items-center gap-3 cursor-pointer">
        <img src={logo} alt="logo" className="w-10 h-10" />
        <p className="text-2xl font-bold text-gray-800 tracking-wide">
          ShopSphere
        </p>
      </div>

      {/* Menu */}
      <ul className="flex gap-10 text-lg font-medium text-gray-700">

        <li
          onClick={() => setMenu("shop")}
          className="cursor-pointer flex flex-col items-center hover:text-orange-500 transition"
        >
          <Link to="/">Shop</Link>
          {menu === "shop" && (
            <hr className="w-full border-2 border-orange-500 rounded mt-1" />
          )}
        </li>

        <li
          onClick={() => setMenu("mens")}
          className="cursor-pointer flex flex-col items-center hover:text-orange-500 transition"
        >
          <Link to="/mens">Mens</Link>
          {menu === "mens" && (
            <hr className="w-full border-2 border-orange-500 rounded mt-1" />
          )}
        </li>

        <li
          onClick={() => setMenu("womens")}
          className="cursor-pointer flex flex-col items-center hover:text-orange-500 transition"
        >
          <Link to="/womens">Womens</Link>
          {menu === "womens" && (
            <hr className="w-full border-2 border-orange-500 rounded mt-1" />
          )}
        </li>

        <li
          onClick={() => setMenu("kids")}
          className="cursor-pointer flex flex-col items-center hover:text-orange-500 transition"
        >
          <Link to="/kids">Kids</Link>
          {menu === "kids" && (
            <hr className="w-full border-2 border-orange-500 rounded mt-1" />
          )}
        </li>

      </ul>

      {/* Login + Cart */}
      <div className="flex items-center gap-6">

        <Link to="/login">
          <button className="px-6 py-2 border border-gray-400 rounded-full hover:bg-gray-100 transition">
            Login
          </button>
        </Link>

        <Link to="/cart" className="relative">
          <img src={cart} alt="cart" className="w-8 cursor-pointer" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {getTotalCartItems()}
          </span>
        </Link>

      </div>

    </div>
  )
}

export default Navbar