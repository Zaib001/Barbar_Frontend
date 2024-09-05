// src/components/Payment.js
import React from 'react';

function Payment({ onPayment }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Payment</h2>
      <button className="bg-green-500 text-white p-2 rounded" onClick={onPayment}>
        Pay Now
      </button>
    </div>
  );
}

export default Payment;
