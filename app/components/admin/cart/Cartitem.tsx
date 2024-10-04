"use client";
import { Delete02Icon } from "hugeicons-react";
import Image from "next/image";
import React from "react";

interface Option {
  id: string;
  size: string;
  price: number;
  quantity: number;
}

interface CartItemProps {
  item: {
    title: string;
    options: Option[];
    thumbnail?: {
      data?: {
        attributes?: {
          formats?: {
            thumbnail?: {
              url: string;
              name: string;
            };
          };
        };
      };
    };
    total: number;
  };
  index: number;
  onRemoveItem: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemoveItem }) => {
  const { title, options, thumbnail } = item;
  const thumbnailUrl = thumbnail?.data?.attributes?.formats?.thumbnail?.url;
  const thumbnailName = thumbnail?.data?.attributes?.formats?.thumbnail?.name;

  const handleRemoveItem = () => {
    onRemoveItem();
  };

  return (
    <div className="bg-white p-4 rounded-lg flex items-center shadow-md relative transition-all hover:shadow-lg">
      <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
        {thumbnailUrl ? (
          <Image
            src={`http://localhost:1337${thumbnailUrl}`}
            alt={thumbnailName || "Product thumbnail"}
            width={64}
            height={64}
            className="object-cover"
          />
        ) : (
          <div className="text-gray-500 text-sm">No Image</div>
        )}
      </div>
      <div className="flex-1 ml-4">
        <h3 className="text-gray-800 font-semibold">{title}</h3>
        <ul className="text-sm text-gray-600">
          {options.map((option: Option) => (
            <li key={option.id} className="flex gap-2">
              <span>{option.size}</span>
              <span>{option.price.toFixed(2)} x {option.quantity}</span>
            </li>
          ))}
        </ul>
        <h4 className="text-gray-900 font-semibold mt-2">{item.total.toFixed(2)} dh</h4>
      </div>
      <button
        className="absolute top-2 right-2 p-2 rounded-full bg-red-100 hover:bg-red-200 transition-all"
        onClick={handleRemoveItem}
      >
        <Delete02Icon color="red" />
      </button>
    </div>
  );
};

export default CartItem;
