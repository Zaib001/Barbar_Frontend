import React from "react";
import { motion } from "framer-motion";

// Framer Motion animation variants
const leftVariants = {
  hidden: { opacity: 0, x: "100vw" },
  visible: { opacity: 1, x: 0 },
};

const rightVariants = {
  hidden: { opacity: 0, x: "-100vw" },
  visible: { opacity: 1, x: 0 },
};

const Location = ({ onSelect }) => {
  const handleClick = () => {
    onSelect();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-full overflow-hidden">
      {/* Left Section */}
      <motion.div
        className="flex flex-col justify-center items-center bg-gradient-to-r from-gray-800 to-gray-900 text-white font-poppin p-6 lg:p-12"
        initial="hidden"
        animate="visible"
        variants={leftVariants}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-4 text-center">
          Welcome to Our Barbershop
        </h1>
        <p className="text-md lg:text-lg xl:text-xl mb-6 text-center">
          Experience the best grooming services with our expert barbers.
        </p>
        <button
          onClick={handleClick}
          className="bg-white text-black hover:text-gray-900 font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
        >
          Book an Appointment
        </button>
      </motion.div>

      {/* Right Section */}
      <motion.div
        className="relative flex flex-col justify-center items-center bg-cover bg-center text-white p-6 lg:p-12 font-sans"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
        initial="hidden"
        animate="visible"
        variants={rightVariants}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Overlay to adjust opacity */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 font-grypen">
            Looking Great Has Never Been Easier
          </h1>
          <p className="text-md lg:text-lg xl:text-xl mb-6 font-grypen">
            Discover your perfect look with our premium services and skilled
            barbers.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Location;
