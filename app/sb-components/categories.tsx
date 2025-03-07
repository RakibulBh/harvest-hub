import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

function Categories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const images = {
    categories: "/picturesForShop/categories.jpg",
    dried: "/picturesForShop/exotics.jpg",
    supplements: "/picturesForShop/eggs.jpg",
    bars: "/picturesForShop/breads.jpg",
    drinks: "/picturesForShop/orange_juice.jpg",
  };

  // Scroll-triggered section variants
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Stagger children variant
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  // Individual item hover variant
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="px-4 lg:px-[199.5px] mb-[50px] mt-[50px]"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Intro Box with Nuts */}
        <motion.div
          variants={sectionVariants}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
          className="relative overflow-hidden rounded-lg md:col-span-5"
        >
          {/* Background Image covering entire container */}
          <div className="absolute inset-0">
            <Image
              src={images.categories}
              alt="Natural Nuts"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          {/* Content overlay with semi-transparent background */}
          <div
            className="relative z-10 p-6 flex flex-col justify-between h-full"
            style={{ minHeight: "400px" }}
          >
            <motion.div
              variants={sectionVariants}
              className="rounded-lg inline-block"
            >
              <h2 className="text-3xl font-black">
                IT'S YOUR
                <br />
                FIRST TIME?
              </h2>
              <p className="mt-2">Explore categories!</p>
            </motion.div>

            <motion.div variants={sectionVariants} className="mt-auto">
              <span className="bg-black text-white px-4 py-2 rounded-full text-xs uppercase font-bold inline-block">
                NATURAL NUTS
              </span>
            </motion.div>
          </div>

          {/* Clickable link overlay */}
          <Link href="#nuts">
            <span className="absolute inset-0 z-20"></span>
          </Link>
        </motion.div>

        {/* Main content grid */}
        <motion.div
          variants={sectionVariants}
          className="md:col-span-5 grid grid-cols-1 gap-4"
        >
          {/* Dried Fruits and Supplements row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dried Fruits - Half width */}
            <motion.div
              variants={sectionVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              className="relative rounded-lg overflow-hidden group"
              style={{ minHeight: "280px" }}
            >
              <Image
                src={images.dried}
                alt="Dried Fruits"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-4 left-4">
                <span className="bg-black text-white px-4 py-2 rounded-full text-xs uppercase font-bold">
                  DRIED FRUITS
                </span>
              </div>
              <Link href="#dried">
                <span className="absolute inset-0"></span>
              </Link>
            </motion.div>

            {/* Supplements - Half width */}
            <motion.div
              variants={sectionVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              className="relative rounded-lg overflow-hidden group"
              style={{ minHeight: "180px" }}
            >
              <Image
                src={images.supplements}
                alt="Supplements"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-4 left-4">
                <span className="bg-black text-white px-4 py-2 rounded-full text-xs uppercase font-bold">
                  SUPPLEMENTS
                </span>
              </div>
              <Link href="#supplements">
                <span className="absolute inset-0"></span>
              </Link>
            </motion.div>
          </div>

          {/* Bars and Snacks - Full width */}
          <motion.div
            variants={sectionVariants}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 },
            }}
            className="relative rounded-lg overflow-hidden group"
            style={{ minHeight: "220px" }}
          >
            <Image
              src={images.bars}
              alt="Bars and Snacks"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-4 left-4">
              <span className="bg-black text-white px-4 py-2 rounded-full text-xs uppercase font-bold">
                BARS AND SNACKS
              </span>
            </div>
            <Link href="#bars">
              <span className="absolute inset-0"></span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Drinks - Full height */}
        <motion.div
          variants={sectionVariants}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 },
          }}
          className="relative rounded-lg overflow-hidden md:col-span-2 md:row-span-1 group"
          style={{ minHeight: "180px", height: "100%" }}
        >
          <Image
            src={images.drinks}
            alt="Drinks"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-4 left-4">
            <span className="bg-black text-white px-4 py-2 rounded-full text-xs uppercase font-bold">
              DRINKS
            </span>
          </div>
          <Link href="#drinks">
            <span className="absolute inset-0"></span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Categories;
