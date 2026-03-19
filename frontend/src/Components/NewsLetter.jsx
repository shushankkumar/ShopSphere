
const NewsLetter = () => {
  return (
    <div className="bg-gradient-to-r from-purple-300 py-12 px-4">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Get Exclusive Offers On Your Email</h1>
        <p className="text-gray-600 mb-6">Subscribe to our newsletter and stay updated</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="Your Email id"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewsLetter