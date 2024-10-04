"use client";
import { getData } from "@/app/api/strapi";
import AdminCart from "@/app/components/admin/cart/AdminCart";
import Filter from "@/app/components/filters/Filter";
import { useEffect, useState } from "react";
import { ShoppingBag02Icon } from "hugeicons-react";
import { useDispatch } from "react-redux";
import { ShowAdmincart } from "@/app/redux/slices/uiSlice";
import Pagination from "@/app/components/pagination/Pagination";
import DishCard from "@/app/components/dish/DishCard";

interface Dish {
  id: number;
  attributes: {
    [key: string]: any;
  };
}

interface Category {
  id: number;
  attributes: {
    name: string;
  };
}

interface Meta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

const Order: React.FC = () => {
  const [order, setOrder]:any = useState([]);
  const [dishes, setDishes] :any = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{ category: string }>({
    category: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const dishesData = await getData({ data: "dishes?populate=*", meta: true });
        setDishes(dishesData.data || []); // Ensure dishesData.data is not null
        setMeta(dishesData.meta || null); // Ensure meta is not null
        const categoriesData = await getData({ data: "categories" });
        console.log('categories', categoriesData)
        setCategories(categoriesData || []); // Ensure categoriesData.data is not null
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchFilteredData = async () => {
      if (!filters.category) return;
      setIsLoading(true);
      setError(null);
      try {
        const query = `dishes?filters[category][name][$contains]=${filters.category}&populate=*`;
        const filteredDishes = await getData({ data: query, meta: true });
        setDishes(filteredDishes.data || []); // Ensure filteredDishes.data is not null
        setMeta(filteredDishes.meta || null); // Ensure meta is not null
      } catch (error) {
        console.error("Error filtering data:", error);
        setError("Failed to filter data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFilteredData();
  }, [filters.category]);

  const filteredDishes = dishes.filter((dish: Dish) =>
    Object.values(dish.attributes || {}).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  console.log(`filteredDishes:`, filteredDishes)
  console.log(`categories:`, categories)


  const handleFilterChange = (selectedCategory: string) => {
    setFilters({ category: selectedCategory });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">
        {filters.category || "Available Dishes"}
      </h2>
      <AdminCart />

      <div className="search flex gap-2 h-12 mb-4">
        <input
          type="search"
          className="h-full bg-black text-white w-full indent-3 rounded-lg"
          placeholder="Search Orders"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className={`${
            window.scrollY > 0 ? "fixed" : "block"
          } cart bg-white max-w-fit p-5 gap-4 flex items-center  px-5 rounded-lg`}
          onClick={() => {
            dispatch(ShowAdmincart());
          }}
        >
          Cart <ShoppingBag02Icon />
        </button>
      </div>

      <div className="filters min-h-[6rem] w-full mb-4">
        <Filter categories={categories} onFilterChange={handleFilterChange} />
      </div>

      <div className="grid md:grid-cols-3 justify-start gap-4 w-full transition-all">
        {filteredDishes.length > 0 ? (
          filteredDishes.map((dish: any) => (
            <DishCard
              key={dish.id}
              dish={dish}
            />
          ))
        ) : (
          <p>No dishes available at the moment.</p>
        )}
      </div>
      {meta && <Pagination meta={meta} />}
    </div>
  );
};

export default Order;
