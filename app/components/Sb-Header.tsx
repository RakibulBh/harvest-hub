import Link from "next/link";

import React, { useState, useEffect } from "react";
import {
  Search,
  Heart,
  UserRound,
  ShoppingCart,
  House,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";

type HeaderProps = {
  cartTotal: number;
};

export const Header: React.FC<HeaderProps> = ({ cartTotal }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div>
        <div className="title container     bg-white border-customGrey border-b-[1px] min-w-full h-18 flex justify-between items-center p-5 pl-12">
          <div className="title             text-customDarkGreen text-3xl font-semibold">
            Harvest Hub
          </div>
          <div className="flex items-center gap-2 md:gap-2">
            <div className="relative flex items-center group">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mr-2 w-0 opacity-0 transition-all duration-300 ease-in-out p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 group-hover:w-48 group-hover:opacity-100"
              />
              <Search size={24} />
            </div>

            {[
              { icon: <Heart size={24} />, link: "/liked" },
              { icon: <UserRound size={24} />, link: "/profile" },
              { icon: <ShoppingBag size={24} />, link: "/cart" },
            ].map((item, index) => (
              <Link key={index} href={item.link || "#"}>
                <button className="text-customDarkGreen hover:text-green-900  md:block p-2 hover:bg-gray-300 rounded-full transition-all duration-200 flex items-center">
                  {item.icon}
                  {item.link === "/cart" && (
                    <span className="bg-green-600 text-white text-xs rounded-full px-2 py-1 ml-2 flex items-center">
                      {cartTotal}
                    </span>
                  )}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="Navbar container bg-white border-customGrey w-full h-12 border-b-2 items-center justify-center p-3">
        <ul className="Navbar text flex space-x-10 pl-10 pr-8">
          <li className="Home text-gray-600 hover:text-lg transition-all duration-200">
            <a href="./">Home</a>
          </li>
          <li className="shop relative group ">
            <a
              className="text-customDarkGreen font-semibold hover:text-lg transition-all duration-200"
              href="/shop"
            >
              Shop
            </a>
            <ul className="absolute hidden group-hover:block bg-gray-600 bg-opacity-50 text-white rounded-lg p-4 z-10">
              <li className="hover:bg-gray-400 px-4 py-2 rounded-lg">
                <a href="/shop/vegetables">Vegetables</a>
              </li>
              <li className="hover:bg-gray-400 px-4 py-2 rounded-lg">
                <a href="/shop/meat">Meat</a>
              </li>
              <li className="hover:bg-gray-400 px-4 py-2 rounded-lg">
                <a href="/shop/dairy">Dairy</a>
              </li>
              <li className="hover:bg-gray-400 px-4 py-2 rounded-lg">
                <a href="/shop/bakery">Bakery</a>
              </li>
            </ul>
          </li>
          <li className="Locations relative group">
            <a
              className="text-gray-600 hover:text-lg transition-all duration-200"
              href="/Locations"
            >
              Locations
            </a>
            <ul className="absolute hidden group-hover:block bg-gray-800 text-white rounded-lg p-4 z-10">
              <li className="hover:bg-gray-700 px-4 py-2 rounded-lg">
                <a href="/Locations/">Near Me</a>
              </li>
              <li className="hover:bg-gray-700 px-4 py-2 rounded-lg">
                <a href="/Locations/">Favorites</a>
              </li>
            </ul>
          </li>
          <a
            className="text-gray-600 hover:text-lg transition-all duration-200"
            href="/About_Us"
          >
            About Us
          </a>
          <a
            className="text-gray-600 hover:te xt-lg transition-all duration-200"
            href="/Contact_Us"
          >
            Contact Us
          </a>
        </ul>
      </div>
      <div
        className="header__Image__Container relative overflow-hidden bg-cover bg-no-repeat p-12 text-left w-full h-28"
        style={{
          backgroundImage: "url('/picturesForShop/top7.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1>
          <div className="flex items-center">
            {" "}
            {/* Flex container for horizontal alignment */}
            {[
              { icon: <House size={24} />, link: "./" },
              { icon: <ChevronRight size={24} /> },
            ].map((item, index) => (
              <Link key={index} href={item.link || "#"}>
                <div className="flex items-center gap-4 p-2 rounded-lg cursor-pointer">
                  {item.icon}
                </div>
              </Link>
            ))}
            <a className="text-yellow-500 text-xl font-semibold" href="/shop">
              {" "}
              shop
            </a>{" "}
            {/* No margin needed here */}
          </div>
        </h1>
      </div>
    </>
  );
};
