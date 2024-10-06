"use client" ;
import React, { useState } from 'react';
import { Menu, X, Home, Users, Settings, BarChart2, Bell } from 'lucide-react';
import Image from 'next/image';

export default function AdminNavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Home, text: 'Dashboard' },
    { icon: Users, text: 'Users' },
    { icon: BarChart2, text: 'Analytics' },
    { icon: Settings, text: 'Settings' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and hamburger menu */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">AdminPanel</span>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
              >
                <item.icon className="w-5 h-5 inline-block mr-1" />
                {item.text}
              </button>
            ))}
          </div>

          {/* Notification and profile */}
          <div className="hidden md:flex items-center">
            <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 focus:outline-none">
              <Bell className="h-6 w-6" />
            </button>
            <div className="ml-3">
              <button className="flex items-center">
                <Image
                  className="h-8 w-8 rounded-full"
                  src="/api/placeholder/32/32"
                  alt="User avatar"
                  width={32}
                  height={32}
                />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 w-full text-left"
            >
              <item.icon className="w-5 h-5 inline-block mr-2" />
              {item.text}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}