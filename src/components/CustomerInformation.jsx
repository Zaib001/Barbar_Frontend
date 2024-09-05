// src/components/CustomerInformation.js
import React, { useState } from 'react';

function CustomerInformation({ onSubmit }) {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = e => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Enter Your Information</h2>
      <form onSubmit={e => { e.preventDefault(); onSubmit(customer); }}>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={customer.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={customer.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={customer.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
}

export default CustomerInformation;
