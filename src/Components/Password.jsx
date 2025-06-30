import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import Notification from "./Notification";

const Password = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(" ");
  const [successMessage, setSuccessMessage] = useState("");

  const ChangePassword = async () => {
    try {
      const response = await fetch(BASE_URL + "/profile/password", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Signup failed");
        return;
      }
      const data = await response.json();
      setSuccessMessage(data.message);
    } catch (error) {
      const errorMsg = error?.message || String(error);
      console.error("Something went wrong", error);

      if (errorMsg.includes("Failed to fetch")) {
        setError("Network error! Password updation failed ");
      } else if (
        errorMsg.includes("SSL") ||
        errorMsg.includes("ssl3_read_bytes") ||
        errorMsg.includes("tlsv1 alert internal error")
      ) {
        setError("Connection issue. Please try again.");
      }
    }
  };

  return (
    <>
      <form
        className="w-full max-w-xs mx-auto space-y-7 bg-yellow-50 rounded-full border border-orange-400 shadow-[0_8px_0_0_#f59e42] px-8 py-8 flex flex-col items-center font-mono"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Current Password */}
        <div className="relative w-full">
          <label
            htmlFor="currentPassword"
            className="block text-orange-700 font-bold mb-2  font-mono"
          >
            Current Password
          </label>
          <input
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            type={showCurrent ? "text" : "password"}
            className="w-full px-4  py-3 border border-orange-300 text-gray-900 rounded-full shadow-[0_3px_0_0_#f59e42] focus:outline-none focus:border-orange-500 focus:shadow-[0_1px_0_0_#f59e42] bg-transparent transition-all font-mono pr-16"
            placeholder="Enter current password"
            required
          />
          <button
            type="button"
            onClick={() => setShowCurrent((prev) => !prev)}
            className="absolute right-4 top-10 text-yellow-600 hover:text-orange-500 font-mono text-sm"
            tabIndex={-1}
          >
            {showCurrent ? "Hide" : "Show"}
          </button>
        </div>

        {/* New Password */}
        <div className="relative w-full">
          <label
            htmlFor="newPassword"
            className="block text-orange-700 font-bold mb-2 font-mono"
          >
            New Password
          </label>
          <input
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type={showNew ? "text" : "password"}
            className="w-full px-6 py-3 border border-orange-300 text-gray-900 rounded-full shadow-[0_3px_0_0_#f59e42] focus:outline-none focus:border-orange-500 focus:shadow-[0_1px_0_0_#f59e42] bg-transparent transition-all font-mono pr-16"
            placeholder="Enter new password"
            required
          />
          <button
            type="button"
            onClick={() => setShowNew((prev) => !prev)}
            className="absolute right-4 top-10 text-yellow-600 hover:text-orange-500 font-mono text-sm"
            tabIndex={-1}
          >
            {showNew ? "Hide" : "Show"}
          </button>
          <h5 className="text-sm text-red-600 font-mono mt-2">{error}</h5>
        </div>

        <button
          type="submit"
          className="
            w-full py-3 mt-2
            bg-yellow-400
            text-gray-900
            font-bold
            rounded-full
            font-mono
            border border-orange-400
            shadow-[0_6px_0_0_#f59e42]
            transition-all duration-100
            hover:shadow-[0_3px_2px_0_#f59e42]
            active:shadow-none
            active:translate-y-1
            focus:outline-none
            select-none
            cursor-pointer
            text-xl
          "
          onClick={() => ChangePassword()}
        >
          Update Password
        </button>
        {/* Notification at the bottom */}
      </form>
      <Notification
        message={successMessage}
        onClose={() => setSuccessMessage("")}
      />
    </>
  );
};

// Main component styled like the login page
const ChangePasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-200 to-yellow-100">
      <div className="flex w-full max-w-4xl rounded-2xl shadow-[0_10px_13px_0_#f59e42] overflow-hidden bg-yellow-50 border border-orange-400">
        {/* Left Side */}
        <div
          className="hidden md:flex flex-col justify-center items-center w-1/2 p-10 relative"
          style={{
            background:
              "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80') center/cover",
          }}
        >
          <div className="absolute inset-0 bg-orange-900/60 rounded-l-2xl" />
          <div className="relative z-10 flex flex-col items-start">
            <h2 className="text-3xl font-bold text-yellow-200 mb-2 font-mono drop-shadow-lg">
              Change your Password
            </h2>
            <p className="text-lg text-yellow-100 font-mono drop-shadow">
              Keep your account secure by updating your password regularly.
            </p>
          </div>
        </div>
        {/* Right Side (Form) */}
        <div className="w-full md:w-1/2 bg-yellow-50 p-10 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-orange-700 mb-8 text-center font-mono">
            Change Password
          </h3>
          <Password />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
