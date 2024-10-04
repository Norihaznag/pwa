"use client";
import Cartitem from "./Cartitem";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "@/app/redux/slices/cartSlice";
import { HideAdmincart  } from "@/app/redux/slices/uiSlice";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {Cancel01Icon, ShoppingBag03Icon} from 'hugeicons-react'
import { Trash2Icon } from "lucide-react";

const AdminCart = ({ onClearCart }: any) => {
  const router = useRouter();
  const { items = [], total = 0 } =
    useSelector((state: any) => state.cart) || {};
  const { admincart } = useSelector((state: any) => state.ui);
  const dispatch = useDispatch();

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: admincart ? 0 : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed right-0 top-16 md:top-0 h-[80vh] md:min-h-screen w-full sm:w-1/3 bg-[#272822] text-white z-50 flex flex-col rounded-l-lg overflow-hidden  "
    >
      <div className="flex justify-between items-center p-2 ">
        <h1 className="text-2xl font-semibold">Your Cart</h1>
        <button
          onClick={() => dispatch(HideAdmincart())}
          className="p-2 rounded-full bg-gray-800 transition-colors duration-200"
        >
          <Cancel01Icon  color="white" />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="flex-grow flex items-center justify-center text-gray-500 p-4">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className=" overflow-y-auto p-1">
            <ul className="grid grid-cols-2 justify-stretch gap-2 w-full items-stretch ">
              {items.map((item: any, index: number) => (
                <Cartitem
                  key={item.id}
                  item={item}
                  onRemoveItem={() => dispatch(removeItem(item))}
                  index={index}
                />
              ))}
            </ul>
          </div>
          <div className="p-4   ">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg">Total:</span>
              <span className="text-xl font-semibold ">
                ${total.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <button
                onClick={onClearCart}
                className="flex-1 flex gap-2 bg-black  px-4 py-2 rounded-full text-red-700 transition-colors"
              >
                <Trash2Icon/>
                Clear Cart 
              </button>
              <button
                className="flex-1 flex gap-2 bg-white  px-4 py-2 rounded-full text-black  transition-colors"
                onClick={() => router.push("/checkout")}
              >
                 <ShoppingBag03Icon/> Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default AdminCart;
