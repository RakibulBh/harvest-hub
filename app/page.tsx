"use client"; // Enable client-side navigation

import { useRouter } from "next/navigation";
import Header from "./header"; // Import the Header Component
import { Footer } from "./Footer"; // Import the Footer Component

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg flex overflow-hidden border border-gray-200">
          {/* Left Side (User/Business Registration) */}
          <div className="w-1/2 bg-[#2b6144] flex flex-col justify-center items-center p-8 text-white">
            <h2 className="text-2xl font-bold text-center">Are you a Business or User?</h2>
            <p className="text-sm text-center mt-2">You can login or sign up here</p>
            <button 
              className="bg-[#f4b400] hover:bg-[#e0a300] transition-colors text-white px-6 py-2 mt-6 rounded-lg font-semibold"
              onClick={() => router.push("/user-register")} // Navigate to User Registration Page
            >
              Register Now
            </button>
          </div>

          {/* Right Side (Farmer Login Section) */}
          <div className="w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-center text-[#2b6144]">Log in as a Farmer</h2>
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full border-b-2 border-gray-300 p-2 mt-6 text-[#2b6144] focus:border-[#f4b400] focus:outline-none" 
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full border-b-2 border-gray-300 p-2 mt-4 text-[#2b6144] focus:border-[#f4b400] focus:outline-none" 
            />
            <button className="bg-[#f4b400] hover:bg-[#e0a300] transition-colors text-white w-full py-2 mt-6 rounded-lg font-semibold">
              Log in
            </button>
            <p className="text-center mt-4 text-sm text-[#2b6144]">Don't have an Account?</p>
            <button 
              className="bg-[#0f3d3e] hover:bg-[#09302f] transition-colors text-white w-full py-2 mt-2 rounded-lg font-semibold"
              onClick={() => router.push("/register")} // Navigate to Farmer Registration Page
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;







