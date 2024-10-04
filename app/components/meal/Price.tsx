import React from "react";

const Price = ({ opt, handleDecrement, handleIncrement }: any) => {
  return (
    <div className="flex items-center hover:border-[#c9209e66] border-2 rounded-lg px-2 text-nowrap">
      <div className="flex flex-col">
        <span className="capitalize text-xs">{opt.size}</span>
        <span className="text-[1.3rem] font-semibold text-[#ee007b]">
          {opt.price} <span className="text-xs">dh</span>
        </span>
      </div>
      <button
        className="rounded-lg mx-2 border p-2 transition duration-300 z-10"
        onClick={handleDecrement}
      >
        -
      </button>
      <span className="text-xl mx-1">{opt.quantity}</span>
      <button
        className="p-2 border rounded-lg mx-2 transition duration-300 z-10"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
};

export default Price;
