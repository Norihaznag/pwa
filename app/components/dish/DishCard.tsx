"use client";

import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { addItem } from "@/app/redux/slices/cartSlice";
import { ShoppingBag, Tag } from 'lucide-react';

interface Option {
  id: string;
  size: string;
  price: number;
}

interface Dish {
  id: string;
  attributes: {
    title?: string;
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
  layout?: 'vertical' | 'horizontal';
}

export default function DishCard({
  dish,
  className = "",
  layout = 'vertical'
}: DishCardProps) {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    dish.attributes.options?.[0] || null
  );

  const {
    id,
    attributes: {
      title = 'Untitled Dish',
      category,
      options = [],
      thumbnail
    }
  } = dish;

  const categoryName = category?.data?.attributes?.name || "Uncategorized";
  const thumbnailUrl = thumbnail?.data?.attributes?.url || 
                       thumbnail?.data?.attributes?.url;
  const imageUrl = thumbnailUrl ? `http://localhost:1337${thumbnailUrl}` : '/api/placeholder/300/200';

  const handleAddToCart = useCallback(() => {
    if (selectedOption) {
      dispatch(addItem({
        id,
        ...dish.attributes,
        options: [{ ...selectedOption, quantity: 1 }],
      }));
    }
  }, [dispatch, id, dish.attributes, selectedOption]);

  return (
    <div className={`
      group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300
      ${layout === 'horizontal' ? 'flex' : 'flex flex-col'}
      ${className}
    `}>
      <Link
        href={`/category/${categoryName}/${id}`}
        className={`
          relative overflow-hidden rounded-t-xl
          ${layout === 'horizontal' ? 'w-1/3 rounded-l-xl rounded-t-none' : 'w-full aspect-square'}
        `}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
          <Tag size={12} />
          <span>{categoryName}</span>
        </div>
      </Link>

      <div className={`
        flex flex-col justify-between p-4 flex-grow
        ${layout === 'horizontal' ? 'w-2/3' : 'w-full'}
      `}>
        <div>
          <h2 className="font-semibold text-gray-800 mb-2 line-clamp-1">
            {title || 'sss'}
          </h2>
          
          <div className="flex flex-wrap gap-1.5 mb-3">
            {options.map((opt: Option) => (
              <button
                key={opt.id}
                onClick={() => setSelectedOption(opt)}
                className={`
                  px-2.5 py-1 rounded-full text-sm font-medium transition-colors
                  ${opt.id === selectedOption?.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-orange-50 text-orange-500 hover:bg-orange-100'}
                `}
              >
                {opt.size} - ${opt.price.toFixed(2)}
              </button>
            ))}
          </div>
        </div>

        {selectedOption && (
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-1.5 w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition-colors"
          >
            <ShoppingBag size={16} strokeWidth={2.5} />
            <span className="font-medium">Add to Cart</span>
          </button>
        )}
      </div>
    </div>
  );
}