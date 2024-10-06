"use client";
import React, { useState, useCallback, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import DemoCard from "@/app/components/dish/DemoCard";

const dummyDishes = [
  {
    id: 1,
    attributes: {
      name: "Margherita Pizza",
      description: "Classic pizza with mozzarella and tomato sauce",
      category: "Pizza",
      price: "8.99",
    },
  },
  {
    id: 2,
    attributes: {
      name: "Cheeseburger",
      description: "Juicy beef patty with cheddar cheese and pickles",
      category: "Burgers",
      price: "5.99",
    },
  },
  {
    id: 3,
    attributes: {
      name: "Caesar Salad",
      description: "Fresh romaine lettuce with Caesar dressing",
      category: "Salads",
      price: "4.99",
    },
  },
  {
    id: 4,
    attributes: {
      name: "Spaghetti Carbonara",
      description: "Creamy pasta with pancetta and Parmesan cheese",
      category: "Pasta",
      price: "7.99",
    },
  },
  // Add more dummy data as needed...
];

const AllDishes = () => {
  const [dishes, setDishes] = useState({ data: dummyDishes, meta: null });
  const [categories] = useState(["Pizza", "Burgers", "Salads", "Pasta"]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<{ category: string }>({
    category: "",
  });

  const handleFilterChange = (selectedCategory: string) => {
    setFilters({ category: selectedCategory });
    const filteredDishes = dummyDishes.filter((dish) =>
      dish.attributes.category.toLowerCase().includes(selectedCategory.toLowerCase())
    );
    setDishes({ ...dishes, data: filteredDishes });
  };

  const searchDishes = useCallback(
    (query: string) => {
      setSearchTerm(query);
      if (!query) {
        setDishes({ data: dummyDishes, meta: null });
        return;
      }
      const filteredData = dummyDishes.filter((dish) =>
        Object.values(dish.attributes || {}).some((value) =>
          String(value).toLowerCase().includes(query.toLowerCase())
        )
      );
      setDishes({ data: filteredData, meta: null });
    },
    []
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return <h1 className="p-4 h-16 bg-red-950 text-red-500">{error}</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="container mx-auto px-4 py-6 md:p-8">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
      
       
       

          {/* Search bar */}
          <div className="flex items-center bg-white rounded-full overflow-hidden shadow-md">
            <input
              type="search"
              className="flex-grow px-4 py-2 text-gray-800 bg-transparent placeholder-gray-500 focus:outline-none"
              placeholder="Search Dishes"
              value={searchTerm}
              onChange={(e) => searchDishes(e.target.value)}
            />
            <button
              aria-label="Search"
              className="p-2 text-gray-800 hover:bg-gray-200 transition-colors duration-200"
            >
              <SearchIcon width={24} height={24} />
            </button>
          </div>
        </header>

        <main className="mb-8">
          {dishes.data.length === 0 ? (
            <h1>No dishes found. Try adjusting your search or filters.</h1>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {dishes.data.map((dish: any) => (
                <DemoCard key={dish.id}  dish={dish}  />
              ))}
            </div>
          )}
        </main>

        <footer>
          {/* <Pagination meta={dishes.meta} /> */}
        </footer>
      </div>
    </div>
  );
};

export default AllDishes;
