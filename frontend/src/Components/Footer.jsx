import instagram_icon from "../assets/instagram_icon.png";
import footer_logo from "../assets/logo_big.png";
import pintester_icon from "../assets/pintester_icon.png";
import whatsapp_icon from "../assets/whatsapp_icon.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col items-center">

        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-6">
          <img src={footer_logo} alt="logo" className="w-12 h-12" />
          <p className="text-2xl font-bold tracking-wide">ShopSphere</p>
        </div>

        {/* Links */}
        <ul className="flex gap-8 text-gray-300 mb-8 text-sm md:text-base">
          <li className="cursor-pointer hover:text-white">Company</li>
          <li className="cursor-pointer hover:text-white">Products</li>
          <li className="cursor-pointer hover:text-white">Offices</li>
          <li className="cursor-pointer hover:text-white">About</li>
          <li className="cursor-pointer hover:text-white">Contact</li>
        </ul>

        {/* Social Icons */}
        <div className="flex gap-6 mb-8">
          <div className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 cursor-pointer transition">
            <img src={instagram_icon} alt="instagram" className="w-5 h-5" />
          </div>

          <div className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 cursor-pointer transition">
            <img src={pintester_icon} alt="pinterest" className="w-5 h-5" />
          </div>

          <div className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 cursor-pointer transition">
            <img src={whatsapp_icon} alt="whatsapp" className="w-5 h-5" />
          </div>
        </div>

        {/* Divider */}
        <hr className="w-full border-gray-700 mb-4" />

        {/* Copyright */}
        <p className="text-gray-400 text-sm text-center">
          © 2026 ShopSphere. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;