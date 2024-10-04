"use client";
import CartItem from "../admin/cart/Cartitem";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, clearCart } from "@/app/redux/slices/cartSlice";
import { hideCart } from "@/app/redux/slices/uiSlice";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Cancel01Icon, ShoppingBag03Icon } from 'hugeicons-react';
import { Trash2Icon } from "lucide-react";

const Cart = ({ onClearCart }: any) => {
  const router = useRouter();
  const { items = [], total = 0 } = useSelector((state: any) => state.cart) || {};
  const { cart } = useSelector((state: any) => state.ui);
  const dispatch = useDispatch();

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: cart ? 0 : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed right-0 top-16 md:top-0 h-[80vh] md:min-h-screen w-full sm:w-1/3 bg-white shadow-lg z-50 flex flex-col rounded-l-lg overflow-hidden"
    >
      <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
        <h1 className="text-xl font-semibold text-gray-800">Your Cart</h1>
        <button
          onClick={() => dispatch(hideCart())}
          className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-all"
        >
          <Cancel01Icon color="red" />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="flex-grow flex items-center justify-center text-gray-400 p-4">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div>
          <div className="overflow-y-auto p-4">
            <ul className="grid grid-cols-1 gap-4">
              {items.map((item: any, index: number) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemoveItem={() => dispatch(removeItem(item))}
                  index={index}
                />
              ))}
            </ul>
          </div>
          <div className="p-4 bg-gray-100 border-t">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg text-gray-800">Total:</span>
              <span className="text-xl font-semibold text-gray-900">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <button
                onClick={() => dispatch(clearCart())}
                className="flex-1 flex gap-2 items-center bg-red-100 hover:bg-red-200 px-4 py-2 rounded-full transition-all text-red-600"
              >
                <Trash2Icon />
                Clear Cart
              </button>
              <button
                onClick={() => router.push("/checkout")}
                className="flex-1 flex gap-2 items-center bg-green-100 hover:bg-green-200 px-4 py-2 rounded-full transition-all text-green-600"
              >
                <ShoppingBag03Icon />
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
