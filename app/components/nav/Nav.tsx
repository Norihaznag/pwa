"use client";
import { useDispatch, useSelector } from "react-redux";
import { toggle, toggleCart } from "@/app/redux/slices/uiSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu, Pizza, Search, ShoppingCart, User } from 'lucide-react';

const Nav = () => {
  const dispatch = useDispatch();
  const path = usePathname();
  const { items } = useSelector((state) => state.cart);

  const links = [
    { name: "Home", icon: Home, link: "/" },
    { name: "Menu", icon: Pizza, link: "/dishes/all" },
    { name: "Account", icon: User, link: "/user/profile" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-orange-500">
            PorFavor
          </Link>

          {/* Desktop Navigation */}
          <ul className="max-[768px]:hidden md:flex items-center space-x-6">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = path === link.link;
              return (
                <li key={link.name}>
                  <Link
                    href={link.link}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-colors ${
                      isActive 
                        ? 'bg-orange-100 text-orange-500' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <div className="max-[768px]:hidden md:flex relative">
              <input
                type="text"
                placeholder="Search dishes..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
              />
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Cart Button */}
            <button
              onClick={() => dispatch(toggleCart())}
              className="flex items-center space-x-1 px-4 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden md:inline">Cart</span>
              {items.length > 0 && (
                <span className="bg-white text-orange-500 px-2 py-0.5 rounded-full text-sm font-semibold">
                  {items.length}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => dispatch(toggle())}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search - Shown below main nav on mobile */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search dishes..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;