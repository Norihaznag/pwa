import Image from "next/image";
import React from "react";
import { Delete01Icon } from 'hugeicons-react';

interface Option {
  size: string;
  price: number;
  quantity: number;
}

interface Item {
  id: number;
  title: string;
  category: string;
  thumbnail?: {
    data?: {
      attributes?: {
        formats?: {
          thumbnail?: {
            url?: string;
            name?: string;
          }
        }
      }
    }
  };
  options: Option[];
  total: number;
}

interface CartItemProps {
  item: Item;
  index: number;
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, optionIndex: number, change: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, index, onRemoveItem, onUpdateQuantity }) => {
  const { id, title, thumbnail, options, total } = item;
  const thumbnailUrl = thumbnail?.data?.attributes?.formats?.thumbnail?.url;
  const thumbnailName = thumbnail?.data?.attributes?.formats?.thumbnail?.name || 'Product image';

  return (
    <li className="flex flex-row min-h-[7rem] bg-[#3F403A]  shadow-md rounded-lg overflow-hidden mb-4">
      <div className="w-1/3  h-32  relative">
        {thumbnailUrl ? (
          <Image
            src={`http://localhost:1337${thumbnailUrl}`}
            alt={thumbnailName}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className=" h-full  flex items-center justify-center ">
            No image
          </div>
        )}
      </div>

      <div className="flex-1 p-4 flex flex-col h-full">
        <div>
          <h3 className="text-lg  mb-2">{title}</h3>
          <ul className="">
            {options.map((option, idx) => (
              <li key={idx} className="flex items-center justify-between text-sm">
                <span className="">{option.size}</span>
                <div className="flex items-center">
                  <span className="  mr-2">
                    {option.price.toFixed(2)}
                  </span>
                 
                  <span className="mx-2 font-medium">{option.quantity}</span>
                 
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-lg  ">
           <span className="font-normal text-slate-200 mr-2"> Total:</span> {total.toFixed(2)}
          </p>
          <button
            onClick={() => onRemoveItem(id)}
            className="text-red-500 hover:text-red-600 transition-colors p-2"
            aria-label="Remove item"
          >
            <Delete01Icon size={24} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;