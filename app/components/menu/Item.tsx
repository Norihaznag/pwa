import Link from "next/link";
import React from "react";
import Icon from "../icon/Icon";
import { meals } from "@/app/data/meals";

const Item = ({name = '', length = 0 }) => {
  const categoryLength = meals.filter((meal)=> meal.detail.category == name ).length ;


  return (
    <li>
      <Link
        href={`/category/${name}`}
        className="flex gap-4 focus:bg-[#dba100] rounded-[19px] p-3 justify-between text-white "
      >
        
        <div className=" capitalize flex gap-5">
        {/* <Icon name="pizza" /> */}
        <h2>{name}</h2>
        </div>
        <h1 className="length ">
            {`(${length})`}
        </h1>
      </Link>
    </li>
  );
};

export default Item;
