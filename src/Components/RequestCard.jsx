import React from "react";

const ActionProfileCard = ({
  photoUrl,
  firstName,
  lastName,
  age,
  gender,
  reviewRequest,
  requestId,
}) => (
  <div
    className="
      w-full max-w-lg mx-auto flex items-center rounded-2xl
      px-2 py-2 mb-4
      font-mono
       bg-[#FFFBEA]     
    border border-[#ffeece]  
    shadow-[0_4px_4px_0_#FFB347]  
    "
  >
    {/* Photo */}
    <div className="flex-shrink-0 w-14 h-14 bg-[#FCB454] rounded-xl flex items-center justify-center mr-4 overflow-hidden border border-[#FF9B17]">
      <img src={photoUrl} className="w-14 h-14 object-cover rounded-lg" />
    </div>
    {/* Name & Info */}
    <div className="flex-1">
      <div>
        <span className="text-[#1c497d] font-bold text-lg">
          {firstName} {lastName}
        </span>
      </div>
      <span className="text-[#F16767] font-semibold text-sm">
        {age} {gender}
      </span>
    </div>
    {/* Buttons (unchanged) */}
    <div className="flex space-x-3">
      <button
        className="
          px-2 py-1
          rounded-lg
          font-mono
          bg-red-500
          text-white
          border border-red-700
          shadow-[0_4px_0_0_#991b1b]
          transition-all duration-100
          hover:shadow-[0_2px_0_0_#991b1b]
          active:shadow-none
          active:translate-y-1
          focus:outline-none
          select-none
        "
        onClick={() => reviewRequest(requestId, "rejected")}
      >
        Reject
      </button>
      <button
        className="
          px-2 py-1
          rounded-lg
          font-mono
          bg-pink-400
          text-white
          border border-pink-600
          shadow-[0_4px_0_0_#be185d]
          transition-all duration-100
          hover:shadow-[0_2px_0_0_#be185d]
          active:shadow-none
          active:translate-y-1
          focus:outline-none
          select-none
        "
        onClick={() => reviewRequest(requestId, "accepted")}
      >
        Accept
      </button>
    </div>
  </div>
);

export default ActionProfileCard;
