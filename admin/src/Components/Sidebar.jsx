import React from 'react'
import { NavLink } from 'react-router-dom'
import add_product_icon from '../assets/Product_Cart.svg'
import list_product_icon from '../assets/Product_list_icon.svg'

const Sidebar = () => {
  const navItemClass = ({ isActive }) =>
    `flex items-center gap-4 rounded-2xl border px-4 py-3 transition ${
      isActive
        ? 'border-orange-200 bg-orange-50 text-orange-600 shadow-sm'
        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
    }`

  return (
    <aside className="w-full lg:w-72">
      <div className="sticky top-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="px-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Navigation</p>

        <div className="mt-4 flex flex-col gap-3">
          <NavLink to="/addProduct" className={navItemClass}>
            <img src={add_product_icon} alt="" className="h-8 w-8" />
            <div>
              <p className="text-sm font-semibold">Add Product</p>
              <p className="text-xs text-slate-500">Create a new catalog item</p>
            </div>
          </NavLink>

          <NavLink to="/listProduct" className={navItemClass}>
            <img src={list_product_icon} alt="" className="h-8 w-8" />
            <div>
              <p className="text-sm font-semibold">Product List</p>
              <p className="text-xs text-slate-500">View and remove products</p>
            </div>
          </NavLink>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
