import FoodCard from "./FoodCard";

export default function MenuGrid({
  menu,
  addItem,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      {menu.map((item) => (
        <FoodCard
          key={item.id}
          item={item}
          onAdd={addItem}
        />
      ))}

    </div>
  );
}