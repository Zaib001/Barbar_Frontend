import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Ensure this is imported to apply styles

// UserForm Component
function UserForm({ handleFinalConfirmation, handleUserCreated }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // Phone number state
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        handleUserCreated(result.user._id);
        handleFinalConfirmation();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error creating user");
      }
    } catch (err) {
      setError("Network error, please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h4 className="text-lg font-semibold mb-4">Your Information</h4>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Name Input Fields */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First name"
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last name"
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>

      {/* Phone Number Input with Flags */}
      <PhoneInput
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={setPhoneNumber}
        defaultCountry="GB" // Default to United Kingdom
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      {/* Email Input Field */}
      <input
        type="email"
        placeholder="Email"
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Submit and Cancel Buttons */}
      <div className="flex justify-end space-x-4 mt-4">
        <button
          type="submit"
          className="bg-gray-900 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition"
        >
          Yes, Confirm
        </button>
        <button
          type="button"
          className="bg-gray-200 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-300 transition"
          onClick={() => setError(null)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UserForm;
