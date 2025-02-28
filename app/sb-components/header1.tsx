"use client";
// components/Navbar.jsx
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const navItems = [
    {
      title: "Shop",
      path: "/shop",
      megaMenu: {
        sections: [
          {
            title: "Categories",
            links: [
              { name: "Fruits", path: "/shop/fruits" },
              { name: "Vegetables", path: "/shop/vegetables" },
              { name: "Dairy", path: "/shop/dairy" },
              { name: "Bakery", path: "/shop/bakery" },
            ],
          },
          {
            title: "Popular Items",
            links: [
              { name: "Seasonal Produce", path: "/shop/seasonal" },
              { name: "Local Favorites", path: "/shop/local" },
              { name: "Organic Selection", path: "/shop/organic" },
              { name: "Weekly Deals", path: "/shop/deals" },
            ],
          },
          {
            title: "Collections",
            links: [
              { name: "Gift Baskets", path: "/shop/gift-baskets" },
              { name: "Recipe Boxes", path: "/shop/recipe-boxes" },
              { name: "Subscription Boxes", path: "/shop/subscriptions" },
            ],
          },
        ],
        featured: {
          title: "Seasonal Spotlight",
          description: "Fresh autumn harvest is here!",
          image: "/autumn-produce.jpg",
          link: "/shop/seasonal-spotlight",
        },
      },
    },
    {
      title: "Locations",
      path: "/locations",
      megaMenu: {
        sections: [
          {
            title: "Our Stores",
            links: [
              { name: "Downtown", path: "/locations/downtown" },
              { name: "Westside", path: "/locations/westside" },
              { name: "Northgate", path: "/locations/northgate" },
              { name: "Eastview", path: "/locations/eastview" },
            ],
          },
          {
            title: "Farm Locations",
            links: [
              { name: "Main Farm", path: "/locations/main-farm" },
              { name: "Partner Farms", path: "/locations/partner-farms" },
              { name: "Pick Your Own", path: "/locations/pick-your-own" },
            ],
          },
        ],
        featured: {
          title: "Visit Our New Location",
          description: "Now open in Southside District!",
          image: "/new-location.jpg",
          link: "/locations/southside",
        },
      },
    },
    {
      title: "About Us",
      path: "/about",
      megaMenu: {
        sections: [
          {
            title: "Our Story",
            links: [
              { name: "History", path: "/about/history" },
              { name: "Mission & Values", path: "/about/mission" },
              { name: "Sustainability", path: "/about/sustainability" },
            ],
          },
          {
            title: "Our Team",
            links: [
              { name: "Leadership", path: "/about/leadership" },
              { name: "Farmers", path: "/about/farmers" },
              { name: "Join Our Team", path: "/about/careers" },
            ],
          },
        ],
        featured: {
          title: "Our Commitment",
          description: "Learn about our sustainable farming practices",
          image: "/sustainability.jpg",
          link: "/about/sustainability",
        },
      },
    },
    {
      title: "Contact Us",
      path: "/contact",
      megaMenu: {
        sections: [
          {
            title: "Get In Touch",
            links: [
              { name: "Customer Service", path: "/contact/customer-service" },
              { name: "Wholesale Inquiries", path: "/contact/wholesale" },
              { name: "Feedback", path: "/contact/feedback" },
            ],
          },
          {
            title: "Support",
            links: [
              { name: "FAQs", path: "/contact/faq" },
              { name: "Shipping Policy", path: "/contact/shipping" },
              { name: "Returns & Refunds", path: "/contact/returns" },
            ],
          },
        ],
        featured: {
          title: "Host an Event",
          description: "Book our space for your next gathering",
          image: "/events.jpg",
          link: "/contact/events",
        },
      },
    },
  ];

  return (
    <header className="bg-white shadow-md ">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-green-600 w-[220px]">
              <img src="logo.png" />
            </span>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-[50px]">
              {navItems.map((item) => (
                <li
                  key={item.title}
                  className="relative group"
                  onMouseEnter={() => setActiveMenu(item.title)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    href={item.path}
                    className="py-8 text-gray-800 font-medium hover:text-green-600 transition-colors duration-300"
                  >
                    {item.title}
                  </Link>

                  {/* Hover indicator line */}
                  <div
                    className={`absolute left-0 right-0 bottom-0 h-1 bg-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out ${
                      activeMenu === item.title ? "scale-x-100" : ""
                    }`}
                  ></div>

                  {/* Mega Menu - Now positioned fixed and centered */}
                  {item.megaMenu && (
                    <div
                      className={`fixed left-0 right-0 w-full bg-white shadow-xl border-t border-gray-200 transition-all duration-500 ease-in-out ${
                        activeMenu === item.title
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-4"
                      }`}
                      style={{ top: "80px", zIndex: 50 }}
                    >
                      <div className="container mx-auto py-8 px-4 max-w-6xl">
                        <div className="grid grid-cols-12 gap-8">
                          {/* Menu Sections */}
                          <div className="col-span-8 grid grid-cols-3 gap-8">
                            {item.megaMenu.sections.map((section) => (
                              <div key={section.title}>
                                <h3 className="font-semibold text-gray-900 mb-4">
                                  {section.title}
                                </h3>
                                <ul className="space-y-2">
                                  {section.links.map((link) => (
                                    <li key={link.name}>
                                      <Link
                                        href={link.path}
                                        className="text-gray-600 hover:text-green-600 transition-colors duration-300"
                                      >
                                        {link.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>

                          {/* Featured Section */}
                          {item.megaMenu.featured && (
                            <div className="col-span-4 bg-gray-50 rounded-lg p-4">
                              <div className="aspect-w-16 aspect-h-9 mb-4 bg-gray-200 rounded-md overflow-hidden">
                                <div className="w-full h-40 bg-green-100 flex items-center justify-center">
                                  <span className="text-green-600 text-sm">
                                    [Featured Image]
                                  </span>
                                </div>
                              </div>
                              <h3 className="font-semibold text-gray-900 mb-2">
                                {item.megaMenu.featured.title}
                              </h3>
                              <p className="text-gray-600 text-sm mb-4">
                                {item.megaMenu.featured.description}
                              </p>
                              <Link
                                href={item.megaMenu.featured.link}
                                className="inline-block px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors duration-300"
                              >
                                Learn More
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-gray-800 hover:text-green-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Semi-transparent overlay when menu is open */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-500 ease-in-out ${
          activeMenu ? "opacity-20 visible" : "opacity-0 invisible"
        }`}
        style={{ zIndex: 40 }}
      ></div>
    </header>
  );
};

export default Navbar;
