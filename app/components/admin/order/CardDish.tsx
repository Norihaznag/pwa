"use client";
import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { addItem } from "@/app/redux/slices/cartSlice";
import { ShoppingBasket01Icon, Edit01Icon } from "hugeicons-react";

const CardDish = ({ dish, className, key }: any) => {
  const dispatch = useDispatch();
  const { id, attributes } = dish;
  const { title, description, category, options, thumbnail } = attributes;
  const { formats } = thumbnail.data.attributes;
  const categoryname = category.data.attributes.name;
  const { url, name } = formats.thumbnail;
  const cart = useSelector((state: any) => state.cart);

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionSelect = useCallback((opt: any) => {
    setSelectedOption(opt);
  }, []);

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id,
        ...attributes,
        options: [
          {
            ...selectedOption,
            quantity: 1,
          },
        ],
      })
    );
  };

  return (
    <div
      className={`bg-black rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 justify-center min-w-[fit] max-h-[450px] text-sm flex ${className}`}
      key={key}
    >
      <Link
        className="block w-[50%]"
        href={`/category/${categoryname}/${id}`}
      >
        <div className="p-4 space-y-3 text-center text-white">
          <h2 className="font-bold text-xl ">{title}</h2>
          <div
            className="rounded-lg overflow-hidden"
            style={{ height: "180px" }}
          >
            {" "}
            {/* Fixed image height */}
            <Image
              src={`http://localhost:1337${url}`}
              width={330}
              height={180} // Adjusted image size
              alt={name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </Link>

      <div className="p-4 space-y-4 w-[50%]">
        <p className="text-gray-300 line-clamp-3">{description}</p>
        <div className="flex items-center justify-between">
          <div className="prices flex flex-wrap gap-2">
            {options.map((opt: any) => (
              <button
                key={opt.id}
                className={`flex items-center hover:border-[#c9209e66] bg-gray-900  rounded-lg px-2 text-nowrap ${
                  opt.size === selectedOption.size
                    ? "border-[#c9209e] border-2"
                    : ""
                }`}
                onClick={() => handleOptionSelect(opt)}
              >
                <div className="flex flex-col">
                  <span className="capitalize text-xs text-slate-100">
                    {opt.size}
                  </span>
                  <span className=" font-semibold text-[#ee007b]">
                    {opt.price} <span className="text-xs">dh</span>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-[#1b1b1b] hover:bg-gray-200 text-blue-500 rounded-full shadow transition-colors duration-200 flex items-center gap-2"
          >
            <ShoppingBasket01Icon />
          </button>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-[#1b1b1b] hover:bg-gray-200 text-green-500 rounded-full shadow transition-colors duration-200 flex items-center gap-2"
          >
            <Edit01Icon />
            Edite
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDish;
