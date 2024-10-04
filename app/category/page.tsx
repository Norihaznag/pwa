import React from "react";
import Page from "../components/Page";
import { categories } from "../data/meals";
import Link from "next/link";

const category = () => {
  return (
    <Page className="bg-white flex flex-col p-4 gap-4">
        <h1 className="text-[1.5rem] font-semibold ">Categories</h1>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category:any) => (
          <li  key={category.id} className="p-4 border hover:border-2 hover:border-orange-600">
            <Link href={`/category/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </Page>
  );
};

export default category;
