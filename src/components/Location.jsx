import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from "framer-motion";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import logo from "./assest/logo.jpg"; 
import About from "./About";
import Gallery from "./Gallery";

const Location = ({ onSelect }) => {
  const handleClick = () => {
    onSelect();
  };

  return (
    <>
      <div
        className="h-screen w-full bg-cover bg-center relative bg-fixed"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop)`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

        <header className="w-full flex justify-between items-center p-8 text-white absolute top-0 z-20">
          <motion.div
            className="text-4xl font-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <img src={logo} alt="Barber Shop Logo" className="h-24" />
          </motion.div>

          <motion.nav
            className="space-x-8 text-lg"
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <a href="#about-us" className="hover:underline">About Us</a>
            <a href="#gallery" className="hover:underline">Gallery</a>
          </motion.nav>

          <motion.button
            className="border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition duration-300"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Book Now +402-341-6052
          </motion.button>
        </header>

        <div className="h-full flex items-center justify-between px-12 lg:px-32 relative z-10">
          <motion.div
            className="text-white space-y-6 max-w-lg"
            initial="hidden"
            animate="visible"
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <h2 className="text-xl uppercase tracking-wider">02. Professional Barbershop</h2>
            <h1 className="text-6xl font-extrabold leading-snug">Welcome to Our Barbershop</h1>
            <p className="text-gray-300">Experience the best grooming services with our expert barbers.</p>

            <button
              onClick={handleClick}
              className="border border-white px-6 py-3 rounded-full text-white font-semibold flex items-center bg-transparent hover:bg-white hover:text-black transition duration-300"
            >
              Book Now <span className="ml-2 text-2xl">➔</span>
            </button>

            <div className="flex space-x-11 mt-10">
              <a href="#" className="text-white text-4xl hover:text-gray-500"><FaInstagram /></a>
              <a href="#" className="text-white text-4xl hover:text-gray-500"><FaTwitter /></a>
              <a href="#" className="text-white text-4xl hover:text-gray-500"><FaFacebookF /></a>
            </div>
          </motion.div>
        </div>
      </div>

      <About />

     <Gallery/>
    </>
  );
};

export default Location;
