import { UserRound } from "lucide-react";
import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between bg-white shadow-md p-4 mb-1">
      <h1 className="text-xl font-bold text-customDarkText">Harvest Hub</h1>
      <input
        type="text"
        placeholder="Search..."
        className="bg-customLightGrey rounded-lg p-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
      <div className="flex items-center gap-4">
        <UserRound size={24} className="text-gray-700 cursor-pointer" />
      </div>
    </header>
  );
};
