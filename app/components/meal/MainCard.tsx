"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "@/app/redux/slices/cartSlice";
import { getOne } from "@/app/api/strapi";
import Related from "./Related";
import { ShoppingBag02Icon } from "hugeicons-react";

interface Dish {
  title: string;
  description: string;
  category: { data: { attributes: { name: string } } };
  options: Option[];
  thumbnail: {
    data: {
      attributes: {
        formats: { thumbnail: { url: string } };
        name: string;
      };
    };
  };
  isAvailable: boolean;
  tags: {
    data: Array<{ id: number; attributes: { name: string } }>;
  };
}

interface Option {
  id: number;
  size: string;
  price: number;
}

const MainCard = ({ id }: { id: number }) => {
  const [dish, setDish]:any = useState(null);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const data = await getOne(id);
        setDish(data.attributes || null);
        if (data.attributes?.options?.length > 0) {
          setSelectedOption(data.attributes.options[0]);
        }
      } catch (err: any) {
        console.error("Error fetching dish:", err);
      }
    };
    fetchDish();
  }, [id]);

  const handleOptionSelect = useCallback((opt: Option) => {
    setSelectedOption(opt);
  }, []);

  const handleAddToCart = () => {
    if (dish && selectedOption) {
      dispatch(
        addItem({
          id,
          ...dish,
          options: [
            {
              ...selectedOption,
              quantity: 1,
            },
          ],
        })
      );
    }
  };

  if (!dish) {
    return <div>Loading...</div>;
  }

  const {
    title,
    description,
    category,
    options = [],
    thumbnail,
    tags,
  } = dish;

  return (
    <>
      <div className="text-[#272822] rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center justify-center p-5 md:py-7">
        <div className="w-full md:w-1/2 pt-5">
          {thumbnail && (
            <Image
              src={`http://localhost:1337${thumbnail.data.attributes.url}`}
              alt={thumbnail.data.attributes.name}
              width={500}
              height={500}
              quality={100}
              className="object-contain w-full h-auto md:h-full"
              priority
            />
          )}
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
            <p className="text-gray-500 mb-4">{description}</p>

           
            <ul className=" flex gap-3  flex-wrap list-inside mb-4">
              {tags &&
                tags.data.map((tag:any) => (
                  <li key={tag.id} className="text-white bg-[#414339] px-2 p-1 rounded-lg text-sm">
                    {tag.attributes.name}
                  </li>
                ))}
            </ul>
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {options.map((opt:any) => (
                <button
                  key={opt.id}
                  className={`flex items-center rounded-lg px-2 py-1 text-sm md:text-base bg-[#414339] hover:border-2 ${
                    opt.size === selectedOption?.size
                      ? "border-[#c9209e] border-2"
                      : ""
                  }`}
                  onClick={() => handleOptionSelect(opt)}
                  aria-label={`Select ${opt.size} size option`}
                >
                  <div className="flex flex-col">
                    <span className="capitalize">{opt.size}</span>
                    <span className="text-[#ee007b] font-semibold">
                      {opt.price} <span className="text-xs">dh</span>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={handleAddToCart}
              className="w-full md:w-auto hover:bg-slate-800 py-2 px-4 transition duration-300 rounded-lg bg-black text-white flex gap-2 items-center justify-center"
              aria-label="Add to cart"
            >
              <ShoppingBag02Icon className="w-5 h-5 md:w-6 md:h-6" />
              <span className="hidden md:inline">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      {category && <Related category={category.data.attributes.name} />}
    </>
  );
};

export default MainCard;
