import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../pooper.json'; // Add the path to your Lottie animation JSON
import { motion } from 'framer-motion';

function Confirmation() {
  // Lottie animation configuration
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <h1 className="text-white text-4xl font-bold mb-4 animate-bounce">Order Confirmed!</h1>

      <div className="w-72 h-72">
        <Lottie options={defaultOptions} />
      </div>

      <p className="text-white text-xl mt-4">Thank you for your purchase. Your order is on its way!</p>

      {/* Party popper animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="party-popper">
          <div className="popper left"></div>
          <div className="popper right"></div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Confirmation;
