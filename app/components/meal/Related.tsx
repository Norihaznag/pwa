"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getCategoryDishes } from "@/app/api/strapi"; // Assume this API function is available
import DishCard from "../dish/DishCard";

const Related = ({ category }: any) => {
  const [related, setRelated] = useState<any[]>([]);

  useEffect(() => {
    async function fetchRelated() {
      try {
        const data = await getCategoryDishes(category);
        setRelated(data);
      } catch (err: any) {
        console.error("Error fetching related:", err);
      }
    }
    fetchRelated();
  }, [category]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl  mb-4 text-white">Related</h2>
      <div className=" grid grid-flow-col justify-start overflow-x-scroll space-x-4">
        {related.map((dish: any) => (
             <DishCard key={dish.id} dish={dish} className="min-w-[200px]" />

        ))}
      </div>
    </div>
  );
};

export default Related;
