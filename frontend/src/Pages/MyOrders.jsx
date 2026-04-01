import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:4000/orders/my", {
      headers: {
        "auth-token": token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data.orders || []);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate]);

  if (isLoading) {
    return <div className="px-6 py-10 text-center text-sm font-semibold text-slate-600">Loading orders...</div>;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">My Orders</h1>
      <p className="mt-2 text-sm text-slate-500">Track your placed orders and payment status.</p>

      <div className="mt-8 space-y-5">
        {orders.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <p className="text-lg font-semibold text-slate-800">No orders found</p>
            <p className="mt-2 text-sm text-slate-500">Your placed orders will appear here.</p>
          </div>
        )}

        {orders.map((order) => (
          <div key={order._id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">Order ID</p>
                <p className="mt-1 text-sm text-slate-700">{order._id}</p>
                <p className="mt-3 text-sm text-slate-500">
                  {new Date(order.createdAt).toLocaleString("en-IN")}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                  {order.status}
                </span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  Payment: {order.paymentStatus}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {order.items.map((item, index) => (
                <div key={`${order._id}-${index}`} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-500">Size {item.size} | Qty {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">Rs {item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2 border-t border-slate-200 pt-4 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-900">Address:</span>{" "}
                {order.address.name}, {order.address.line1}, {order.address.line2}, {order.address.city}, {order.address.state} - {order.address.pincode}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Payment Method:</span> {order.paymentMethod}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Total:</span> Rs {order.totalAmount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
