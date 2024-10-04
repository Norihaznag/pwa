"use client";
import React from 'react';
import Image from 'next/image';
import { Sunrise, Sun, Sunset } from 'lucide-react';

const categories = [
  { name: 'breakfast', icon: Sunrise, time: 'Morning Delights', color: 'bg-yellow-100' },
  { name: 'lunch', icon: Sun, time: 'Midday Feasts', color: 'bg-green-100' },
  { name: 'dinner', icon: Sunset, time: 'Evening Cuisine', color: 'bg-indigo-100' },
];

const DishCard = ({ category }:any) => {
  const { name, icon: Icon, time, color } = category;
  
  return (
    <div className={`border-black border-2 overflow-hidden bg-white  ${color}`}>
      <div className="relative h-48">
        <Image
          src={`/images/${name}.jpg`}
          alt={`${name} dish`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold capitalize">{name}</h3>
          <Icon className="w-6 h-6 text-gray-600" />
        </div>
        <p className="text-sm text-gray-600">{time}</p>
      </div>
    </div>
  );
};

const Gallery = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-[80vh]">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        Daily Culinary Journey
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <DishCard key={category.name} category={category} />
        ))}
      </div>
      <div className="mt-8 text-center text-white">
        <p>Explore our carefully curated selection of dishes for each mealtime.</p>
        <p>From sunrise to sunset, we have your palate covered.</p>
      </div>
    </div>
  );
};

export default Gallery;