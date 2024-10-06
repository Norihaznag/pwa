"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addItem } from "@/app/redux/slices/cartSlice";
import { Pencil, Trash2, Tag } from 'lucide-react';

interface Option {
  id: string;
  size: string;
  price: number;
}

interface Thumbnail {
  data?: {
    attributes?: {
      formats?: {
        thumbnail?: {
          url?: string;
          name?: string;
        };
      };
    };
  };
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
    thumbnail?: Thumbnail;
  };
}

interface EDishCardProps {
  dish: Dish;
  className?: string;
  mobile?: boolean;
  related?: boolean;
  HandelDelete: (id: string) => void;
}

export default function EDishCard({
  dish,
  className = "",
  mobile = false,
  HandelDelete,
}: EDishCardProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    dish.attributes.options?.[0] || null
  );

  const {
    id,
    attributes: {
      title = "Untitled Dish",
      category,
      options = [],
      thumbnail
    }
  } = dish;

  const categoryName = category?.data?.attributes?.name || "Uncategorized";
  const thumbnailUrl = thumbnail?.data?.attributes?.url;
  const imageUrl = thumbnailUrl ? `http://localhost:1337${thumbnailUrl}` : '/api/placeholder/300/200';

  return (
    <div className={`
      group  rounded-2xl overflow-hidden min-w-fit border p-4 transition-all duration-300 hover:shadow-xl
      ${mobile ? 'flex flex-row' : 'flex flex-col'}
      ${className}
    `}>
      <div className={`
        relative overflow-hidden
        ${mobile ? 'w-1/3' : 'w-full aspect-square'}
      `}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full">
          <Tag size={14} />
          <span className="text-sm font-medium">{categoryName}</span>
        </div>
      </div>

      <div className={`
        flex flex-col justify-between p-4 flex-grow
        ${mobile ? 'w-2/3' : 'w-full'}
      `}>
        <div>
          <h2 className="text-xl font-semibold  text-black mb-4">
            {title}
          </h2>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedOption(opt)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${opt.id === selectedOption?.id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}
                `}
              >
                <span className="capitalize">{opt.size}</span>
                <span className="mx-1">-</span>
                <span className="font-semibold">{opt.price} dh</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <button
            onClick={() => router.push(`dishes/${id}`)}
            className="flex-1 flex items-center justify-center gap-2 text-emerald-900 py-2.5 px-4 rounded-full border-emerald-700 transition-colors font-medium"
          >
            <Pencil size={18} />
            Edit
          </button>

          <button
            onClick={() => HandelDelete(id)}
            className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-red-900 py-2.5 px-4 rounded-full hover:bg-red-400 transition-colors font-medium"
          >
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}