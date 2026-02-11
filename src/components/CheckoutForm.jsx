import React from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";

function CheckoutForm({
  finalTotal,
  clientSecret,
  selectedBarber,
  selectedServices,
  selectedDate,
  selectedSlot,
  userId
}) {
  const stripe = useStripe();
  const elements = useElements();

  if (!clientSecret) {
    return null; // Or a loading spinner, if needed
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userId)
    if (!stripe || !elements) {
      return;
    }
    try {
      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://barbar-frontend.onrender.com",
        },
        redirect: "if_required",
      });

      console.log("Payment Intent:", paymentIntent);

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: error.message,
        });
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        try {
          const appointmentResponse = await fetch(
            "https://ma-1.onrender.com/api/appointments",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                barber: selectedBarber._id,
                user:userId,
                services: selectedServices.map((service) => service._id),
                date: selectedDate.toISOString(),
                time: selectedSlot.time,
                totalAmount: finalTotal,
                paymentStatus: "paid", // Correct status
              }),
            }
          );

          if (!appointmentResponse.ok) {
            throw new Error("Failed to create appointment");
          }

          const appointmentData = await appointmentResponse.json();
          console.log("Appointment created:", appointmentData);

          Swal.fire({
            icon: "success",
            title: "Congratulations!",
            text: "Your appointment has been successfully created!",
            showConfirmButton: true,
            confirmButtonText: "OK",
          });
        } catch (error) {
          console.error("Error creating appointment:", error);
          Swal.fire({
            icon: "error",
            title: "Appointment Error",
            text: "There was an error creating your appointment. Please try again.",
          });
        }
      } else if (paymentIntent && paymentIntent.status === "canceled") {
        Swal.fire({
          icon: "warning",
          title: "Payment Canceled",
          text: "Your payment was canceled.",
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error handling payment:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "There was an error processing your payment. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        className="bg-gray-900 text-white py-2 px-4 rounded-md mt-4 w-full"
        disabled={!stripe}
      >
        Pay ${finalTotal.toFixed(2)}
      </button>
    </form>
  );
}

export default CheckoutForm;
