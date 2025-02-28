"use client";
import Link from "next/link";
import { useState } from "react";

// React Icons
import { FcBarChart } from "react-icons/fc";
import { FcDocument } from "react-icons/fc";
import { FcSettings } from "react-icons/fc";
import { FcSms } from "react-icons/fc";
import { TbAppleFilled } from "react-icons/tb";
import { Menu, CircleUserRound } from "lucide-react";
import { MdOutlineOtherHouses } from "react-icons/md";
import { PiBasket } from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";
import { BiMessageSquareDetail } from "react-icons/bi";
import { VscPreview } from "react-icons/vsc";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      {/* Sidebar Section */}
      <div className="flex">
        <div
          className={` bg-slate-200  text-customDarkText p-4 transition-all duration-200 min-h-screen ${
            isOpen ? "w-[270px]" : "w-[90px]"
          }`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mb-4 p-2 bg rounded  ml-2"
          >
            <Menu size={24} />
          </button>
          <nav className="flex flex-col gap-4  pl-2">
            {[
              {
                icon: <MdOutlineOtherHouses size={24} />,
                text: "Home",
                link: "/Profile",
              },
              {
                icon: <PiBasket size={24} />,
                text: "Products",
                link: "/Products",
              },
              {
                icon: <LuLayoutDashboard size={24} />,
                text: "Dashboard",
                link: "/Dashboard",
              },
              {
                icon: <BiMessageSquareDetail size={24} />,
                text: "Inbox",
                link: "/inbox",
                special: true, // Add a special flag for custom styling
              },
              {
                icon: <VscPreview size={24} />,
                text: "Reviews",
                link: "/review",
              },
            ].map((item, index) => (
              <Link key={index} href={item.link || "#"}>
                <div
                  className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer ${
                    item.special
                      ? "text-white bg-green-600 hover:bg-customLightGreen" // Unique styling for Inbox
                      : "hover:bg-gray-200"
                  }`}
                >
                  {item.icon}
                  {isOpen && <span>{item.text}</span>}
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
