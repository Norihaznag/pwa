"use client";
import React, { useEffect, useState } from "react";
import { addcategory, getall } from "@/app/api/strapi";
import { meals } from "../data/meals";
import Page from "../components/Page";
// import Mealcard from "../components/meal/Mealcard";
import DishCard from "../components/dish/DishCard";

const Test = () => {
  const [dishes, setDishes]:any = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchDishes() {
    try {
      setIsLoading(true);
      const data = await getall();
      setDishes(data || []);
    } catch (err: any) {
      console.error("Error fetching dishes:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchDishes();
  }, []);
  // console.log(dishes);

  return (
    <Page className="flex w-full  items-center p-5">
      <div className="grid md:grid-cols-3 w-full">
        {dishes.map((dish:any) => (

          <DishCard key={dish.id} dish={dish}/>
          

          
        ))}
      </div>
    </Page>
  );
};

export default Test;
