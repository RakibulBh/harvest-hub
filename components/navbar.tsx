import React from "react";

const Navbar = () => {
  return (
    <div className="h-16 bg-black w-full p-5 flex flex-row items-center justify-between">
      <div className="flex flex-row gap-2">
        <p className="text-white font-bold text-2xl">Harvest Hub</p>
      </div>
      <button className="bg-red-100 text-black p-3 rounded-md">Login</button>
    </div>
  );
};

export default Navbar;
