"use client";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Item from "../menu/Item";
// import {categories} from "@/app/data/meals";
import Icono from "./Icono";
import { getCategories } from "@/app/api/strapi";

const Window = ({ className }: any) => {
  const { window } = useSelector((state: any) => state.ui);
  const [categories, setCatgrs] = useState([]);

  async function fetchcats() {
    try {
      const data = await getCategories();
      setCatgrs(data || []);
    } catch (err: any) {
      console.error("Error fetching dishes:", err);
    }
  }

  useEffect(() => {
    fetchcats();
  }, []);

  return (
    <div
      className={`h-screen ${className} scroll-smooth w-full absolute z-30 transition    ${
        window ? "translate-x-0" : "-translate-x-full  "
      } `}
    >
      <div className="menu  flex flex-col w-[90%] md:w-1/4    p-4 shadow-[0px_4px_4px_0px_#00000040] rounded-3xl gap-4 bg-[#272822] ">
        <h1 className="text-[1.4rem] text-orange-600">Menu</h1>
        <ul className="main    grid grid-flow-row gap-2 border-[#828282] text-black overflow-y-scroll max-h-[50vh] align-top  ">
          {categories.filter((category:any)=> category.attributes.dishes.data.length !== 0).map((category: any, index: any) => (
            <Item
              name={category.attributes.name}
              key={category.id}
              length={category.attributes.dishes.data.length}
            />
          ))}
        </ul>
        <div className="bottom flex gap-2 ">
         
        </div>
      </div>
    </div>
  );
};

export default Window;
