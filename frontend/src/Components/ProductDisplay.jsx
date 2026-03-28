import { useContext, useState } from "react";
import star_dull_icon from "../assets/star_dull_icon.png";
import star_icon from "../assets/star_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const INITIAL_SIZE = "";

const ProductDisplay = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(INITIAL_SIZE);

  if (!product) return null;

  const{addToCart} = useContext(ShopContext);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }

    addToCart(product.id, selectedSize);
    setSelectedSize(INITIAL_SIZE);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <div className="grid md:grid-cols-2 gap-12 items-start">

        {/* LEFT SIDE IMAGES */}
        <div className="flex gap-5">

          {/* small images */}
          <div className="flex flex-col gap-4">
            <img className="w-20 h-20 object-cover border rounded-lg cursor-pointer hover:scale-105 transition" src={product.image} alt="" />
            <img className="w-20 h-20 object-cover border rounded-lg cursor-pointer hover:scale-105 transition" src={product.image} alt="" />
            <img className="w-20 h-20 object-cover border rounded-lg cursor-pointer hover:scale-105 transition" src={product.image} alt="" />
            <img className="w-20 h-20 object-cover border rounded-lg cursor-pointer hover:scale-105 transition" src={product.image} alt="" />
          </div>
           

          {/* main image */}
          <div className="flex-1 bg-gray-50 rounded-xl p-6 shadow">
            <img
              className="w-full h-[500px] object-contain"
              src={product.image}
              alt={product.name}
            />
          </div>

        </div>


        {/* RIGHT SIDE DETAILS */}
        <div className="flex flex-col gap-5">

          <h1 className="text-4xl font-bold text-gray-800">
            {product.name}
          </h1>

          {/* rating */}
          <div className="flex items-center gap-1">
            <img className="w-5" src={star_icon} alt="" />
            <img className="w-5" src={star_icon} alt="" />
            <img className="w-5" src={star_icon} alt="" />
            <img className="w-5" src={star_icon} alt="" />
            <img className="w-5" src={star_dull_icon} alt="" />
            <p className="ml-2 text-gray-500 text-sm">(122 Reviews)</p>
          </div>

          {/* price */}
          <div className="flex items-center gap-4 mt-2">
            <span className="text-gray-400 line-through text-xl">
              ₹{product.old_price}
            </span>

            <span className="text-3xl font-bold text-red-500">
              ₹{product.new_price}
            </span>

            <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded">
              Sale
            </span>
          </div>

          {/* description */}
          <p className="text-gray-600 leading-relaxed">
            Premium quality fashion product designed for comfort and modern style.
            Perfect for daily wear and casual outfits. Lightweight fabric with
            breathable material ensures maximum comfort.
          </p>

          {/* sizes */}
          <div>
            <h3 className="font-semibold text-lg mb-3">
              Select Size
            </h3>

            <div className="flex gap-3">
              {["S","M","L","XL","XXL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-5 py-2 rounded-lg transition ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "hover:bg-black hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* add to cart */}
          <button onClick={handleAddToCart} className="mt-4 bg-black text-white px-8 py-3 rounded-lg w-fit hover:bg-gray-800 transition">
            ADD TO CART
          </button>

          {/* category & tags */}
          <div className="mt-4 text-sm text-gray-600">
            <p>
              <span className="font-semibold text-gray-800">
                Category:
              </span>{" "}
              Women, T-Shirt, Crop Top
            </p>

            <p className="mt-1">
              <span className="font-semibold text-gray-800">
                Tags:
              </span>{" "}
              Modern, Latest
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDisplay;
