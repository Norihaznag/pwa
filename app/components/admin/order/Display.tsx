"use client";
import { NotepadText, X } from "lucide-react";
import Cart from "./Cart";

const Display = ({ order, onClose }: any) => {
  if (!order) return null;

  const { id, attributes } = order;
  const { cart, name, address, phone, createdAt } = attributes;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-2 md:p-8 md:left-20">
      <div className="w-full md:w-[80%] max-h-[80vh] bg-black rounded-lg shadow-md text-white p-5 overflow-y-auto relative">
        <X
          className="absolute right-2 hover:bg-[#3f0000] bg-[#2c0000] p-1 rounded-lg "
          width={40}
          height={40}
          onClick={onClose}
        />
        <div className="text-4xl gap-2 items-center font-bold mb-5 flex">
          <NotepadText width={40} height={40} /> Order #{id}
        </div>
        <ul
          id="order-info"
          className="space-y-2 mb-6 grid md:grid-cols-2 p-5 bg-[#272727] rounded-lg"
        >
          <li>
            Name: <span className="font-semibold">{name}</span>
          </li>
          <li>
            Address: <span className="font-semibold">{address}</span>
          </li>
          <li>
            Phone: <span className="font-semibold">{phone}</span>
          </li>
          <li>
            Created At:{" "}
            <span className="font-semibold">
              {new Date(createdAt).toLocaleString()}
            </span>
          </li>
        </ul>
        {cart && <Cart items={cart.items} total={cart.total} />}
      </div>
    </div>
  );
};

export default Display;
