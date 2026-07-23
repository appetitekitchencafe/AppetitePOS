import { FaSearch } from "react-icons/fa";

export default function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="relative mb-6">

      <FaSearch
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search menu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          pl-12
          pr-4
          py-3
          rounded-xl
          border
          border-gray-300
          focus:outline-none
          focus:ring-2
          focus:ring-green-500
        "
      />

    </div>
  );
}