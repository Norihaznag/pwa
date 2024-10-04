"use client";
import { fillOrder } from "@/app/api/strapi";
import { sendOrderToWhatsApp } from "@/app/functions/functions";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

interface FormData {
  name: string;
  address: string;
  phone: string;
  cart: any; // Consider defining a more specific type for cart
}

export default function Checkout() {
  const cart = useSelector((state: any) => state.cart);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    phone: "",
    cart: cart,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [succes, setSucces] = useState<string | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("checkoutData");
    if (savedData) {
      setFormData(prevData => ({...JSON.parse(savedData), cart}));
    }
  }, [cart]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [id]: value };
      localStorage.setItem("checkoutData", JSON.stringify(newData));
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fillOrder(formData);
      console.log("Success", response);
      // Consider adding success feedback to the user
      // You might want to call sendOrderToWhatsApp here if needed
    } catch (error: any) {
      console.error("Error filling order:", error.response ? error.response.data : error.message);
      setError("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" sm:w-96 text-white bg-[#272822] rounded-lg p-10 w-full">
      <h1 className="text-2xl ">Checkout</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} >
        <div >
          <label htmlFor="name" className="block text-sm font-medium ">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-3 block w-full rounded-md placeholder-gray-400 border-gray-300 shadow-sm focus:border-indigo-300 bg-[#414339] focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium ">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-300 focus:ring bg-[#414339] focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium ">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block p-3 w-full rounded-md bg-[#414339] border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}