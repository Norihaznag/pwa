"use client" ;
import React, { useState } from 'react';
import { ShoppingCart, Clock, FlameIcon, Heart } from 'lucide-react';
import Image from 'next/image';

const dummyDish = {
  id: 1,
  title: "Margherita Supreme Pizza",
  description: "Hand-tossed pizza crust topped with our signature tomato sauce, fresh mozzarella, cherry tomatoes, fresh basil leaves, and a drizzle of extra virgin olive oil. Baked to perfection in our wood-fired oven.",
  category: "Pizza",
  prepTime: "20 mins",
  calories: 850,
  spicyLevel: 1,
  rating: 4.8,
  reviews: 128,
  tags: ["Vegetarian", "Chef's Special", "Italian"],
  options: [
    { id: 1, size: "Small (8\")", price: 10.99 },
    { id: 2, size: "Medium (12\")", price: 14.99 },
    { id: 3, size: "Large (16\")", price: 18.99 },
  ]
};

const MainCard = () => {
  const [selectedOption, setSelectedOption] = useState(dummyDish.options[1]);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-white rounded-2xl  overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-1/2 relative">
            <div className="aspect-square relative">
              <Image
                src="/images/placeholder.svg"
                width={400}
                height={400}
                alt={dummyDish.title}
                className="object-cover w-full h-full"
              />
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col">
            <div className="flex-grow">
              {/* Title and Tags */}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{dummyDish.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {dummyDish.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">{dummyDish.description}</p>

              {/* Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">{dummyDish.prepTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FlameIcon className="w-5 h-5 text-orange-500" />
                  <span className="text-sm text-gray-600">{dummyDish.calories} cal</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-yellow-500 text-nowrap">★ {dummyDish.rating}</span>
                  <span className="text-sm text-gray-600 text-nowrap">({dummyDish.reviews} reviews)</span>
                </div>
              </div>

              {/* Size Options */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Choose Your Size</h3>
                <div className="flex flex-wrap gap-3">
                  {dummyDish.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedOption(option)}
                      className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-all duration-200 ${
                        selectedOption.id === option.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      <div className="text-sm font-medium">{option.size}</div>
                      <div className={selectedOption.id === option.id ? 'text-white' : 'text-gray-600'}>
                        ${option.price}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors duration-200">
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">Add to Cart - ${selectedOption.price}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCard;