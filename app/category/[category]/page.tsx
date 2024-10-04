"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Sort from "@/app/components/category/Sort";
import { getData } from "@/app/api/strapi";
import DishCard from "@/app/components/dish/DishCard";
import Pagination from "@/app/components/pagination/Pagination";

interface Dish {
  id: string;
  attributes: {
    title: string;
    description: string;
    category: {
      data: {
        attributes: {
          name: string;
        };
      };
    };
    options: Array<{
      id: string;
      size: string;
      price: number;
    }>;
    thumbnail: {
      data: {
        attributes: {
          formats: {
            thumbnail: {
              url: string;
              name: string;
            };
          };
        };
      };
    };
  };
}

interface DishesData {
  data: Dish[];
  meta: any;
}

const Category: React.FC = () => {
  const params = useParams();
  const { category } = params;
  const [dishes, setDishes] = useState<DishesData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const dishesData = await getData({
          data: `dishes?filters[category][name]=${category}&populate=*`,
          meta: true,
        });
        setDishes(dishesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [category]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen  text-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <div className="bg-red-600 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!dishes || dishes.data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <div className="bg-yellow-600 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">No Dishes Found</h2>
          <p>There are no dishes available in this category.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-wrap justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold mb-4 sm:mb-0">
            {category}
          </h1>
          <Sort />
        </header>

        <main className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dishes.data.map((dish: Dish) => (
              <DishCard key={dish.id} dish={dish} mobile={true} />
            ))}
          </div>
        </main>

        <footer>
          <Pagination meta={dishes.meta} />
        </footer>
      </div>
    </div>
  );
};

export default Category;