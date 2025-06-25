import React from "react";

const ProfileNotificationCard = ({
  photoUrl,
  firstName,
  lastName,
  gender,
  age,
  bio,
}) => (
  <div className="w-full max-w-xl mx-auto flex items-start bg-[#f8d8d8]/90 rounded-2xl shadow-md px-3 py-3 mb-4">
    {/* Photo on the left */}
    <div className="flex-shrink-0 w-16 h-16 bg-[#f8b8b8] rounded-xl flex items-center justify-center mr-4 overflow-hidden">
      <img
        src={photoUrl}
        alt={firstName}
        className="w-16 h-16 object-cover rounded-lg"
      />
    </div>
    {/* Text Area */}
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <span className="font-bold text-xl font-mono text-gray-900">
          {firstName + " " + lastName}
        </span>
        {age && gender && (
          <span className="text-sm text-gray-500">{gender + " " + age}</span>
        )}
      </div>
      <div className="text-sm text-gray-700 mt-1">{bio}</div>
    </div>
  </div>
);

export default ProfileNotificationCard;
