"use client";
import React from "react";
import Item from "../menu/Item";
import { categories } from "@/app/data/meals";
import Icono from "./Icono";

const Aside = ({ className }: any) => {

  return (
    <div className="menu  flex flex-col w-[90%] md:w-1/4    p-4 shadow-[0px_4px_4px_0px_#00000040] gap-4 bg-white max-h-[90vh] ">
      <h1 className="text-[1.4rem]">Menu</h1>
      <ul className="scroller main bg-white  grid grid-flow-row gap-2 border-[#828282] text-black overflow-y-scroll max-h-[50vh] align-top  ">
        {categories.map((category: any, index: any) => (
          <Item name={category} key={index} />
        ))}
      </ul>
      <div className="bottom flex gap-2 ">
        <Icono
          name="user"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 md:hidden"
        />
      </div>
    </div>
  );
};

export default Aside;
