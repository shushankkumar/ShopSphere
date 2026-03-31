import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
//import data_product from "../assets/data"
import Item from "./Item";

const RelatedProducts = ({ product }) => {
  const { all_product } = useContext(ShopContext);
  const relatedProducts = all_product
    .filter((item) => item.category === product?.category && item.id !== product?.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto mt-16 px-6">

      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Related Products
        </h1>

        <div className="w-24 h-1 bg-black mx-auto mt-3 rounded"></div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
        {relatedProducts.map((item) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>

    </div>
  );
};

export default RelatedProducts;
