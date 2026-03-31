import { useEffect, useState } from 'react'

const emptyForm = {
  name: '',
  email: '',
  password: '',
}

const AdminManagement = () => {
  const [admins, setAdmins] = useState([])
  const [currentAdmin, setCurrentAdmin] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const adminToken = localStorage.getItem('admin-auth-token')

  const fetchAdmins = async () => {
    try {
      const [meResponse, listResponse] = await Promise.all([
        fetch('http://localhost:4000/admin/me', {
          headers: { 'admin-auth-token': adminToken },
        }),
        fetch('http://localhost:4000/admin/list', {
          headers: { 'admin-auth-token': adminToken },
        }),
      ])

      const meData = await meResponse.json()
      const listData = await listResponse.json()

      if (meData.success) {
        setCurrentAdmin(meData.admin)
      }

      if (listData.success) {
        setAdmins(listData.admins)
      }
    } catch (error) {
      console.error('Failed to fetch admins:', error)
    }
  }

  useEffect(() => {
    fetchAdmins()
  }, [])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCreateAdmin = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('http://localhost:4000/admin/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'admin-auth-token': adminToken,
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to create admin')
      }

      setForm(emptyForm)
      await fetchAdmins()
    } catch (error) {
      alert(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRemoveAdmin = async (adminId) => {
    try {
      const response = await fetch('http://localhost:4000/admin/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'admin-auth-token': adminToken,
        },
        body: JSON.stringify({ adminId }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to remove admin')
      }

      await fetchAdmins()
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h1 className="text-2xl font-bold text-slate-900">Manage Admins</h1>
        <p className="mt-2 text-sm text-slate-500">
          Add more admins to manage products. Admins can remove other admins, but not themselves.
        </p>

        <form onSubmit={handleCreateAdmin} className="mt-6 grid gap-4 md:grid-cols-3">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Admin name"
            className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Admin email"
            className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-12 rounded-2xl bg-orange-500 px-6 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70 md:col-span-3 md:w-fit"
          >
            {isSubmitting ? 'Creating...' : 'Add Admin'}
          </button>
        </form>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Admin Accounts</h2>
            <p className="mt-1 text-sm text-slate-500">Current signed-in admin: {currentAdmin?.name || 'Loading...'}</p>
          </div>
        </div>

        <div className="space-y-4">
          {admins.map((admin) => {
            const isCurrentAdmin = currentAdmin?._id === admin._id

            return (
              <div
                key={admin._id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-base font-semibold text-slate-900">{admin.name}</p>
                  <p className="text-sm text-slate-500">{admin.email}</p>
                </div>

                <div className="flex items-center gap-3">
                  {isCurrentAdmin && (
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      Current Admin
                    </span>
                  )}
                  {!isCurrentAdmin && (
                    <button
                      type="button"
                      onClick={() => handleRemoveAdmin(admin._id)}
                      className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminManagement
