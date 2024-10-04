import React, { useState } from "react";
import { ShoppingBasket01Icon } from "hugeicons-react";

const AddToCartButton = ({cb}:any) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleAddToCart = () => {
    // Trigger the click animation
    setIsClicked(true);

    // Reset the animation state after the animation duration
    setTimeout(() => setIsClicked(false), 300);
    // Add your cart logic here
    console.log("Item added to cart!");
    cb()
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`md:p-3 p-2 px-4 justify-center text-sm mt-2 bg-[#ffffff] text-[#000000] hover:bg-[#ffffff] hover:text-black rounded-full shadow transition-transform duration-200 flex items-center gap-2 capitalize ${
        isClicked ? "animate-clicked" : ""
      }`}
      style={{
        transform: isClicked ? "scale(0.95)" : "scale(1)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        boxShadow: isClicked ? "0px 0px 15px rgba(0, 0, 0, 0.2)" : "none",
      }}
    >
      <ShoppingBasket01Icon />
      add to cart
    </button>
  );
};

export default AddToCartButton;
