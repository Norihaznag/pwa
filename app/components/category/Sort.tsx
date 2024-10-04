"use client";
import React, { useState } from "react";
import {  Menu02Icon } from "hugeicons-react";

const Sort = ({options = [
  { value: "latest", label: "Latest" },
  { value: "lowest", label: "Lowest Price" },
] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option:any) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative text-left flex justify-start">
      <div>
        <button
          type="button"
          className="inline-flex justify-between items-center w-full rounded-md  border-gray-300 shadow-sm px-4 py-2 bg-[#414339] text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={toggleDropdown}
        >
          {selectedOption.label}
          <Menu02Icon name="sort" className="ml-2 h-5 w-5" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 top-10 left-0 w-56 rounded-md shadow-lg bg-[#414339] ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option) => (
              <button
                key={option.value}
                className={`${
                  selectedOption.value === option.value ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                } block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 hover:text-gray-900`}
                role="menuitem"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sort;