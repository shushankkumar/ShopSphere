import { Link } from "react-router-dom"
const Item = (props) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt={props.name} className="w-full object-contain bg-gray-800" /></Link>
      <div className="p-4">
        <p className="text-lg font-semibold text-gray-800 mb-2">{props.name}</p>
        <div className="flex items-center space-x-2">
          <div className="text-xl font-bold text-green-600">
            Rs {props.new_price}
          </div>
          <div className="text-sm text-gray-500 line-through">
            Rs {props.old_price}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item 