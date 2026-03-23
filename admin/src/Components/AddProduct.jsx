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
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : upload_area} className='thumbnail-image' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>
      <button onClick={() => { Add_Product() }} className='addproduct-btn'> ADD</button>
    </div>
  )
}

export default AddProduct
