import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ServiceSelection from "./components/ServiceSelection";
import BarberSelection from "./components/BarberSelection";
import AppointmentScheduling from "./components/AppointmentScheduling";
import CustomerInformation from "./components/CustomerInformation";
import Payment from "./components/Payment";
import Footer from "./components/Footer";
import Breadcrumb from "./components/Breadcrumb";
import Confirmation from "./components/Party";
import Location from "./components/Location";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "./config";

function App() {
  const [step, setStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);

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

  const handleConfirm = (services) => {
    setSelectedServices(services);
    const total = services.reduce((sum, service) => sum + service.price, 0);
    setPaymentAmount(total);
    handleNextStep();
  };

  useEffect(() => {
    fetchServices();
    fetchBarbers();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`https://ma-1.onrender.com/services`);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchBarbers = async () => {
    try {
      const response = await axios.get(`https://ma-1.onrender.com/barbers`);
      setBarbers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching barbers:", error);
    }
  };

  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => step > 1 && setStep(step - 1);

  const handleBarberSelect = (barber) => {
    setSelectedBarber(barber);
    handleNextStep();
  };

  const handleMove = () => {
    setStep(2);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleCustomerSubmit = (info) => {
    setCustomerInfo(info);
    handleNextStep();
  };

  const handlePayment = () => alert("Payment successful!");

  const handleStepClick = (stepNumber) => {
    if (stepNumber < step) {
      setStep(stepNumber);
    }
  };

  return (
    <Router>
      {step === 1 ? (
        <Location onSelect={handleMove} />
      ) : (
        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="flex-grow container mx-auto py-4">
            <Breadcrumb step={step} onStepClick={handleStepClick} />

            {step === 2 && (
              <BarberSelection
                barbers={barbers}
                onSelectBarber={handleBarberSelect}
              />
            )}
            {step === 3 && (
              <ServiceSelection
                services={services}
                onSelectService={handleServiceSelect}
                selectedBarber={selectedBarber}
                onConfirm={handleConfirm}
                selectedServices={selectedServices}
                paymentAmount={paymentAmount}
              />
            )}
            {step === 4 && (
              <AppointmentScheduling
                selectedServices={selectedServices}
                selectedBarber={selectedBarber}
                onSelectSlot={handleSlotSelect}
              />
            )}
          </main>

          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;
