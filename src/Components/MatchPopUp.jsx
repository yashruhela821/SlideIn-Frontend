// MatchPopup.js
import React from "react";

const MatchPopup = ({ open, onClose, matchName }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <span className="text-5xl mb-4 animate-bounce">🎉</span>
        <h2 className="text-2xl font-bold text-pink-600 mb-2">It's a Match!</h2>
        <p className="text-lg text-gray-700 mb-4">
          You and <span className="font-semibold">{matchName}</span> have
          matched!
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 rounded bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MatchPopup;
