export default function CategoryBar({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="flex gap-3 overflow-x-auto mb-6 pb-2">

      {categories.map((cat) => (

        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`
            px-5
            py-2
            rounded-full
            whitespace-nowrap
            transition
            ${
              selectedCategory === cat
                ? "bg-green-600 text-white"
                : "bg-white border hover:bg-gray-100"
            }
          `}
        >
          {cat}
        </button>

      ))}

    </div>
  );
}