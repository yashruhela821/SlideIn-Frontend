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

import { useEffect, useState, useRef } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import MatchPopup from "./MatchPopUp";
import TinderCard from "react-tinder-card";

const Feed = () => {
  const dispatch = useDispatch();
  const [showMatch, setShowMatch] = useState(false);
  const [matchName, setMatchName] = useState("");
  const feed = useSelector((store) => store.feed.feed);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ref for TinderCard to trigger swipes programmatically
  const cardRef = useRef();

  const handleMatch = (name) => {
    setMatchName(name);
    setShowMatch(true);
  };

  const fetchFeed = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const res = await fetch(BASE_URL + "/user/feed", {
        method: "GET",
        credentials: "include",
      });
      // Handle HTTP errors (server responded but with error status)
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to fetch feed");
      }

      const feedData = await res.json();
      dispatch(addFeed(feedData.data));
    } catch (error) {
      if (error.message === "Failed to fetch") {
        setError("Network error: Please check your internet connection.");
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (feed && feed.length > 0) return;
    fetchFeed();
  }, []);

  // Handle swipe (left/right) and remove user from feed
  const handleSwipe = (direction, user) => {
    if (direction === "right") {
      // Trigger interested logic
      document.getElementById("interested-btn")?.click();
    } else if (direction === "left") {
      // Trigger ignore logic
      document.getElementById("ignore-btn")?.click();
    }
  };

  // Programmatically swipe card using ref
  const swipe = (dir) => {
    if (cardRef.current) {
      cardRef.current.swipe(dir);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  if (error)
    return (
      <div className="text-white font-semibold font-mono text-2xl text-center flex justify-center items-center min-h-[200px]">
        {" "}
        {error}
      </div>
    );
  if (!feed || feed.length === 0)
    return (
      <div className="text-pink-400 font-semibold font-mono text-2xl text-center flex justify-center items-center min-h-[200px]">
        No feed available
      </div>
    );

  // Show only the top card (feed[0])
  const user = feed[0];

  return (
    feed && (
      <>
        <MatchPopup
          open={showMatch}
          onClose={() => setShowMatch(false)}
          matchName={matchName}
        />
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-yellow-100 via-orange-300 to-yellow-200">
          <TinderCard
            ref={cardRef}
            key={user._id}
            onSwipe={(dir) => handleSwipe(dir, user)}
            preventSwipe={["up", "down"]}
            onCardLeftScreen={() => dispatch(removeUserFromFeed(user._id))}
          >
            <UserCard
              user={user}
              onMatch={handleMatch}
              swipe={swipe} // Pass swipe function to UserCard
            />
          </TinderCard>
        </div>
      </>
    )
  );
};

export default Feed;
