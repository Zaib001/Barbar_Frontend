import React, { useState, useEffect } from 'react';
import Loader from './Loader'; // Import the Loader component
import { motion } from 'framer-motion';

function BarberSelection({ barbers, onSelectBarber }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading delay
    
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const barbershopVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={titleVariants} transition={{ duration: 0.6 }}>
        <h2 className="text-xl font-semibold mb-4 lg:text-2xl">Select a Barber</h2>
        {loading ? <Loader /> : null}
        {!loading && (
          <motion.ul
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4"
            variants={containerVariants}
          >
            {barbers.map((barber) => (
              <motion.li
                key={barber.id}
                className="p-4 border rounded-xl cursor-pointer hover:bg-gray-950 hover:text-white hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-1000 w-full"
                onClick={() => onSelectBarber(barber)}
                variants={itemVariants}
                transition={{ duration: 0.6, delay: 0.2 * barber.id }}
              >
                <div className="flex justify-center mb-2 w-full">
                  <img
                    src={barber.image}
                    alt={barber.name}
                    className="w-[50px] h-[50px] md:w-[65px] md:h-[65px] object-cover rounded-md"
                  />
                </div>
                <h3 className="text-[12px] md:text-[14px] font-semibold text-center">
                  {barber.name}
                </h3>
                <p className="text-center text-[10px] md:text-[11px] text-gray-400">
                  {barber.specialty}
                </p>
                <p className="text-center text-[10px] md:text-[11px] text-gray-400">
                  {barber.status}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </motion.div>

      <motion.div
        className="flex justify-center lg:justify-end"
        variants={barbershopVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="p-2 border rounded-xl bg-white w-[300px] h-[350px] sm:w-[400px] sm:h-[450px] lg:w-[450px] lg:h-[500px] flex items-center justify-center relative overflow-hidden">
          <motion.h3
            className="text-2xl font-bold absolute top-0 left-0 p-4 sm:p-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            J's Barbershop
          </motion.h3>
          <motion.div
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default BarberSelection;
