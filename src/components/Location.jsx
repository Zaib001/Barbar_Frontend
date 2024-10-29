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
    <div className="overflow-hidden">
      {/* Full-Screen Hero Section */}
      <div
        className="h-screen w-full bg-cover bg-center bg-fixed relative"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop)`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

        {/* Header Section */}
        <header className="w-full flex justify-between items-center p-5 md:p-8 text-white absolute top-0 z-20">
          <motion.div
            className="text-2xl md:text-4xl font-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <img src={logo} alt="Barber Shop Logo" className="h-12 md:h-20" />
          </motion.div>

          <motion.nav
            className="space-x-4 md:space-x-8 text-sm md:text-lg"
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <a href="#about-us" className="hover:underline">
              About Us
            </a>
            <a href="#gallery" className="hover:underline">
              Gallery
            </a>
          </motion.nav>
        </header>

        {/* Main Content Section */}
        <div className="h-full flex flex-col-reverse md:flex-row items-center justify-center md:justify-between px-6 md:px-12 lg:px-32 relative z-10 text-center md:text-left">
          <motion.div
            className="text-white space-y-4 md:space-y-6 max-w-lg"
            initial="hidden"
            animate="visible"
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <h2 className="text-lg md:text-xl uppercase tracking-wider">
              02. Professional Barbershop
            </h2>
            <h1 className="text-3xl md:text-6xl font-extrabold leading-snug">
              Welcome to Our Barbershop
            </h1>
            <p className="text-gray-300 text-sm md:text-base">
              Experience the best grooming services with our expert barbers.
            </p>

            <div className="w-full flex justify-center md:justify-start mt-4 md:mt-0">
              <button
                onClick={handleClick}
                className="border border-white px-5 py-2 md:px-6 md:py-3 rounded-full 
               text-white font-semibold flex items-center justify-center 
               bg-transparent hover:bg-white hover:text-black 
               transition duration-300"
              >
                Book Now <span className="ml-2 text-lg md:text-2xl">➔</span>
              </button>
            </div>


            <div className="flex justify-center md:justify-start space-x-8 mt-6">
              <a
                href="#"
                className="text-white text-3xl md:text-4xl hover:text-gray-500"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-white text-3xl md:text-4xl hover:text-gray-500"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-white text-3xl md:text-4xl hover:text-gray-500"
              >
                <FaFacebookF />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <About />
      <Gallery />
    </div>
  );
};

export default Location;
