import { Link } from 'react-router-dom'
import arrow_icon from '../assets/arrow.png'
import hero_img from '../assets/banner.png'
import hero_img1 from '../assets/banner1.png'
import hero_img2 from '../assets/banner2.png'
import hand_icon from '../assets/hand_icon.png'

const Hero = () => {
  return (
    <div className="flex items-center justify-between px-16 pt-10 pb-16 bg-gradient-to-r from-pink-100 to-white h-[100vh] w-full">

      {/* Left Section */}
      <div className="flex flex-col gap-4 w-3/4">

        <h2 className="text-2xl font-semibold text-gray-700">
          New Arrivals Only
        </h2>

        <div className="flex items-center gap-3 text-5xl font-bold text-gray-800">
          <p>New</p>
          <img src={hand_icon} alt="icon" className="w-12"/>
        </div>

        <p className="text-5xl font-bold text-gray-800">
          Collections
        </p>

        <p className="text-5xl font-bold text-gray-800">
          For Everyone
        </p>

        {/* Button */}
        <Link to="/collections">
          <div className="flex items-center gap-3 mt-6 bg-red-500 text-white px-6 py-3 rounded-full w-fit cursor-pointer hover:bg-red-600 transition">
            <div className="font-medium">Latest Collection</div>
            <img src={arrow_icon} alt="icon" className="w-5"/>
          </div>
        </Link>

      </div>

      {/* Right Section */}
      <div className="flex gap-4 w-1/4 justify-end">
        <img src={hero_img} alt="hero" className="w-[275px]"/>
        <img src={hero_img1} alt="hero" className="w-[275px]"/>
        <img src={hero_img2} alt="hero" className="w-[275px]"/>
      </div>

    </div>
  )
}

export default Hero