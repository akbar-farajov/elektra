"use client";
import { useState } from "react";

const initialFoods = [
  {
    name: "food1",
    qty: 0,
    price: 10,
  },
  {
    name: "food2",
    qty: 0,
    price: 22,
  },
  {
    name: "food3",
    qty: 0,
    price: 5,
  },
];

export default function Home() {
  const [items, setItems] = useState([]);
  const [foods, setFoods] = useState(initialFoods);

  const handleClick = (index) => {
    const newFoods = [...foods];
    newFoods[index].qty += 1;
    setFoods(newFoods);

    const itemIndex = items.findIndex(
      (item) => item.name === newFoods[index].name
    );
    if (itemIndex !== -1) {
      const newItems = [...items];
      newItems[itemIndex].qty += 1;
      setItems(newItems);
    } else {
      setItems([...items, { ...newFoods[index] }]);
    }
  };

  return (
    <div className="w-full flex items-start justify-between">
      <ul className="flex items-center gap-4">
        {foods.map((food, index) => (
          <li
            key={index}
            className="px-10 py-10 border border-white rounded-md"
          >
            <h2>{food.name}</h2>
            <p className="text-sm text-gray-500">{food.price}AZN</p>
            <button
              className="px-4 py-2 bg-red-500 rounded-md"
              onClick={() => handleClick(index)}
            >
              Add
            </button>
          </li>
        ))}
      </ul>
      <div className="w-[400px] bg-blue-500 text-white h-[100vh] px-4">
        <div>
          <h2>Selected Items</h2>
          <ul>
            {items.map((item, index) => (
              <li key={index} className="py-4 w-full border-b">
                {item.name} - Qty: {item.qty} - Price: {item.price * item.qty}
                AZN
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
