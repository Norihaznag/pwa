"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { addItem } from "@/app/redux/slices/cartSlice";
import { ShoppingBag } from 'lucide-react';

interface Option {
  id: string;
  size: string;
  price: number;
}

interface Dish {
  id: string;
  attributes: {
    title?: string;
    description?: string;
    category?: {
      data?: {
        attributes?: {
          name?: string;
        };
      };
    };
    options?: Option[];
    thumbnail?: {
      data?: {
        attributes?: {
          formats?: {
            thumbnail?: {
              url?: string;
              name?: string;
            };
          };
          url?: string;
        };
      };
    };
  };
}

interface DishCardProps {
  dish: Dish;
  className?: string;
  mobile?: boolean;
  related?: boolean;
}

const DishCard: React.FC<DishCardProps> = ({
  dish,
  className = "",
  mobile = false,
  related = false,
}) => {
  const dispatch = useDispatch();
  const { id, attributes = {} } = dish;
  const { title, category, options = [], thumbnail } = attributes;
  const categoryName = category?.data?.attributes?.name || "Uncategorized";
  const thumbnailUrl = thumbnail?.data?.attributes?.formats?.thumbnail?.url || 
                       thumbnail?.data?.attributes?.url;
  const imageUrl = thumbnailUrl ? `http://localhost:1337${thumbnailUrl}` : '/api/placeholder/300/200';

  const [selectedOption, setSelectedOption] = useState<Option | null>(options[0] || null);

  const handleOptionSelect = useCallback((opt: Option) => {
    setSelectedOption(opt);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (selectedOption) {
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
    }
  }, [dispatch, id, attributes, selectedOption]);

  return (
    <div className={`
      bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]
      ${mobile ? 'flex flex-row h-40 sm:h-48' : 'flex flex-col h-auto'}
      ${className}
    `}>
      <Link
        href={`/category/${categoryName}/${id}`}
        className={`
          relative overflow-hidden
          ${mobile ? 'w-1/3' : 'w-full aspect-square'}
        `}
      >
        <Image
          src={imageUrl}
          alt={title || "Dish image"}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            {categoryName}
          </span>
        </div>
      </Link>

      <div className={`
        flex flex-col justify-between p-4
        ${mobile ? 'w-2/3' : 'w-full'}
      `}>
        <div>
          <h2 className="font-semibold text-gray-800 mb-2 line-clamp-1">
            {title || "Untitled Dish"}
          </h2>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {options.map((opt: Option) => (
              <button
                key={opt.id}
                onClick={() => handleOptionSelect(opt)}
                className={`
                  px-3 py-1 rounded-full text-sm transition-colors
                  ${opt.id === selectedOption?.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-orange-50 text-orange-500 hover:bg-orange-100'}
                `}
              >
                {opt.size} - ${opt.price}
              </button>
            ))}
          </div>
        </div>

        {selectedOption && (
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition-colors"
          >
            <ShoppingBag size={16} />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(DishCard);