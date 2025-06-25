import React, { useState } from "react";

const Password = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  return (
    <form className="w-full max-w-xs mx-auto space-y-5">
      {/* Current Password */}
      <div className="relative">
        <label
          htmlFor="currentPassword"
          className="block text-gray-700 font-medium mb-1"
        >
          Current Password
        </label>
        <input
          id="currentPassword"
          type={showCurrent ? "text" : "password"}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-12"
          placeholder="Enter current password"
          required
        />
        <button
          type="button"
          onClick={() => setShowCurrent((prev) => !prev)}
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-800"
          tabIndex={-1}
        >
          {showCurrent ? "Hide" : "Show"}
        </button>
      </div>

      {/* New Password */}
      <div className="relative">
        <label
          htmlFor="newPassword"
          className="block text-gray-700 font-medium mb-1"
        >
          New Password
        </label>
        <input
          id="newPassword"
          type={showNew ? "text" : "password"}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-12"
          placeholder="Enter new password"
          required
        />
        <button
          type="button"
          onClick={() => setShowNew((prev) => !prev)}
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-800"
          tabIndex={-1}
        >
          {showNew ? "Hide" : "Show"}
        </button>
      </div>

      <button
        type="submit"
        className="w-full py-2 mt-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
      >
        Update Password
      </button>
    </form>
  );
};

// Main component styled like the image
const ChangePasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-900 to-black">
      <div className="flex w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden bg-white/5">
        {/* Left Side */}
        <div
          className="hidden md:flex flex-col justify-center items-center w-1/2 p-10 relative"
          style={{
            background:
              "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80') center/cover",
          }}
        >
          <div className="absolute inset-0 bg-black/60 rounded-l-2xl" />
          <div className="relative z-10 flex flex-col items-start">
            <h2 className="text-3xl font-bold text-white mb-2">
              Change your Password
            </h2>
            <p className="text-lg text-gray-200">
              Keep your account secure by updating your password regularly.
            </p>
          </div>
        </div>
        {/* Right Side (Form) */}
        <div className="w-full md:w-1/2 bg-white p-10 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Change Password
          </h3>
          <Password />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
