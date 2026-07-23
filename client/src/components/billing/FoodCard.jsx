export default function FoodCard({ item, onAdd }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">

      <div className="h-40 bg-gray-200 flex items-center justify-center text-6xl">
        🍔
      </div>

      <div className="p-4">

        <h3 className="font-semibold text-lg">
          {item.name}
        </h3>

        <p className="text-gray-500 text-sm">
          {item.category}
        </p>

        <div className="flex justify-between items-center mt-4">

          <span className="text-green-600 font-bold text-lg">
            ₹{item.price}
          </span>

          <button
            onClick={() => onAdd(item)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>

        </div>

      </div>

    </div>
  );
}