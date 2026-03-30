import React, { useState } from 'react'
import upload_area from '../assets/upload_area.svg'


const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    imageUrl: "",
    category: "women",
    old_price: "",
    new_price: ""

  })

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
  }


  const Add_Product = async () => {
 
      let responseData;
      let formData = new FormData();
      formData.append('product', image);

      try {
        // 1. Upload the image
        const uploadResponse = await fetch('http://localhost:4000/upload-image', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        });

        responseData = await uploadResponse.json();

        if (responseData.success) {
          // 2. Prepare the final product object
          // DON'T rely on productDetails here because setProductDetails is slow.
          // Use the existing state + the new image URL from the response.
          const product = {
            ...productDetails,
            imageUrl: responseData.image_url // Use the URL directly from the upload response
          };

          console.log(product)
          // 3. Send the complete product to your database
          const addResponse = await fetch('http://localhost:4000/product/add-product', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
          });

          const finalData = await addResponse.json();

          if (finalData.success) {
            alert("Product Added Successfully");
            // Optionally reset state here
          } else {
            alert("Failed to add product to database");
          }
        }
      } catch (error) {
        console.error("Error adding product:", error);
        alert("An error occurred during upload");
      }
  }

  // console.log(productDetails)
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-bold text-slate-900">Add Product</h1>
        <p className="mt-2 text-sm text-slate-500">Upload a product image, set pricing, and publish it to your store catalog.</p>
      </div>

      <div className="mt-6 space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-700">Product Title</p>
          <input
            value={productDetails.name}
            onChange={changeHandler}
            type="text"
            name="name"
            placeholder="Type here"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-700">Price</p>
            <input
              value={productDetails.old_price}
              onChange={changeHandler}
              type="text"
              name="old_price"
              placeholder="Type here"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-700">Offer Price</p>
            <input
              value={productDetails.new_price}
              onChange={changeHandler}
              type="text"
              name="new_price"
              placeholder="Type here"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-700">Product Category</p>
          <select
            value={productDetails.category}
            onChange={changeHandler}
            name="category"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
          >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-700">Product Image</p>
          <label
            htmlFor="file-input"
            className="flex min-h-64 cursor-pointer items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 transition hover:border-orange-300 hover:bg-orange-50"
          >
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              className="max-h-56 w-auto object-contain"
              alt="Upload preview"
            />
          </label>
          <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
        </div>

        <button
          onClick={() => { Add_Product() }}
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-orange-500 px-8 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-600"
        >
          Add Product
        </button>
      </div>
    </div>
  )
}

export default AddProduct
