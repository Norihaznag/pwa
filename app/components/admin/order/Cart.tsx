import Image from "next/image";
import React from "react";

// Define interfaces to match the API response structure
interface Tag {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

interface ThumbnailFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

interface Thumbnail {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: {
        thumbnail: ThumbnailFormat;
        large?: ThumbnailFormat;
        medium?: ThumbnailFormat;
        small?: ThumbnailFormat;
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: string | null;
      createdAt: string;
      updatedAt: string;
    };
  };
}

interface Option {
  id: number;
  price: number;
  size: string;
  quantity: number;
}

interface Category {
  data: {
    id: number;
    attributes: {
      name: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
}

interface Ingredient {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
  };
}

interface CartItemProps {
  id: number;
  title: string;
  description: string;
  isAvailable: boolean;
  tags: { data: Tag[] };
  thumbnail: Thumbnail;
  options: Option[];
  category: Category;
  ingredients: { data: Ingredient[] };
  total: number;
}

interface CartProps {
  items: CartItemProps[];
  total: number;
}

const Cart: React.FC<CartProps> = ({ items, total }) => {
  return (
    <div className="container mx-auto  rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Cart</h2>
      <div className="grid gap-2 md:grid-cols-2 min-[1400px]::grid-cols-3 ">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center p-4 bg-[#212121] rounded-lg shadow-md"
          >
            <Image
              src={`http://localhost:1337${item.thumbnail.data.attributes.url}`}
              alt={item.title}
              className="w-20 h-20 object-cover rounded-lg mr-4"
              width={item.thumbnail.data.attributes.formats.thumbnail.width}
              height={item.thumbnail.data.attributes.formats.thumbnail.height}
            />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <ul >
            {item.options.map((item: any, idx: any) => (
              <li key={idx} className="flex items-center capitalize">
                <h1 className="mr-2">{item.size} : </h1>
                <h1 className=" ">
                  {/* ${(item.price * item.quantity).toFixed(2)} */}
                  ${(item.price).toFixed(2)}

                </h1>
                <h1 className="ml-2 lowercase">x {item.quantity}</h1>
              </li>
            ))}
          </ul>
              
            </div>
            <div className="text-right">
              <p
                className={`text-sm  ${
                  item.isAvailable ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.isAvailable ? "Available" : "Unavailable"}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 flex justify-between items-center  rounded-lg bg-[#212121]">
        <h3 className="">Total: </h3>
        <h1 className="text-4xl text-[#ff00a6]">{total} <span className="text-sm">dh</span></h1>
      </div>
    </div>
  );
};

export default Cart;
