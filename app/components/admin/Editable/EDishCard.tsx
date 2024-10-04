"use client";
import React, { useState, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { addItem } from "@/app/redux/slices/cartSlice";
import { PencilEdit01Icon, Delete03Icon } from "hugeicons-react";
import { useRouter } from "next/navigation";

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

const EDishCard: React.FC<EDishCardProps> = ({
  dish,
  className = "",
  mobile = false,
  related = false,
  HandelDelete,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id, attributes = {} } = dish;
  const { title, category, options = [], thumbnail } = attributes;
  const categoryName = category?.data?.attributes?.name || "Uncategorized";
  const thumbnailUrl = thumbnail?.data?.attributes?.formats?.thumbnail?.url;
  const thumbnailName = thumbnail?.data?.attributes?.formats?.thumbnail?.name || "No image";

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

  const cardClassName = useMemo(() => {
    return `card max-h-fit justify-between min-w-[300px] ${
      mobile ? "grid" : ""
    } grid-cols-7 md:flex flex-col bg-[#272822] rounded-[18px]  p-3 md:rounded-[41px] md:py-6 gap-2 overflow-hidden md:p-4 ${className}`;
  }, [mobile, className]);

  const titleClassName = useMemo(() => {
    return `text-[1.2rem] text-white ${mobile ? "md:hidden" : "visible"}`;
  }, [mobile]);

  return (
    <div className={cardClassName}>
      <div className="col-span-3  md:h-[10rem] flex flex-col  items-center gap-6 h-fit my-3 ">
        <h1 className="text-xl text-white">{title || "Untitled Dish"}</h1>
        <Link href={`/category/${categoryName}/${id}`} className="flex flex-col justify-center items-center gap-4 md:h-full ">
          {thumbnailUrl ? (
            <Image
              src={`http://localhost:1337${thumbnailUrl}`}
              width={300}
              height={200}
              alt={thumbnailName}
              className="w-min md:w-full h-full object-fill md:object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
              No Image Available
            </div>
          )}
        </Link>
      </div>
      <div className="col-span-4 flex flex-col gap-3">
        <div className="prices flex flex-wrap gap-2 md:mt-10">
          {options.length > 0 ? (
            options.map((opt) => (
              <button
                key={opt.id}
                className={`flex flex-wrap items-center hover:border-[#ffffff66] bg-[#3F403A] rounded-[41px] md:p-2.5 px-2 p-1 text-nowrap ${
                  opt.size === selectedOption?.size
                    ? "border-[#4a4b48] border-2"
                    : ""
                }`}
                onClick={() => handleOptionSelect(opt)}
              >
                <div className="flex gap-2 items-center">
                  <span className="capitalize text-xs text-[#D4D4D4]">
                    {opt.size}
                  </span>
                  <span
                    className={`text-white font-semibold ${
                      opt.size === selectedOption?.size ? "text-[#ffffff]" : ""
                    }`}
                  >
                    {opt.price} <span className="text-xs font-normal">dh</span>
                  </span>
                </div>
              </button>
            ))
          ) : (
            <p className="text-white">No options available</p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => router.push(`dishes/${id}`)}
            className="md:p-3 p-2 px-4 justify-center text-sm mt-2 bg-[#87ffcf] text-[#1a6b4b] hover:bg-[#ffffff] hover:text-black rounded-full shadow transition-colors duration-200 flex items-center gap-2 capitalize"
          >
            <PencilEdit01Icon />
            Edit
          </button>

          <button
            onClick={() => HandelDelete(id)}
            className="md:p-3 p-2 px-4 justify-center text-sm mt-2 bg-[#ffcdcd] text-[#771010] hover:bg-[#ffffff] hover:text-black rounded-full shadow transition-colors duration-200 flex items-center gap-2 capitalize"
          >
            <Delete03Icon />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EDishCard);