import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";


const Checkout = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, clearCart } = useContext(ShopContext);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [isAddressConfirmed, setIsAddressConfirmed] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [address, setAddress] = useState({
    name: "Saurabh Kumar",
    phone: "+91 98765 43210",
    line1: "221B Baker Street",
    line2: "Near Central Park",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700001",
  });

  const totalAmount = useMemo(() => getTotalCartAmount(), [getTotalCartAmount]);

  const fullAddress = `${address.line1}, ${address.line2}, ${address.city}, ${address.state} - ${address.pincode}`;

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem('auth-token');

    if (!token) {
      alert('Please login first to place your order.');
      navigate('/login');
      return;
    }

    if (totalAmount <= 0) {
      alert('Your cart is empty.');
      return;
    }

    if (paymentMethod === 'online') {
      // alert('Online payment will be handled by your payment integration. Order will be placed only after successful online payment.');
      navigate(`/payment/${totalAmount}`)
      // return;
    }

    setIsPlacingOrder(true);

    try {
      const response = await fetch('http://localhost:4000/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify({
          address,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to place order');
      }

      clearCart();
      navigate(`/order-success/${data.orderId}`);
    } catch (error) {
      console.error('Checkout failed:', error);
      alert(error.message || 'Unable to place order');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
      <p className="mt-2 text-sm text-slate-600">
        Confirm your delivery address and choose a payment method.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-slate-900">Delivery Address</h2>
              <button
                type="button"
                onClick={() => {
                  setIsEditingAddress((prev) => !prev);
                  setIsAddressConfirmed(false);
                }}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                {isEditingAddress ? "Cancel" : "Change Address"}
              </button>
            </div>

            {!isEditingAddress ? (
              <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                <p className="text-base font-semibold text-slate-900">{address.name}</p>
                <p className="mt-1">{fullAddress}</p>
                <p className="mt-1">Phone: {address.phone}</p>
                {isAddressConfirmed && (
                  <p className="mt-3 text-sm font-medium text-emerald-700">Address confirmed successfully.</p>
                )}
              </div>
            ) : (
              <div className="mt-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    value={address.name}
                    onChange={(e) => setAddress((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Full Name"
                    className="h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
                  />
                  <input
                    type="text"
                    value={address.phone}
                    onChange={(e) => setAddress((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="Phone Number"
                    className="h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
                  />
                  <input
                    type="text"
                    value={address.line1}
                    onChange={(e) => setAddress((prev) => ({ ...prev, line1: e.target.value }))}
                    placeholder="Address Line 1"
                    className="h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-slate-400 sm:col-span-2"
                  />
                  <input
                    type="text"
                    value={address.line2}
                    onChange={(e) => setAddress((prev) => ({ ...prev, line2: e.target.value }))}
                    placeholder="Address Line 2"
                    className="h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-slate-400 sm:col-span-2"
                  />
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress((prev) => ({ ...prev, city: e.target.value }))}
                    placeholder="City"
                    className="h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
                  />
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress((prev) => ({ ...prev, state: e.target.value }))}
                    placeholder="State"
                    className="h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
                  />
                  <input
                    type="text"
                    value={address.pincode}
                    onChange={(e) => setAddress((prev) => ({ ...prev, pincode: e.target.value }))}
                    placeholder="Pincode"
                    className="h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-slate-400 sm:col-span-2"
                  />
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddressConfirmed(true);
                      setIsEditingAddress(false);
                    }}
                    className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Confirm Address
                  </button>
                </div>
              </div>
            )}
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Payment Method</h2>
            <div className="mt-4 space-y-3">
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 accent-orange-500"
                />
                <span className="text-sm font-medium text-slate-800">Pay Online</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 accent-orange-500"
                />
                <span className="text-sm font-medium text-slate-800">Cash on Delivery (COD)</span>
              </label>
            </div>
          </section>
        </div>

        <div className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Order Summary</h2>
          <div className="mt-6 space-y-4 text-sm">
            <div className="flex items-center justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">Rs {totalAmount}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Shipping</span>
              <span className="font-semibold text-emerald-600">Free</span>
            </div>
            <hr className="border-slate-200" />
            <div className="flex items-center justify-between text-base font-bold text-slate-900">
              <span>Total</span>
              <span>Rs {totalAmount}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={isPlacingOrder}
            className="mt-6 w-full rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-600"
          >
            {isPlacingOrder
              ? 'Placing Order...'
              : `Place Order (${paymentMethod === "online" ? "Pay Online" : "COD"})`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
