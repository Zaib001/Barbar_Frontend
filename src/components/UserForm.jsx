import { useState } from "react";

function UserForm({ handleFinalConfirmation , handleUserCreated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.user)
        handleUserCreated(result.user._id); 
        handleFinalConfirmation(); // Proceed after successful creation
      } else {
        const errorData = await response.json();
        console.error("Error creating user:", errorData);
        setError(errorData.message || "Error creating user");
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error, please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h4 className="text-lg font-bold">Create User</h4>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col">
        <label className="text-gray-700">Name:</label>
        <input
          type="text"
          className="border rounded-md p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700">Email:</label>
        <input
          type="email"
          className="border rounded-md p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700">Phone:</label>
        <input
          type="tel"
          className="border rounded-md p-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-gray-900 text-white py-2 px-4 rounded-md mr-2"
        >
          Yes, Confirm
        </button>
        <button
          type="button"
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md"
          onClick={() => setShowConfirmation(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UserForm;
