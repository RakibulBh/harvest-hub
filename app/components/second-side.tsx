import { useState } from "react";
import {
  Search,
  Plus,
  Inbox,
  Send,
  Trash2,
  ShieldAlert,
  Menu,
} from "lucide-react";

export default function Sidebar2() {
  const [active, setActive] = useState("Inbox");
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Compose", icon: Plus },
    { name: "Inbox", icon: Inbox },
    { name: "Sent", icon: Send },
    { name: "Spam", icon: ShieldAlert },
    { name: "Trash", icon: Trash2 },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Sidebar Toggle Button at the Top */}
      <button
        className="p-2 m-2 bg-gray-200 rounded-md self-start"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>

      {isOpen && (
        <div className="w-64 h-screen bg-gray-100 p-4 shadow-lg flex flex-col">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search
              className="absolute left-3 top-2.5 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search mail"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
                  active === item.name
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActive(item.name)}
              >
                <item.icon size={20} />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
