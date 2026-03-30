import { useEffect, useState } from "react"
import new_collection from "../assets/new_collections"
import Item from "./Item"

const NewCollections = () => {

  const [new_collection, setNew_collection] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/newcollections')
    .then((response)=>response.json())
    .then((data)=>setNew_collection(data));
  })
  return (
    <div className="py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">NEW COLLECTIONS</h1>
      <hr className="w-24 mx-auto border-gray-300 mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {new_collection.map((item) => {
          return <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default NewCollections