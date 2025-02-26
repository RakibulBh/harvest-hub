import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    <div className="relative">
      {/* Navbar */}
      <div className="fixed top-5 left-0 right-0 w-auto h-20 bg-white flex items-center px-10 shadow-lg  z-50">
        {[
          { name: "Home", href: "./" },
          { name: "Shop", href: "/shop" },
          { name: "Locations", href: "/locations" },
          { name: "About Us", href: "/about" },
          { name: "Contact Us", href: "/contact" },
        ].map((item, index) => (
          <div key={index} className="relative group flex items-center mx-5">
            <Link
              href={item.href}
              className="text-white text-xl font-semibold flex items-center"
            >
              {item.name}
              <ChevronDown className="ml-2 w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity duration-200" />
            </Link>
            {/* Hover Popup (Tooltip) */}
            <span className="absolute left-1/2 transform -translate-x-1/2 top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-sm py-1 px-3 rounded-md">
              Go to {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
