const DescriptionBox = () => {
  return (
    <div className="max-w-6xl mx-auto mt-16 px-4">

      {/* Tabs */}
      <div className="flex border-b">
        <button className="px-6 py-3 text-sm font-semibold border-b-2 border-black">
          Description
        </button>

        <button className="px-6 py-3 text-sm text-gray-500 hover:text-black">
          Reviews (122)
        </button>
      </div>

      {/* Description Content */}
      <div className="bg-gray-50 p-6 rounded-b-lg mt-2 text-gray-700 leading-relaxed space-y-4">

        <p>
          This premium quality fashion product is designed to provide both
          comfort and modern style. Made from high-quality breathable fabric,
          it ensures a soft feel on the skin and long-lasting durability.
          Perfect for casual outings, daily wear, or styling with your favorite
          outfits.
        </p>

        <p>
          The product features a trendy design, lightweight material, and a
          comfortable fit that suits all body types. It is easy to maintain and
          retains its color and shape even after multiple washes. Pair it with
          jeans, trousers, or shorts to create a stylish and confident look.
        </p>

        <ul className="list-disc ml-6 space-y-1">
          <li>Premium breathable cotton fabric</li>
          <li>Comfortable and lightweight design</li>
          <li>Modern fit suitable for everyday wear</li>
          <li>Easy to wash and maintain</li>
          <li>Perfect for casual and semi-casual outfits</li>
        </ul>

      </div>
    </div>
  );
};

export default DescriptionBox;