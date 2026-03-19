import arrow_icon from '../assets/breadcrum_arrow.png';


const Breadcrum = (props) => {

    const {product} = props ; 

  return (
    <>
    <div className="flex items-center gap-2 text-sm text-gray-600">
  HOME <img src={arrow_icon} className="w-3 h-3" alt="" />
  SHOP <img src={arrow_icon} className="w-3 h-3" alt="" />
  {product?.category} <img src={arrow_icon} className="w-3 h-3" alt="" />
  {product?.name}
</div>
    </>
  )
}

export default Breadcrum