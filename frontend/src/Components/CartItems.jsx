import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../assets/cart_cross_icon.png'

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext)
  const cartEntries = []

  all_product.forEach((product) => {
    const productSizes = cartItems[product.id]

    if (!productSizes) {
      return
    }

    Object.entries(productSizes).forEach(([size, quantity]) => {
      if (quantity > 0) {
        cartEntries.push({ product, size, quantity })
      }
    })
  })

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="hidden items-center gap-4 rounded-2xl bg-slate-100 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-slate-600 md:grid md:grid-cols-[0.9fr_1.6fr_1fr_1fr_1fr_1fr_0.6fr]">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Size</p>
        <p>Quantity</p>
        <p>Total</p>
        <p className="text-center">Remove</p>
      </div>

      {cartEntries.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <p className="text-lg font-semibold text-slate-800">Your cart is empty</p>
          <p className="mt-2 text-sm text-slate-500">Add a product with a size and it will stay saved even after refresh.</p>
        </div>
      )}

      {cartEntries.map(({ product, size, quantity }) => (
        <div key={`${product.id}-${size}`} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:px-6 md:py-5">
          <div className="grid gap-4 md:grid-cols-[0.9fr_1.6fr_1fr_1fr_1fr_1fr_0.6fr] md:items-center">
            <div className="flex items-center gap-4">
              <img src={product.image} alt={product.name} className="h-24 w-20 rounded-2xl bg-slate-100 p-2 object-cover" />
              <div className="md:hidden">
                <p className="text-base font-semibold text-slate-900">{product.name}</p>
                <p className="mt-1 text-sm text-slate-500">Rs {product.new_price}</p>
                <p className="mt-2 inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700">
                  Size {size}
                </p>
              </div>
            </div>
            <p className="hidden text-base font-semibold text-slate-900 md:block">{product.name}</p>
            <p className="text-sm font-medium text-slate-600 md:text-base">Rs {product.new_price}</p>
            <div className="w-fit rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm">
              {size}
            </div>
            <button className="w-fit rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              {quantity}
            </button>
            <p className="text-sm font-semibold text-slate-900 md:text-base">Rs {product.new_price * quantity}</p>
            <button
              type="button"
              onClick={() => {
                removeFromCart(product.id, size)
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-red-100 bg-red-50 transition hover:bg-red-100 md:justify-self-center" >
              <img src={remove_icon} alt="Remove item" className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}

      <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div className="order-2 rounded-3xl border border-slate-200 bg-slate-50 p-6 lg:order-1">
          <p className="text-sm text-slate-600">If you have a promo code, enter it here</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Promo code"
              className="h-12 flex-1 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-slate-400"
            />
            <button className="h-12 rounded-2xl bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-700">
              Submit
            </button>
          </div>
        </div>

        <div className="order-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:order-2">
          <h1 className="text-2xl font-bold text-slate-900">Cart Totals</h1>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <p>Subtotal</p>
              <p className="font-semibold text-slate-900">Rs {getTotalCartAmount()}</p>
            </div>
            <hr className="border-slate-200" />
            <div className="flex items-center justify-between text-sm text-slate-600">
              <p>Shipping Fee</p>
              <p className="font-semibold text-emerald-600">Free</p>
            </div>
            <hr className="border-slate-200" />
            <div className="flex items-center justify-between text-base font-bold text-slate-900">
              <h3>Total</h3>
              <h3>Rs {getTotalCartAmount()}</h3>
            </div>
          </div>
          <button className="mt-6 w-full rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-600">
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItems
