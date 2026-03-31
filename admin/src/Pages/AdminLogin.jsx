import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [hasAdmins, setHasAdmins] = useState(true)
  const [isChecking, setIsChecking] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [createForm, setCreateForm] = useState({ name: '', email: '', password: '' })

  useEffect(() => {
    fetch('http://localhost:4000/admin/status')
      .then((response) => response.json())
      .then((data) => {
        setHasAdmins(Boolean(data.hasAdmins))
      })
      .catch((error) => {
        console.error('Failed to check admin status:', error)
      })
      .finally(() => {
        setIsChecking(false)
      })
  }, [])

  const handleLoginChange = (e) => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCreateChange = (e) => {
    setCreateForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('http://localhost:4000/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Admin login failed')
      }

      localStorage.setItem('admin-auth-token', data.token)
      window.dispatchEvent(new Event('admin-auth-change'))
      navigate('/addProduct')
    } catch (error) {
      alert(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreateFirstAdmin = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('http://localhost:4000/admin/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createForm),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to create admin')
      }

      if (data.token) {
        localStorage.setItem('admin-auth-token', data.token)
        window.dispatchEvent(new Event('admin-auth-change'))
      }

      navigate('/addProduct')
    } catch (error) {
      alert(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-6 text-sm font-semibold text-slate-600 shadow-sm">
          Loading admin panel...
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-500">Admin Panel</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            {hasAdmins ? 'Admin Login' : 'Create First Admin'}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {hasAdmins
              ? 'Only admins can manage products and other admin accounts.'
              : 'No admin exists yet. Create the first admin account to secure this panel.'}
          </p>
        </div>

        {hasAdmins ? (
          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              name="email"
              value={loginForm.email}
              onChange={handleLoginChange}
              placeholder="Admin email"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
              required
            />
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleLoginChange}
              placeholder="Password"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-2xl bg-orange-500 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Please wait...' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleCreateFirstAdmin} className="space-y-5">
            <input
              type="text"
              name="name"
              value={createForm.name}
              onChange={handleCreateChange}
              placeholder="Admin name"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
              required
            />
            <input
              type="email"
              name="email"
              value={createForm.email}
              onChange={handleCreateChange}
              placeholder="Admin email"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
              required
            />
            <input
              type="password"
              name="password"
              value={createForm.password}
              onChange={handleCreateChange}
              placeholder="Password"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-2xl bg-orange-500 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Creating...' : 'Create Admin'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default AdminLogin
