"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  NotebookText,
  User2,
  UserCircle,
  UserCog,
  Power,
  PlusIcon,
  ArrowLeftCircleIcon,
  Home
} from "lucide-react";
import Link from "next/link";
import { Dish01Icon, Image02Icon } from "hugeicons-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const options = [
    {name : "home" , icon : <Home/>},
    { name: "profile", icon: <User2 /> },
    { name: "users", icon: <UserCircle /> },
    { name: "dishes", icon: <Dish01Icon /> },
    { name: "orders", icon: <NotebookText /> },
    { name: "moderators", icon: <UserCog /> },
    { name: "create", icon: <PlusIcon /> },
    { name: "uploads", icon: <Image02Icon /> },

  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(true);
      } else {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call on initial load

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("toggle menu worked");
  };

  return (
    <div className="h-screen flex ">
      {/* Sidebar */}
      <aside
        className={`md:static  fixed top-0 left-0 h-screen  w-[80%] md:w-52  shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 ">
          <h2 className="font-bold ">PorFavour</h2>
        </div>
        <ul className="flex flex-col ">
          {options.map((opt, index) => (
            <li key={index}>
              <Link
                href={`${opt.name == "home" ? "/admin/dashboard" : `/admin/dashboard/${opt.name}`}`}
                className="flex items-center gap-2 py-2 px-4   transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {opt.icon}
                <span className="capitalize">{opt.name}</span>
              </Link>
            </li>
          ))}

<li key={2}>
              <button
                className="flex items-center gap-2 py-2 px-4  transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Power/>
                <span className="capitalize">log out</span>
              </button>
            </li>

        </ul>
      </aside>

      {isMenuOpen ? (
        <ArrowLeftCircleIcon
          className=" md:hidden fixed bottom-10 bg-black rounded-full text-white  z-50 p-2 right-10 "
          onClick={toggleMenu}
          width={50}
          height={50}
        />
      ) : (
        <Menu
          className=" md:hidden fixed bottom-10 bg-black rounded-full text-white  z-50 p-2 right-10 "
          onClick={toggleMenu}
          width={50}
          height={50}
        />
      )}
    </div>
  );
};

export default Navigation;
