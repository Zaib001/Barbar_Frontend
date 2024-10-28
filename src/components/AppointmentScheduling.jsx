import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon, FaCalendarAlt } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import Loader from "./Loader";
import Calendar from "react-calendar";
import VoucherForm from "./VoucherForm";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Swal from "sweetalert2";
import CheckoutForm from "./CheckoutForm";
import UserForm from "./UserForm";
const stripePromise = loadStripe(
  "pk_test_51OKlibFTBEHW1myd3ydbTE4kG3eG6huz8HUC2BsVZuJxO7BpBoxwB4cDRP9NZZMJTFwscoTB5udyh6f03afH55Re00Ac3qwXd2"
);

function AppointmentScheduling({
  selectedServices,
  selectedBarber,
  onSelectSlot,
}) {
  const [showVoucherForm, setShowVoucherForm] = useState(false); // Control VoucherForm visibility
  const [discount, setDiscount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showMoreDates, setShowMoreDates] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [customTip, setCustomTip] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [userId, setUserId] = useState(null);
  const [FinalTotal, setFinalTotal] = useState(0);

  useEffect(() => {
    const discountedServicePrice = totalPrice - (totalPrice * discount) / 100;
    const tipAmount = (discountedServicePrice * tipPercentage) / 100; // Calculate tip on discounted price
    setFinalTotal(discountedServicePrice + tipAmount);
  }, [discount, tipPercentage, totalPrice]);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/create-payment-intent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: FinalTotal * 100, // Convert amount to cents
            }),
          }
        );
        const data = await response.json();
        setClientSecret(data.clientSecret); // Assuming 'clientSecret' is the key in the response
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    if (FinalTotal > 0) {
      fetchClientSecret();
    }
  }, [FinalTotal]);

  const generateDatesOfMonth = () => {
    const dates = [];
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const currentDay = today.getDate();

    for (let i = 0; i < 10; i++) {
      const date = new Date(year, month, currentDay + i);
      dates.push(date);
    }

    return dates;
  };
  const handleVoucherApplied = (discountPercentage) => {
    setDiscount(discountPercentage); // Apply discount from VoucherForm
    setShowVoucherForm(false); // Hide VoucherForm after applying
  };
  const handleUserCreated = (id) => {
    setUserId(id);
    console.log("userID", userId);
  };
  useEffect(() => {
    if (userId) {
      console.log("Updated userID:", userId);
    }
  }, [userId]);
  const datesOfMonth = generateDatesOfMonth();

  const handleTipChange = (percentage) => {
    setTipPercentage(percentage);
    setCustomTip("");
  };
  const handleDateSelection = async (date) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset selected slot

    try {
      const response = await fetch(
        `http://localhost:5000/api/appointments/slots?date=${date.toISOString()}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setAvailableSlots(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching available slots:", error);
    }
  };
  const handleCustomTipChange = (event) => {
    const customValue = event.target.value;
    setCustomTip(customValue);
    setTipPercentage(customValue);
  };

  var totalPrice = selectedServices.reduce(
    (total, service) => total + service.price,
    0
  );
  var tipAmount = (totalPrice * tipPercentage) / 100;
  var finalTotal = totalPrice + tipAmount;

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
    handleDateSelection(today);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const barbershopVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    onSelectSlot(slot);
  };

  const handleConfirmClick = () => {
    setShowConfirmation(true);
  };
  const handleFinalConfirmation = async () => {
    setShowConfirmation(false);
    setShowVoucherForm(true);
    const isSlotAvailable = availableSlots.some(
      (slot) => slot.time === selectedSlot.time
    );

    if (!isSlotAvailable) {
      alert(
        "Selected time slot is already booked. Please choose another slot."
      );
      return;
    }
  };
  const completeFinal = async () => {
    setShowPayment(true);
    setShowVoucherForm(false);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const servicesList = (
    <ul>
      <h6 className="pl-4 pb-2 text-[12px] text-stone-600">Services</h6>
      {selectedServices?.map((service, index) => (
        <div key={index}>
          <li className="text-[10px] flex justify-between">
            <h6 className="text-[12px] text-stone-400 pl-4">{service.name}</h6>
            <p className="text-[10px] text-stone-700 font-bold pr-4">
              ${service.price}
            </p>
          </li>
        </div>
      ))}

      {selectedServices?.length > 0 && (
        <>
          <div className="flex justify-between mt-2 border-t border-stone-300 pt-2">
            <h6 className="text-[12px] text-stone-400 pl-4">Total</h6>
            <p className="text-[10px] text-stone-700 font-bold pr-4">
              ${totalPrice.toFixed(2)}
            </p>
          </div>

          <div className="mt-4">
            <h6 className="text-[12px] text-stone-400 pl-4 mb-2">Add a Tip:</h6>
            <div className="flex justify-between">
              <button
                className={`text-[10px] px-4 py-2 rounded ${
                  tipPercentage === 20
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleTipChange(20)}
              >
                20%
              </button>
              <button
                className={`text-[10px] px-4 py-2 rounded ${
                  tipPercentage === 40
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleTipChange(40)}
              >
                40%
              </button>
              <button
                className={`text-[10px] px-4 py-2 rounded ${
                  tipPercentage === 60
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleTipChange(60)}
              >
                60%
              </button>
              <button
                className={`text-[10px] px-4 py-2 rounded ${
                  tipPercentage === 80
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleTipChange(80)}
              >
                80%
              </button>
              <input
                type="number"
                placeholder="Custom"
                value={customTip}
                onChange={handleCustomTipChange}
                className="text-[10px] px-4 py-2 rounded border border-gray-300 text-center w-20"
              />
            </div>
          </div>

          <div className="flex justify-between mt-4 border-t border-stone-300 pt-2">
            <h6 className="text-[12px] text-stone-400 pl-4">Final Total</h6>
            <p className="text-[10px] text-stone-700 font-bold pr-4">
              ${FinalTotal.toFixed(2)}
            </p>
          </div>
        </>
      )}
    </ul>
  );

  return (
    <>
      <motion.div
        className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
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

            <div className="flex items-center">
              <motion.div
                className="text-gray-400 font-normal"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {new Date().toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </motion.div>

              <motion.div
                className="ml-2 rounded-full px-4 py-1 bg-transparent border border-gray-400 text-gray-400 font-medium"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Today
              </motion.div>
            </div>
          </div>

          {loading && <Loader />}

          <div className="grid grid-cols-11 gap-2 mt-9">
            {datesOfMonth.map((date, index) => (
              <motion.div
                key={index}
                className={`h-10 flex flex-col items-center justify-center rounded-full cursor-pointer transition-all duration-300 ${
                  selectedDate?.toDateString() === date.toDateString()
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-800"
                }`}
                onClick={() => handleDateSelection(date)}
                whileHover={{ scale: 1.05 }}
              >
                <span>{date.getDate()}</span>
                {selectedDate?.toDateString() === date.toDateString() && (
                  <FiCheckCircle className="text-white mt-1" />
                )}
              </motion.div>
            ))}
            <motion.div
              className="h-10 w-10 flex items-center justify-center bg-white text-gray-800 rounded-full cursor-pointer border border-gray-300"
              onClick={() => setCalendarVisible(!calendarVisible)}
              whileHover={{ scale: 1.05 }}
            >
              <FaCalendarAlt />
            </motion.div>
          </div>
          <AnimatePresence>
            {calendarVisible && (
              <motion.div
                className="mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Calendar
                  value={selectedDate}
                  onChange={handleDateSelection}
                  className="w-full"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-6 border-t border-stone-300 pt-2"></div>
          {selectedBarber && (
            <div className="flex justify-between">
              <div className="flex items-center p-4">
                <img
                  src={selectedBarber.image}
                  alt={selectedBarber.name}
                  className="w-10 h-10 object-cover rounded-md mr-4"
                />
                <div>
                  <h6 className="text-[12px] font-bold">
                    {selectedBarber.name}
                  </h6>
                  <p className="text-[10px]">{selectedBarber.specialty}</p>
                </div>
              </div>
              <div>
                <h6 className="text-[12px] mt-6 text-gray-400 font-medium">
                  {new Date().toLocaleString("default", {
                    month: "long",
                    day: "numeric",
                  })}
                </h6>
              </div>
            </div>
          )}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {selectedDate && !loading && (
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                {availableSlots.map((slot, index) => (
                  <motion.div
                    key={index}
                    className={`p-2 md:p-4 rounded-xl border transition-all duration-300 ease-in-out cursor-pointer ${
                      selectedSlot?.time === slot.time
                        ? "bg-gray-600 text-white border-gray-600 shadow-lg transform scale-105"
                        : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:shadow-md"
                    }`}
                    onClick={() => handleSlotClick(slot)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="text-[12px] font-normal flex items-center justify-center">
                      {slot.hour >= 6 && slot.hour < 18 ? (
                        <FaSun
                          className={`mr-2 ${
                            selectedSlot?.time === slot.time
                              ? "text-yellow-400"
                              : "text-gray-400"
                          } ${
                            "hover:text-yellow-400" // Always apply hover styles
                          }`}
                        />
                      ) : (
                        <FaMoon
                          className={`mr-2 ${
                            selectedSlot?.time === slot.time
                              ? "text-white"
                              : "text-gray-600"
                          } ${
                            "hover:text-white" // Always apply hover styles
                          }`}
                        />
                      )}
                      {slot.time}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
        <motion.div
          className="flex justify-end"
          variants={barbershopVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="p-2 border rounded-xl w-[400px] h-auto relative">
            <div className="p-6">
              <motion.h3
                className="text-xl font-bold"
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
                  <h6 className="text-[12px] font-bold">
                    {selectedBarber.name}
                  </h6>
                  <p className="text-[10px]">{selectedBarber.specialty}</p>
                  <div className="">
                    <p className="text-gray-600 text-[12px]">
                      {selectedDate?.toDateString()} at {selectedSlot?.time}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedServices && servicesList}
            <motion.div
              className="flex justify-center mt-4 p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <button
                className="bg-gray-900 w-full text-white py-2 px-6 rounded-full shadow-md hover:bg-gray-700 transition-all"
                onClick={handleConfirmClick}
              >
                Confirm
              </button>
            </motion.div>

            <AnimatePresence>
              {showConfirmation && (
                <motion.div
                  className="absolute top-40 left-0 right-0 bottom-0 bg-white p-6 rounded-xl shadow-lg"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 100 }}
                >
                  <UserForm
                    handleFinalConfirmation={handleFinalConfirmation}
                    handleUserCreated={handleUserCreated}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {showVoucherForm && (
                <motion.div
                  className="absolute top-[20rem] left-0 right-0 bottom-0 bg-white p-6 rounded-xl shadow-lg"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 100 }}
                >
                  <VoucherForm
                    onApplyDiscount={handleVoucherApplied}
                    completeFinal={completeFinal}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {showPayment && (
                <motion.div
                  className="absolute -top-30 left-0 right-0 bottom-0 bg-white p-6 rounded-xl shadow-lg"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 100 }}
                >
                  <h4 className="text-lg font-bold">Payment</h4>
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm
                      userId={userId}
                      clientSecret={clientSecret}
                      finalTotal={FinalTotal}
                      selectedBarber={selectedBarber}
                      selectedServices={selectedServices}
                      selectedDate={selectedDate}
                      selectedSlot={selectedSlot}
                    />
                  </Elements>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default AppointmentScheduling;
