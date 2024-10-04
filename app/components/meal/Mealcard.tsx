"use client";
import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "../image/Image";
import Icon from "../icon/Icon";
import Link from "next/link";
import { addItem } from "@/app/redux/slices/KartSlice";
import { calceach, itemtotal } from "@/app/functions/functions";

interface Option {
  size: string;
  price: number;
  quantity: number;
}

interface ItemDetail {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  options: Option[];
}

interface MealcardProps {
  item: {
    order: any;
    detail: ItemDetail;
  };
  className?: string;
}

const Mealcard: React.FC<MealcardProps> = ({ item, className }:any) => {
  const dispatch = useDispatch();
  const kart = useSelector((state: any) => state.kart);



  const [selectedOption, setSelectedOption] = useState<Option>(item.detail.options[0]);

  const handleOptionSelect = useCallback((opt: Option) => {
    setSelectedOption(opt);
  }, []);


  const handleAddToCart = useCallback(() => {
    dispatch(addItem(
      {
      detail: item.detail,
      order: {
        options: [{
          ...selectedOption,
          quantity: 1 // Always add 1 when adding to cart
        }],
      
      }
    }));
  }, [dispatch, item.detail, selectedOption]);


  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full ${className} md:max-w-80`}>
      <Link className="block flex-grow" href={`/category/${item.detail.category}/${item.detail.id}`}>
        <div className="p-4 space-y-3">
          <h2 className="font-bold text-2xl text-gray-800">{item.detail.name}</h2>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            <Image src={item.detail.image} alt={item.detail.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </Link>

      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="prices flex flex-wrap gap-2">
            {item.detail.options.map((opt: Option) => (
              <button
                key={opt.size}
                className={`flex items-center hover:border-[#c9209e66] border-2 rounded-lg px-2 text-nowrap ${
                  opt.size === selectedOption.size ? "border-[#c9209e]" : "border-gray-300"
                }`}
                onClick={() => handleOptionSelect(opt)}
              >
                <div className="flex flex-col">
                  <span className="capitalize text-xs">{opt.size}</span>
                  <span className="text-[1.2rem] font-semibold text-[#ee007b]">
                    {opt.price} <span className="text-xs">dh</span>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <h1 className="text-lg">Category: {item.detail.category}</h1>
        <p className="text-gray-600 line-clamp-3">{item.detail.description}</p>

        <div className="flex items-center justify-between">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full shadow transition-colors duration-200 flex items-center gap-2"
          >
            <Icon name="cart" />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mealcard;