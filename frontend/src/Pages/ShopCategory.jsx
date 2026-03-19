import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import dropdown_icon from "../assets/dropdown_icon.png";
import Item from "../Components/Item";

const ShopCategory = (props) => {

  const { all_product } = useContext(ShopContext);

  return (
    <div className="max-w-8xl mx-auto mb-10 mt-10  px-10 py-10">

      {/* Banner */}
      <img
        src={props.banner}
        alt="category banner"
        className="w-full rounded-xl mb-10"
      />

      {/* Top Section */}
      <div className="flex justify-between items-center mb-8">

        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Showing 1-12</span> out of 36 products
        </p>

        <div className="flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100">
          Sort by
          <img src={dropdown_icon} alt="" className="w-4 h-4"/>
        </div>

      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {all_product.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          } else {
            return null;
          }
        })}

      </div>

    </div>
  );
};

export default ShopCategory;