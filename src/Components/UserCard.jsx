// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { removeUserFromFeed } from "../utils/feedSlice";
// import { BASE_URL } from "../utils/constants";

// const UserCard = ({ user, onMatch }) => {
//   const dispatch = useDispatch();
//   if (!user) {
//     return <div>No user data available</div>;
//   }

//   const { firstName, lastName, skills, distance, bio, photoUrl, _id } = user;
//   const handleStatus = async (status, _id) => {
//     try {
//       const res = await fetch(
//         BASE_URL + "/request/send/" + status + "/" + _id,
//         {
//           method: "POST",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ status }),
//         }
//       );
//       if (!res.ok) {
//         throw new Error("Failed to update status");
//       }
//       const data = await res.json();

//       // Show popup if it's a match
//       if (
//         data.message &&
//         data.message.includes("has been accepted automatically")
//       ) {
//         onMatch(firstName); // Pass the name to parent
//       }
//       // Remove user from feed after sending request
//       dispatch(removeUserFromFeed(_id));
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };
//   return (
//     <>
//       <div className="relative w-96 h-[550px] rounded-3xl overflow-hidden shadow-xl bg-white">
//         {/* Background Image */}
//         <img
//           src={photoUrl || "https://via.placeholder.com/320x480"}
//           alt={`${firstName} ${lastName}`}
//           className="w-full h-full object-cover"
//         />

//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

//         {/* Distance Badge */}
//         <div className="absolute top-4 left-4 bg-white/80 text-gray-800 text-xs px-3 py-1 rounded-full font-medium shadow">
//           {distance ? `${distance} km` : "Nearby"}
//         </div>

//         {/* Card Info */}
//         <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10">
//           <h2 className="text-2xl font-bold">
//             {firstName} {lastName}
//           </h2>
//           <p className="text-base font-serif font-medium mt-1">
//             {skills[0] || "Developer"}{" "}
//           </p>
//           <p className="text-sm mt-2">{bio}</p>
//         </div>
//         {/* Action Buttons */}
//         <div className="absolute bottom-14 right-6 flex flex-col gap-4 z-20">
//           {/* Cross Button with Tooltip */}
//           <div className="group relative flex justify-center">
//             <button
//               on
//               onClick={() => handleStatus("ignored", _id)}
//               className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition"
//             >
//               <span className="text-xl text-gray-700">✖️</span>
//             </button>
//             <span className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all font-semibold font-mono duration-200 rounded  px-3 py-1 text-xs text-black bg-white whitespace-nowrap">
//               Ignore
//             </span>
//           </div>
//           {/* Star Button with Tooltip */}
//           {/* <div className="group relative flex justify-center">
//           <button className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition">
//             <span className="text-xl text-yellow-400">⭐</span>
//           </button>
//           <span className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 font-mono transition-all duration-200 rounded bg-gray-800 px-3 py-1 text-xs text-white whitespace-nowrap">
//             Super Like
//           </span>
//         </div> */}
//           {/* Heart Button with Tooltip */}
//           <div className="group relative flex justify-center">
//             <button
//               onClick={() => handleStatus("interested", _id)}
//               className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow hover:bg-red-600 transition"
//             >
//               <span className="text-xl text-white">❤️</span>
//             </button>
//             <span className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded font-semibold font-mono px-3 bg-white py-1 text-xs text-pink-500 whitespace-nowrap">
//               Interested
//             </span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserCard;

// import { useEffect, useState } from "react";
// import { BASE_URL } from "../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { addFeed } from "../utils/feedSlice";
// import UserCard from "./UserCard";
// import MatchPopup from "./MatchPopUp";

// const Feed = () => {
//   const dispatch = useDispatch();
//   const [showMatch, setShowMatch] = useState(false);
//   const [matchName, setMatchName] = useState("");
//   const feed = useSelector((store) => store.feed.feed);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const handleMatch = (name) => {
//     setMatchName(name);
//     setShowMatch(true);
//   };

//   // 1. Define fetchFeed outside of useEffect
//   const fetchFeed = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(BASE_URL + "/user/feed", {
//         method: "GET",
//         credentials: "include",
//       });
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.message || "Failed to fetch feed");
//       }
//       const feedData = await res.json();
//       dispatch(addFeed(feedData.data));
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 2. Call fetchFeed from useEffect
//   useEffect(() => {
//     if (feed && feed.length > 0) return; // Avoid fetching if feed is already present
//     fetchFeed();
//   }, []);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-[200px]">
//         <span className="loading loading-bars loading-xl"></span>
//       </div>
//     );
//   if (error) return <div>Error loading feed: {error}</div>;
//   if (!feed || feed.length === 0)
//     return (
//       <div className="text-pink-400 font-semibold font-serif text-2xl text-center flex justify-center items-center min-h-[200px]">
//         No feed available
//       </div>
//     );

//   return (
//     feed && (
//       <>
//         {" "}
//         <MatchPopup
//           open={showMatch}
//           onClose={() => setShowMatch(false)}
//           matchName={matchName}
//         />
//         <div className="flex items-center justify-center h-screen bg-pink-200">
//           <UserCard user={feed[0]} onMatch={handleMatch} />
//         </div>{" "}
//       </>
//     )
//   ); // Replace with actual feed rendering
// };

// export default Feed;

import React from "react";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user, onMatch, swipe }) => {
  const dispatch = useDispatch();
  if (!user) {
    return <div>No user data available</div>;
  }

  const { firstName, lastName, skills, distance, bio, photoUrl, _id } = user;

  const handleStatus = async (status, _id) => {
    try {
      const res = await fetch(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to update status");
      }
      const data = await res.json();

      if (
        data.message &&
        data.message.includes("has been accepted automatically")
      ) {
        onMatch(firstName);
      }
      dispatch(removeUserFromFeed(_id));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="relative w-[400px] h-[600px] rounded-3xl overflow-hidden shadow-xl bg-white">
      {/* Background Image */}
      <img
        src={photoUrl || "https://via.placeholder.com/320x480"}
        alt={`${firstName} ${lastName}`}
        className="w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Distance Badge */}
      <div className="absolute top-4 left-4 bg-white/80 text-gray-800 text-xs px-3 py-1 rounded-full font-medium shadow">
        {distance ? `${distance} km` : "Nearby"}
      </div>

      {/* Card Info */}
      <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10">
        <h2 className="text-2xl font-bold">
          {firstName} {lastName}
        </h2>
        <p className="text-base font-serif font-medium mt-1">
          {skills[0] || "Developer"}{" "}
        </p>
        <p className="text-sm mt-2">{bio}</p>
      </div>
      {/* Action Buttons */}
      <div className="absolute bottom-14 right-6 flex flex-col gap-4 z-20">
        {/* Ignore Button */}
        <div className="group relative flex justify-center">
          <button
            id="ignore-btn"
            onClick={() => {
              handleStatus("ignored", _id);
              swipe("left"); // Programmatically swipe left
            }}
            className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition"
          >
            <span className="text-xl text-gray-700">✖️</span>
          </button>
          <span className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all font-semibold font-mono duration-200 rounded  px-3 py-1 text-xs text-black bg-white whitespace-nowrap">
            Ignore
          </span>
        </div>
        {/* Interested Button */}
        <div className="group relative flex justify-center">
          <button
            id="interested-btn"
            onClick={() => {
              handleStatus("interested", _id);
              swipe("right"); // Programmatically swipe right
            }}
            className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow hover:bg-red-600 transition"
          >
            <span className="text-xl text-white">❤️</span>
          </button>
          <span className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded font-semibold font-mono px-3 bg-white py-1 text-xs text-pink-500 whitespace-nowrap">
            Interested
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
