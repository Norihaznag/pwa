"use client";

import React from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";

interface ImageData {
  id: string;
  name: string;
  url: string;
  formats: {
    thumbnail: {
      url: string;
      width: number;
      height: number;
    };
  };
}

interface CardProps {
  image: ImageData;
  onDelete: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ image, onDelete }:any) => {
  const { id, name, formats, url } = image;
  const { width, height } = formats.thumbnail;

  return (
    <div className="bg-[#272822] text-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 h-fit">
      <div className="relative h-48">
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`}
          alt={name}
          className="transition-opacity duration-300 object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <button
          onClick={() => onDelete(id)}
          className="absolute top-2 right-2 p-2 bg-gray-900 bg-opacity-50 rounded-full hover:bg-red-600 transition-colors duration-300"
          aria-label="Delete image"
        >
          <Trash2 size={20} />
        </button>
      </div>
      <div className="p-4 h-fit flex flex-col justify-between">
        <h3 className="text-lg font-semibold truncate">{name}</h3>
        <p className="text-sm text-gray-300">
          {width}x{height} px
        </p>
      </div>
    </div>
  );
};

export default Card;