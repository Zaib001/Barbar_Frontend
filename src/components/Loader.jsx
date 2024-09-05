import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="relative w-20 h-1 overflow-hidden mt-4">
      <motion.div
        className="absolute top-0 left-0 h-full bg-gray-300"
        initial={{ x: '-100%' }}
        animate={{ x: ['-100%', '100%'] }}
        transition={{
          duration: 0.9,
          ease: "linear",
          repeat: Infinity,
          repeatType: "mirror", // This makes it reverse the direction
        }}
        style={{ width: '100%' }} // Adjust the width as per your design
      ></motion.div>
    </div>
  );
};

export default Loader;
