"use client" ;
import React, { useState } from 'react';
import { Clock, Cog, Truck, CheckCircle } from 'lucide-react';

const CustomSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('pending');

  const options = [
    { value: 'pending', label: 'Pending', icon: <Clock size={16} />, color: 'bg-yellow-600' },
    { value: 'processing', label: 'Processing', icon: <Cog size={16} />, color: 'bg-purple-600' },
    { value: 'shipped', label: 'Shipped', icon: <Truck size={16} />, color: 'bg-blue-600' },
    { value: 'delivered', label: 'Delivered', icon: <CheckCircle size={16} />, color: 'bg-green-600' },
  ];

  const handleSelect = (value :any) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const selectedOptionData :any = options.find(opt => opt.value === selectedOption);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 text-white text-sm rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 transition-colors duration-200 ease-in-out capitalize flex items-center justify-between"
      >
        <span className="flex items-center">
          <span className="mr-2">{selectedOptionData.icon}</span>
          {selectedOptionData.label}
        </span>
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-gray-800 rounded-md shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`${option.color} hover:bg-opacity-80 text-white p-2 cursor-pointer flex items-center transition-colors duration-200 ease-in-out`}
            >
              <span className="mr-2">{option.icon}</span>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect