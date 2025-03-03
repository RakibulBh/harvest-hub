"use client";
import { useState } from "react";
import { ChevronDown, Menu, X, Search, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const navlinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Locations", href: "/locations" },
  { name: "About us", href: "/about" },
  { name: "Contact us", href: "/contact" },
  { name: "Farmers Guide", href: "/farmers" },
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [postcode, setPostcode] = useState("");

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Navbar - Fixed and responsive */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-[#013A40]">
                  Harvest Hub
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {navlinks.map((link) => (
                  <div key={link.name} className="group relative">
                    <Link href={link.href}>
                      <div className="flex items-center gap-1 text-[#013A40] hover:text-[#00B207] transition-colors duration-200">
                        <span className="font-medium">{link.name}</span>
                        <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
                      </div>
                    </Link>
                    <div className="absolute left-0 mt-2 w-48 origin-top-left bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-2 px-4">
                        <Link
                          href="#"
                          className="block py-2 text-sm text-gray-700 hover:text-[#00B207]"
                        >
                          Option 1
                        </Link>
                        <Link
                          href="#"
                          className="block py-2 text-sm text-gray-700 hover:text-[#00B207]"
                        >
                          Option 2
                        </Link>
                        <Link
                          href="#"
                          className="block py-2 text-sm text-gray-700 hover:text-[#00B207]"
                        >
                          Option 3
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Login/Cart Buttons */}
            <div className="hidden md:flex items-center">
              <Link
                href="/login"
                className="px-4 py-2 text-[#013A40] font-medium hover:text-[#00B207] transition-colors"
              >
                Login
              </Link>
              <Link
                href="/cart"
                className="ml-4 bg-[#00B207] px-6 py-2 rounded-full text-white font-medium hover:bg-[#00A000] transition-colors"
              >
                Cart (0)
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#013A40] hover:text-[#00B207] transition-colors"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-md">
              {navlinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 text-[#013A40] font-medium hover:bg-gray-50 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col pt-4 pb-2 space-y-2 border-t border-gray-200 mt-2">
                <Link
                  href="/login"
                  className="px-3 py-2 text-[#013A40] font-medium hover:bg-gray-50 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/cart"
                  className="mx-3 bg-[#00B207] px-4 py-2 rounded-full text-white font-medium text-center hover:bg-[#00A000] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Cart (0)
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/home/home-image.jpg"
            alt="Fresh vegetables and fruits"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col justify-center h-full pt-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                Connecting farmers and people
              </h1>
              <p className="mt-6 text-xl text-white/90">
                Support your local economy and start a sustainable development
                journey.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-8"
              >
                <Link
                  href="/shop"
                  className="inline-flex items-center px-8 py-3 bg-[#00B207] hover:bg-[#00A000] text-white font-semibold rounded-full transition-colors duration-200"
                >
                  Start now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Map Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden bg-[#F7F9FC] shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="p-8 md:p-12 flex flex-col justify-center"
              >
                <h2 className="text-3xl md:text-4xl text-[#013A40] font-semibold leading-tight">
                  Explore over 20,000 farms across the U.K — find your local
                  farm now.
                </h2>
                <div className="mt-10">
                  <label
                    htmlFor="postcode"
                    className="block text-lg text-[#013A40] mb-3"
                  >
                    Search by postcode
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-grow">
                      <input
                        id="postcode"
                        placeholder="Enter postcode"
                        type="text"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        className="w-full rounded-full px-5 py-3 border-2 border-gray-200 focus:border-[#00B207] focus:outline-none transition-colors"
                      />
                      <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                    <button className="bg-[#00B207] hover:bg-[#00A000] text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200">
                      Search
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative h-64 md:h-auto"
              >
                <Image
                  src="/home/map.jpg"
                  alt="UK farm map"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#013A40] rounded-3xl overflow-hidden shadow-xl"
          >
            <div className="p-8 md:p-16 flex flex-col items-center">
              <h2 className="text-3xl md:text-4xl text-white font-semibold text-center">
                Start in 3 simple steps
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 w-full">
                {[
                  { number: 1, text: "Find a farm" },
                  { number: 2, text: "Select items" },
                  { number: 3, text: "Purchase" },
                  { number: 4, text: "Collect" },
                ].map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#00B207] text-white text-2xl font-bold mb-4">
                      {step.number}
                    </div>
                    <p className="text-white text-lg text-center">
                      {step.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-12"
              >
                <Link
                  href="/shop"
                  className="inline-flex items-center px-10 py-3 bg-[#00B207] hover:bg-[#00A000] text-white font-semibold rounded-full transition-colors duration-200"
                >
                  Start now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Farmers Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col"
            >
              <h2 className="text-3xl md:text-4xl text-[#013A40] font-semibold leading-tight">
                Are you a farmer?
              </h2>
              <p className="mt-6 text-lg text-[#013A40]/80">
                You can sell your products through our website. Create a farmer
                account, list your products, and begin selling directly to local
                customers.
              </p>
              <div className="flex flex-wrap gap-6 mt-8">
                <Link
                  href="/farmers/signup"
                  className="inline-flex items-center px-8 py-3 bg-[#00B207] hover:bg-[#00A000] text-white font-semibold rounded-full transition-colors duration-200"
                >
                  Start now
                </Link>
                <Link
                  href="/farmers/guide"
                  className="inline-flex items-center px-4 py-3 text-[#013A40] font-semibold hover:text-[#00B207] transition-colors duration-200"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src="/home/farmer.jpg"
                alt="Happy farmer with produce"
                fill
                style={{ objectFit: "cover" }}
                className="hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl text-[#013A40] font-semibold leading-tight max-w-3xl">
              Fresh from the farm to your door – subscribe for regular,
              locally-sourced food deliveries.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg group"
            >
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-[#013A40] mb-4">
                  Weekly Vegetable Box
                </h3>
                <p className="text-gray-600 mb-6">
                  Seasonal, fresh vegetables delivered weekly to your door.
                </p>
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src="/home/potatoes.jpg"
                    alt="Fresh vegetables"
                    fill
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="mt-6">
                  <Link
                    href="/shop/subscription"
                    className="inline-flex items-center px-6 py-2 bg-[#00B207] hover:bg-[#00A000] text-white font-medium rounded-full transition-colors duration-200 text-sm"
                  >
                    Subscribe now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg group"
            >
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-[#013A40] mb-4">
                  Monthly Meat & Dairy Box
                </h3>
                <p className="text-gray-600 mb-6">
                  Premium local meat and dairy products delivered monthly.
                </p>
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src="/home/packaging.jpg"
                    alt="Packaged farm products"
                    fill
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="mt-6">
                  <Link
                    href="/shop/subscription"
                    className="inline-flex items-center px-6 py-2 bg-[#00B207] hover:bg-[#00A000] text-white font-medium rounded-full transition-colors duration-200 text-sm"
                  >
                    Subscribe now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#013A40]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row gap-8 items-center justify-between"
          >
            <div>
              <h2 className="text-2xl md:text-3xl text-white font-semibold">
                Subscribe to our newsletter
              </h2>
              <p className="mt-2 text-white/80">
                Stay updated with seasonal produce and local farm events.
              </p>
            </div>

            <div className="w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full md:w-64 px-5 py-3 rounded-full focus:outline-none"
                />
                <button className="bg-[#00B207] hover:bg-[#00A000] text-white px-6 py-3 rounded-full font-medium transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
