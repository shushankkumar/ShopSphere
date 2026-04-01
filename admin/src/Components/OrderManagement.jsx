import { useEffect, useState } from 'react'

const ORDER_STATUSES = ['placed', 'processing', 'shipped', 'delivered', 'cancelled']
const PAYMENT_STATUSES = ['pending', 'paid', 'failed']

const OrderManagement = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const adminToken = localStorage.getItem('admin-auth-token')

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:4000/admin/orders', {
        headers: {
          'admin-auth-token': adminToken,
        },
      })

      const data = await response.json()

      if (data.success) {
        setOrders(data.orders || [])
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const updateOrder = async (orderId, updates) => {
    try {
      const response = await fetch('http://localhost:4000/admin/orders/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'admin-auth-token': adminToken,
        },
        body: JSON.stringify({ orderId, ...updates }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to update order')
      }

      await fetchOrders()
    } catch (error) {
      alert(error.message)
    }
  }

  if (isLoading) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm font-semibold text-slate-600 shadow-sm">Loading orders...</div>
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h1 className="text-2xl font-bold text-slate-900">Order Management</h1>
      <p className="mt-2 text-sm text-slate-500">Review customer orders, payment status, and delivery progress.</p>

      <div className="mt-8 space-y-5">
        {orders.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <p className="text-lg font-semibold text-slate-800">No orders found</p>
          </div>
        )}

        {orders.map((order) => (
          <div key={order._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-500">Order</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{order._id}</p>
                <p className="mt-1 text-sm text-slate-500">{new Date(order.createdAt).toLocaleString('en-IN')}</p>
                <p className="mt-3 text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">Customer:</span> {order.address?.name}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">Phone:</span> {order.address?.phone}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <select
                  value={order.status}
                  onChange={(e) => updateOrder(order._id, { status: e.target.value })}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-orange-400"
                >
                  {ORDER_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <select
                  value={order.paymentStatus}
                  onChange={(e) => updateOrder(order._id, { paymentStatus: e.target.value })}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-orange-400"
                >
                  {PAYMENT_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {order.items.map((item, index) => (
                <div key={`${order._id}-${index}`} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-500">Size {item.size} | Qty {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">Rs {item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-slate-200 pt-4 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-900">Address:</span>{" "}
                {order.address?.line1}, {order.address?.line2}, {order.address?.city}, {order.address?.state} - {order.address?.pincode}
              </p>
              <p className="mt-2">
                <span className="font-semibold text-slate-900">Payment Method:</span> {order.paymentMethod}
              </p>
              <p className="mt-2">
                <span className="font-semibold text-slate-900">Total:</span> Rs {order.totalAmount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderManagement
