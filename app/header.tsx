import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-[#0f3d3e] text-white py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-lg font-bold">Harvest Hub</h1>

      {/* Navigation */}
      <nav className="flex space-x-6">
        <div className="relative group">
          <button className="flex items-center space-x-1">
            <span>Browse</span>
            <span>▼</span>
          </button>
          {/* Dropdown Menu */}
          <div className="absolute hidden group-hover:block bg-white text-black rounded-md mt-2 py-2 shadow-lg w-32">
            <Link href="#" className="block px-4 py-2 hover:bg-gray-200">
              Fruits
            </Link>
            <Link href="#" className="block px-4 py-2 hover:bg-gray-200">
              Vegetables
            </Link>
          </div>
        </div>

        <div className="relative group">
          <button className="flex items-center space-x-1">
            <span>Locations</span>
            <span>▼</span>
          </button>
          <div className="absolute hidden group-hover:block bg-white text-black rounded-md mt-2 py-2 shadow-lg w-32">
            <Link href="#" className="block px-4 py-2 hover:bg-gray-200">
              UK
            </Link>
            <Link href="#" className="block px-4 py-2 hover:bg-gray-200">
              Europe
            </Link>
          </div>
        </div>

        <Link href="#" className="hover:text-gray-300">
          Contact
        </Link>
        <Link href="#" className="hover:text-gray-300">
          About us
        </Link>
      </nav>
    </header>
  );
};

export default Header;

