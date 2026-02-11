import React, { useState } from "react";
import axios from "axios";

const VoucherForm = ({ onApplyDiscount, completeFinal }) => {
  const [voucherCode, setVoucherCode] = useState(""); // User-inputted voucher code
  const [voucherError, setVoucherError] = useState(""); // Error handling
  const [loading, setLoading] = useState(false); // Loading state for the button

  // Handle voucher verification
  const handleApplyVoucher = async () => {
    if (!voucherCode) {
      setVoucherError("Please enter a voucher code.");
      return;
    }

    try {
      setLoading(true); // Start loading

      const response = await axios.post(
        "https://ma-1.onrender.com/api/vouchers/verify",
        { code: voucherCode }
      );

      if (response.data.discount) {
        onApplyDiscount(response.data.discount); // Apply the discount
        setVoucherError(""); // Clear error state
        completeFinal(); // Proceed to the next screen
      } else {
        setVoucherError("Invalid or expired voucher code.");
      }
    } catch (error) {
      setVoucherError("Error verifying voucher. Please try again.");
      console.error("Voucher verification error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-80 min-h-10 space-y-4">
        <input
          type="text"
          placeholder="Enter Voucher Code"
          className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
        />

        <button
          onClick={handleApplyVoucher}
          disabled={loading}
          className={`w-full px-4 py-2 rounded-md shadow transition-all ${
            loading
              ? "bg-gray-400 text-gray-800 cursor-not-allowed"
              : "bg-gray-600 text-white hover:bg-gray-500"
          }`}
        >
          {loading ? "Verifying..." : "Apply Voucher"}
        </button>

       

        <button
          onClick={completeFinal}
          className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow hover:bg-gray-300 transition-all mt-2"
        >
          Skip
        </button>
        {voucherError && <p className="text-red-500 text-xs">{voucherError}</p>}
      </div>
    </div>
  );
};

export default VoucherForm;
