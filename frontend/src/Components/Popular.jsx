import { useEffect, useState } from 'react'
//import data_product from '../assets/data'
import Item from './Item'

const Popular = () => {
  const[popularProducts, setPopularProducts] = useState([]);
  const [error, setError] = useState('');
  
  useEffect(()=>{
    fetch('http://localhost:4000/popularinwomen') 
      .then((response)=>{
        if (!response.ok) {
          throw new Error('Failed to fetch popular products');
        }
        return response.json()
      })
      .then((data)=>{
        setPopularProducts(data)
        setError('')
      })
      .catch((err) => {
        console.error(err)
        setError('Popular products could not be loaded.')
      }); 
  },[])


//   try {
//   const response = await axios.get("http://localhost:4000/popularinwomen");
//   console.log(response);
// } catch (error) {
//   console.error(error);
// }
  return (
    <div className="py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">POPULAR IN WOMEN</h1>
      <hr className="w-24 mx-auto border-gray-300 mb-8" />
      {error && <p className="mb-6 text-center text-sm font-medium text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {popularProducts.map((item) => {
          return <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default Popular
