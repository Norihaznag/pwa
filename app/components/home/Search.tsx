"use client";
import React, { useEffect, useState, useRef } from "react";
import { SearchInput } from "@/app/api/strapi"; // Adjust the import path as needed
import { SearchIcon } from "lucide-react";
import Link from "next/link";

interface Dish {
  id: string;
  attributes: {
    title: string;
    category: {
      data: {
        attributes: {
          name: string;
        };
      };
    };
  };
}

interface SearchProps {
  className?: string;
}

const Search: React.FC<SearchProps> = ({ className = "" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchTerm.trim() === "") {
      setFilteredDishes([]);
      return;
    }

    setIsLoading(true);

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const fetchedDishes = await SearchInput(searchTerm.toLowerCase());
        setFilteredDishes(fetchedDishes.slice(0, 4));
      } catch (err) {
        console.error("Error fetching Dishes:", err);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms delay

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="flex items-center bg-[#414339] rounded-full overflow-hidden shadow-md">
        <input
          name="search"
          className="flex-grow px-4 py-2 text-white bg-transparent placeholder-gray-400 focus:outline-none"
          placeholder="Track dish: Enter dish ID"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button
          aria-label="Search"
          className="p-2 text-white hover:bg-[#5d5f56] transition-colors duration-200"
        >
          <SearchIcon width={24} height={24} />
        </button>
      </div>
      {isLoading && (
        <div className="absolute w-full text-center py-2 bg-[#414339] text-white rounded-md mt-2">
          Loading...
        </div>
      )}
      {!isLoading && filteredDishes.length > 0 && (
        <ul className="absolute w-full bg-[#414339] text-white shadow-lg rounded-md mt-2 py-2 max-h-60 overflow-y-auto z-50">
          {filteredDishes.map((dish) => (
            <li
              className="px-4 py-2 hover:bg-[#5d5f56] cursor-pointer transition-colors duration-200"
              key={dish.id}
            >
              <Link
                href={`/category/${dish.attributes.category.data.attributes.name}/${dish.id}`}
              >
                {dish.attributes.title}
              </Link>
            </li>
          ))}
          {filteredDishes.length === 4 && (
            <li className="px-4 py-2 hover:bg-[#5d5f56] cursor-pointer transition-colors duration-200">
              <Link href={`/dishes?search=${searchTerm}`}>See all results</Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
