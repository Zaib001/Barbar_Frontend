import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Loader from "./Loader"; // Import Loader component
import { FaCheck } from "react-icons/fa"; // Import check icon

const ServiceSelection = ({
  services,
  onSelectService,
  selectedBarber,
  onConfirm,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [loading, setLoading] = useState(true);
  const [selectedServices, setSelectedServices] = useState([]);
  const [paymentAmount, setPaymentAmount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const total = selectedServices.reduce(
      (sum, service) => sum + service.price,
      0
    );
    setPaymentAmount(total);
  }, [selectedServices]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleServiceSelect = (service) => {
    setSelectedServices((prevSelected) => {
      const isSelected = prevSelected.some((s) => s.id === service.id);
      if (isSelected) {
        return prevSelected.filter((s) => s.id !== service.id);
      } else {
        return [...prevSelected, service];
      }
    });
  };

  const handleConfirm = () => {
    if (selectedServices.length > 0) {
      onConfirm(selectedServices);
    } else {
      alert("Please select at least one service!");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const serviceVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const barbershopVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  // Filter available services by excluding already selected services
  const availableServices = services.filter(
    (service) => !selectedServices.some((s) => s.id === service.id)
  );

  return (
    <motion.div
      className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Left Column: Services List */}
      <motion.div variants={sectionVariants}>
        <div className="flex justify-between items-center mb-4">
          <motion.h2
            className="text-xl font-semibold"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Choose a service
          </motion.h2>

          {!loading && (
            <motion.select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border rounded-full w-32 bg-transparent p-2 text-[10px] text-gray-400"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <option value="All Categories">All Categories</option>
              <option value="Barber">Barber</option>
              <option value="Uncategorized">Uncategorized</option>
            </motion.select>
          )}
        </div>

        {loading && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Loader />
          </motion.div>
        )}

        {selectedServices.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ul className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedServices.map((service) => (
                  <li
                    onClick={() => handleServiceSelect(service)}
                    key={service.id}
                    className="border rounded-xl cursor-pointer relative bg-black text-white" // Set the background to black and text to white
                  >
                    <svg
                      className="absolute -top-1 -right-1 bg-white rounded-full text-black w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2" // Adjust this to make the check mark thinner
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling to the parent element
                        handleServiceSelect(service); // Toggle service selection on icon click
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 12l4 4L20 6"
                      />
                    </svg>
                    {/* Ensure the icon is correctly positioned */}
                    <h3 className="font-semibold text-[12px] pl-4 pt-4">
                      {service.name}
                    </h3>
                    <p className="text-[10px] pl-4">{service.description}</p>
                    <div className="p-6"></div>
                    <div className="flex justify-end">
                      <p className="font-bold text-[13px] border bg-[#EEEEEE] rounded-s-lg text-gray-900 pl-2 pr-2">
                        ${service.price}
                      </p>
                    </div>
                    <div className="p-[5px]"></div>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div className="mt-6 p-4 border-t border-gray-300"></motion.div>
          </>
        )}

        {!loading && (
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {availableServices
              .filter(
                (service) =>
                  selectedCategory === "All Categories" ||
                  service.category === selectedCategory
              )
              .map((service) => (
                <motion.li
                  key={service.id}
                  className={`border rounded-xl cursor-pointer hover:bg-gray-950 hover:text-white hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-1000 relative ${
                    selectedServices.some((s) => s.id === service.id)
                      ? "bg-gray-950 text-white"
                      : ""
                  }`}
                  onClick={() => handleServiceSelect(service)}
                  variants={serviceVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.6, delay: 0.2 * service.id }}
                >
                  <h3 className="font-semibold text-[12px] pl-4 pt-4">
                    {service.name}
                  </h3>
                  <p className="text-[10px] pl-4">{service.description}</p>
                  <div className="p-6"></div>
                  <div className="flex justify-end">
                    <p className="font-bold text-[13px] border bg-[#EEEEEE] rounded-s-lg text-gray-900 pl-2 pr-2">
                      ${service.price}
                    </p>
                  </div>
                  <div className="p-[5px]"></div>
                </motion.li>
              ))}
          </ul>
        )}
      </motion.div>

      {/* Right Column: Selected Barber and Payment Summary */}
      <motion.div
        className="flex justify-end mt-8 lg:mt-0"
        variants={barbershopVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="p-4 border rounded-xl w-full lg:w-[400px] h-auto">
          <div className="p-4">
            <motion.h3
              className="text-lg font-bold"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Your order
            </motion.h3>
            <motion.h3
              className="text-[12px] text-gray-400 font-normal"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              J's Barbershop
            </motion.h3>
          </div>
          {selectedBarber && (
            <div className="flex items-center p-4">
              <img
                src={selectedBarber.image}
                alt={selectedBarber.name}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div>
                <h6 className="text-[12px] font-bold">{selectedBarber.name}</h6>
                <p className="text-[10px]">{selectedBarber.specialty}</p>
              </div>
            </div>
          )}

          <div className="p-4">
            <h4 className="text-sm font-medium">Selected Services</h4>
            <ul className="list-disc pl-4">
              {selectedServices.map((service) => (
                <li
                  key={service.id}
                  className="flex justify-between text-gray-700 text-[12px]"
                >
                  {service.name}
                  <span>${service.price}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm font-semibold pt-8 text-right">
              Total: ${paymentAmount}
            </p>
          </div>

          {/* Confirm Button at the bottom */}
          <motion.div
            className="flex justify-center mt-4 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <button
              className="bg-gray-900 w-full text-white py-2 px-6 rounded-full shadow-md hover:bg-gray-700 transition-all"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceSelection;
