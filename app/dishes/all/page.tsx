"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { getData } from "@/app/api/strapi";
import DishCard from "@/app/components/dish/DishCard";
import Pagination from "@/app/components/pagination/Pagination";
import Filters from "@/app/components/filters/Filter";
import { SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";


const AllDishes = () => {
  const [dishes, setDishes]:any = useState({ data: [], meta: null });
  const [categories, setCategories]:any = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<{ category: string }>({
    category: "",
  });
  const srchParam = useSearchParams().get("search");
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [dishesData, categoriesData] = await Promise.all([
        getData({ data: "dishes?populate=*", meta: true }),
        getData({ data: "categories" }),
      ]);
      setDishes(dishesData);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchFilteredData = useCallback(async () => {
    if (!filters.category) return;
    setIsLoading(true);
    setError(null);
    try {
      const query = `dishes?filters[category][name][$contains]=${filters.category}&populate=*`;
      const filteredDishes = await getData({ data: query, meta: true });
      setDishes(filteredDishes);
    } catch (error) {
      console.error("Error filtering data:", error);
      setError("Failed to filter data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [filters.category]);

  useEffect(() => {
    fetchFilteredData();
  }, [fetchFilteredData]);

  const handleFilterChange = (selectedCategory: string) => {
    setFilters({ category: selectedCategory });
  };

  const searchDishes = useCallback(
    (query: string) => {
      setSearchTerm(query);
      if (!query) {
        fetchData(); // Reset to original data if query is empty
        return;
      }
      const filteredData = dishes.data.filter((dish: any) =>
        Object.values(dish.attributes || {}).some((value) =>
          String(value).toLowerCase().includes(query.toLowerCase())
        )
      );
      setDishes({ ...dishes, data: filteredData });
    },
    [dishes, fetchData]
  );

  const HandelDeletetion = async (id:any) => {
    setIsLoading(true);
    setError(null);
    try {
      await  deleteData({
            entry : 'dishes',
            id : id
          })
    } catch (err) {
      setError('Failed to delete item');
      console.error('Error deletion item:', err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen  text-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return <h1 className="p-4 h-16 bg-red-950 text-red-500">{error}</h1>;
  }

  return (
    <div className="min-h-screen  text-white">
      <div className="container mx-auto px-4 py-6 md:p-8">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          
            <div className="flex gap-2">
             
              <Filters
                onFilterChange={handleFilterChange}
                categories={categories}
              />
            </div>
          
          

          <div className="flex items-center bg-[#414339] rounded-full overflow-hidden shadow-md  ">
            <input
              type="search"
              className=" flex-grow px-4 py-2 text-white bg-transparent placeholder-gray-400 focus:outline-none  "
              placeholder="Search Dishes"
              value={searchTerm}
              onChange={(e) => searchDishes(e.target.value)}
            />
            <button
              aria-label="Search"
              className="p-2 text-white hover:bg-[#5d5f56] transition-colors duration-200"
            >
              <SearchIcon width={24} height={24} />
            </button>
          </div>
        </header>

        <main className="mb-8 ">
          {dishes.data.length === 0 ? (
            <h1>No dishes found. Try adjusting your search or filters.</h1>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {dishes.data.map((dish: any) => (
                <DishCard key={dish.id} dish={dish} mobile={true} />
                 ))}
            </div>
          )}
        </main>

        <footer>
          <Pagination meta={dishes.meta} />
        </footer>
      </div>
    </div>
  );
};

export default AllDishes;
