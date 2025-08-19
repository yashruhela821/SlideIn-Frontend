import React from "react";
import { Link } from "react-router-dom";

const ProfileNotificationCard = ({
  photoUrl,
  firstName,
  lastName,
  gender,
  age,
  bio,
  userId,
}) => {
  const clickHandler = () => {
    console.log("target user", userId);
  };
  return (
    <div
      className="
      w-full max-w-xl mx-auto flex items-start
      bg-yellow-50 rounded-2xl
      shadow-[0_4px_4px_0_#f59e42]
      border border-orange-300
      px-2 py-2 mb-4
      font-mono
    "
    >
      {/* Photo on the left */}
      <div className="flex-shrink-0 w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center mr-4 overflow-hidden border-2 border-orange-200">
        <img
          src={photoUrl}
          alt={firstName}
          className="w-20 h-20 object-cover rounded-lg"
        />
      </div>
      {/* Text Area */}
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-xl text-orange-700">
            {firstName} {lastName}
          </span>
          {(gender || age) && (
            <span className="text-base text-orange-500 font-semibold ml-1">
              {gender}
              {gender && age ? "," : ""} {age}
            </span>
          )}
        </div>
        <div className="text-sm text-gray-700 mt-1">{bio}</div>
      </div>
      <Link to={"/chat/" + userId} className="my-auto">
        <button
          onClick={clickHandler}
          className="
          px-2 py-1 my-auto
          rounded-lg
          font-mono
          bg-blue-500
          text-white
          border border-blue-700
          shadow-[0_4px_0_0_#0466c8]
          transition-all duration-100
          hover:shadow-[0_2px_0_0_#0466c8]
          active:shadow-none
          active:translate-y-1
          focus:outline-none
          select-none
        "
        >
          💬chat
        </button>
      </Link>
    </div>
  );
};

export default ProfileNotificationCard;
