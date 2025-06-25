import React from "react";

const ActionProfileCard = ({
  photoUrl,
  firstName,
  lastName,
  age,
  gender,
  reviewRequest: reviewRequest,
  requestId: requestId,
}) => (
  <div
    className="w-full max-w-lg mx-auto flex items-center rounded-2xl shadow-md px-2 py-2 mb-4"
    style={{
      background: "rgba(255, 255, 255, 0.35)", // glassy white, very transparent
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(255,255,255,0.2)",
    }}
  >
    {/* Photo */}
    <div className="flex-shrink-0 w-14 h-14 bg-[#f8b8b8] rounded-xl flex items-center justify-center mr-4 overflow-hidden">
      <img src={photoUrl} className="w-14 h-14 object-cover rounded-lg" />
    </div>
    {/* Name */}
    <div className="flex-1 r">
      <div className="flex-1">
        <span className=" text-white font-bold font-mono text-lg">
          {firstName} {lastName}
        </span>
      </div>

      <span className=" text-gray-300 font-semibold font-mono text-sm">
        {age} {gender}
      </span>
    </div>

    {/* Buttons */}
    <div className="flex space-x-3">
      <button
        className="px-2 py-1  rounded-lg font-mono bg-red-500 text-white hover:bg-red-600 transition-colors shadow"
        onClick={() => reviewRequest(requestId, "rejected")}
      >
        Reject
      </button>
      <button
        className="px-2 py-1 rounded-lg font-mono bg-pink-400 text-white hover:bg-pink-500 transition-colors shadow"
        onClick={() => reviewRequest(requestId, "accepted")}
      >
        Accept
      </button>
    </div>
  </div>
);

export default ActionProfileCard;
