"use client";
import { useState } from "react";
import image1 from "../../public/image1.png";
import image2 from "../../public/image2.png";
import image3 from "../../public/image3.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Trash } from "lucide-react";

const initialFoods = [
  {
    image: image1,
    name: "food1",
    qty: 0,
    price: 10,
  },
  {
    image: image2,
    name: "food2",
    qty: 0,
    price: 22,
  },
  {
    image: image3,
    name: "food3",
    qty: 0,
    price: 5,
  },
  {
    image: image3,
    name: "food4",
    qty: 0,
    price: 5,
  },
  {
    image: image1,
    name: "food5",
    qty: 0,
    price: 5,
  },
  {
    image: image2,
    name: "food6",
    qty: 0,
    price: 5,
  },
  {
    image: image3,
    name: "food7",
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

  const deleteItem = (index) => {
    const newItems = [...items];
    const item = newItems.splice(index, 1)[0];

    const foodIndex = foods.findIndex((food) => food.name === item.name);
    if (foodIndex !== -1) {
      const newFoods = [...foods];
      newFoods[foodIndex].qty = 0;
      setFoods(newFoods);
    }

    setItems(newItems);
  };

  const totalSum = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="w-full flex items-start justify-between bg-gray-400">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 py-6 px-6">
        {foods.map((food, index) => (
          <li
            key={index}
            className="p-2 w-full border border-white rounded-md flex flex-col gap-4 bg-white"
          >
            <Image
              priority
              alt=""
              src={food.image}
              className="w-full h-[130px] rounded-md"
            />
            <h2>{food.name}</h2>
            <div className="flex items-center justify-between">
              <p className="text-sm text-red-500 font-bold">
                {food.price}
                <span className="text-red-500 text-[10px]">AZN</span>
              </p>
              <Button
                onClick={() => handleClick(index)}
                className="bg-red-500 hover:bg-white hover:text-red-500 hover:border hover:border-red-500 transition duration-500 text-white text-base font-bold py-2"
              >
                +
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="w-[400px] bg-white text-purple-800 h-[100vh] px-4 py-6 flex flex-col justify-between">
        <div>
          <h2 className="text-red-500 text-lg font-bold border-b pb-6">
            Selected Items
          </h2>
          <ul>
            {items.map((item, index) => (
              <li
                key={index}
                className="py-4 w-full border-b flex items-center justify-between"
              >
                <div>
                  <span className="mr-4 text-red-500 font-bold">
                    {item.qty}x
                  </span>
                  <span>{item.name}</span>
                </div>
                <div className="flex gap-2">
                  <p>
                    {item.price * item.qty}
                    AZN
                  </p>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical
                        color="black"
                        size={20}
                        strokeWidth={1.75}
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        className="text-red-500 hover:text-red-400 flex justify-between"
                        onClick={() => deleteItem(index)}
                      >
                        <div>Delete</div> <Trash size={20} strokeWidth={1.75} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-lg text-red-500 font-bold">Total price</div>
          <div className="text-2xl">
            {totalSum}
            <span className="text-base">AZN</span>
          </div>
        </div>
      </div>
    </div>
  );
}
