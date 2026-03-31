import React from 'react'
import { useNavigate } from 'react-router-dom'
import navLogo from '../assets/nav-logo.svg'
import navProfile from '../assets/nav-profile.svg'

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('admin-auth-token')
    window.dispatchEvent(new Event('admin-auth-change'))
    navigate('/login')
  }

  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <img src={navLogo} alt="Shopper Admin" className="h-12 w-auto sm:h-14" />
          {/* <div>
            <p className="text-2xl font-black uppercase tracking-tight text-slate-900 sm:text-3xl">Shopper</p>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-orange-500">Admin Panel</p>
          </div> */}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm">
            <img src={navProfile} className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12" alt="Admin profile" />
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">Admin User</p>
              <p className="text-xs text-slate-500">Store management</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
