import img from "../assets/exclusive_image.png"

const Offers = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-100 bg-gradient-to-r from-purple-300 to-pink-300 p-6 rounded-lg shadow-lg mx-4 my-8">
      <div className="text-center md:text-left mb-4 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">Exclusive</h1>
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">Offers For You</h1>
        <p className="text-base text-black mb-4">ONLY ON BEST SELLERS PRODUCTS</p>
        <button className="bg-red-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-900 transition-colors duration-300">Check Now</button>
      </div>
      <div className="w-full md:w-1/6 flex-shrink-0">
        <img src={img} alt="Exclusive Offers" className="w-full h-auto rounded-lg " />
      </div>
    </div>
  )
}

export default Offers