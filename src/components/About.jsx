import React from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaSpa } from "react-icons/fa";
import shopFront from "../components/assest/1.jpg"; // Replace with your image path

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
  hover: {
    scale: 1.05,
    transition: { yoyo: Infinity, duration: 0.3 },
  },
};

const About = () => {
  return (
    <motion.section
      id="about-us"
      className="relative min-h-screen bg-black text-white py-16 px-10 lg:px-32 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60 z-0"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 text-center">
        <motion.h2
          className="text-5xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Us
        </motion.h2>

        <motion.p
          className="max-w-5xl mx-auto text-xl text-gray-300 mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Freshcut Barbershop stands out for its distinctive American-inspired
          style, offering a premium grooming experience since 2010. We combine
          professionalism with authenticity, ensuring every visit feels
          personal, relaxing, and memorable.
        </motion.p>

        {/* Image Section */}
        <motion.div
          className="max-w-2xl mx-auto overflow-hidden rounded-lg shadow-lg mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <img src={shopFront} alt="Barbershop Front" className="w-full" />
        </motion.div>

        {/* Service Cards Section */}
        <div className="flex flex-wrap justify-center gap-12">
          {[
            {
              title: "Precision Haircuts",
              description:
                "Tailored cuts designed to suit your personal style and preferences.",
              icon: <FaUserTie className="text-5xl mb-4 text-blue-500" />,
            },
            {
              title: "Beard Grooming",
              description:
                "Keep your beard sharp and well-groomed with our expert care.",
              icon: <FaUserTie className="text-5xl mb-4 text-green-500" />,
            },
            {
              title: "Luxury Facials",
              description:
                "Experience rejuvenating facials that leave your skin fresh and glowing.",
              icon: <FaSpa className="text-5xl mb-4 text-pink-500" />,
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              className="p-12 w-80 h-96 text-center bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <div className="flex justify-center">{service.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-200">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default About;
