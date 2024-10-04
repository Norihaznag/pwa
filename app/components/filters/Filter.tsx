"use client" ;
import React, { useState } from 'react';
const Filters = ({ categories = [], onFilterChange }:any) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange =  (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const value =  e.target.value;
    setSelectedCategory(value);
    onFilterChange( value );
    console.log(value)
  };

 

  return (
    <div className=" w-fit rounded-lg">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category Filter */}
        <div>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className=" block w-full py-2 px-4  bg-[#414339] text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500  focus:border-indigo-500"
          >
            <option value="">Categories</option>
            {categories.data.map((category:any) => (
              <option key={category.id} value={category.attributes.name}>
                {category.attributes.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default Filters;
