import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import cross_icon from '../assets/cross_icon.png'

const ListProduct = () => {

  const [allproducts, setAllProducts] = useState([])

  const fetchInfo = async()=>{
    await fetch('http://localhost:4000/product/allproducts')
    .then((res)=> res.json())
    .then((data)=>{setAllProducts(data)});
  }

  useEffect(()=>{
    fetchInfo();
  },[])

  const remove_product = async (id)=>{
  const adminToken = localStorage.getItem('admin-auth-token')
  await fetch('http://localhost:4000/product/removeproduct',{
    method:'POST',
    headers:{
      'Accept':'application/json',
      'admin-auth-token': adminToken,
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({id:id})
  });
  await fetchInfo();
  }

  return (
    <div className="mx-auto w-full max-w-7xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-bold text-slate-900">All Products List</h1>
        <p className="text-sm text-slate-500">Manage your catalog, review pricing, and remove outdated products.</p>
      </div>

      <div className="mt-6 hidden grid-cols-[0.7fr_1.8fr_1fr_1fr_1fr_0.6fr] items-center gap-4 rounded-2xl bg-slate-100 px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 md:grid">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p className="text-center">Remove</p>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {allproducts.map((product, index) => {
          return (
            <React.Fragment key={product.id || index}>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white md:grid md:grid-cols-[0.7fr_1.8fr_1fr_1fr_1fr_0.6fr] md:items-center md:gap-4 md:p-5">
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-20 w-16 rounded-xl border border-slate-200 bg-white object-cover p-1"
                  />
                  <div className="md:hidden">
                    <p className="text-base font-semibold text-slate-900">{product.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{product.category}</p>
                  </div>
                </div>

                <p className="hidden text-sm font-semibold text-slate-900 md:block">{product.name}</p>
                <p className="mt-4 text-sm text-slate-500 md:mt-0">Rs {product.old_price}</p>
                <p className="mt-2 text-sm font-semibold text-emerald-600 md:mt-0">Rs {product.new_price}</p>
                <div className="mt-3 md:mt-0">
                  <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700">
                    {product.category}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => remove_product(product.id)}
                  className="mt-4 flex h-10 w-10 items-center justify-center rounded-full border border-red-100 bg-red-50 transition hover:bg-red-100 md:mt-0 md:justify-self-center"
                >
                  <img
                    className="h-4 w-4"
                    src={cross_icon}
                    alt="remove"
                  />
                </button>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  )
}

export default ListProduct
