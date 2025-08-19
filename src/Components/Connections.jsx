import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import ConnectionCard from "./ConnectionCard";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionsSlice";

const Connections = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection.connections);
  const [loading, setLoading] = useState(false);

  const fetchConnections = async () => {
    try {
      setError(null);
      const res = await fetch(BASE_URL + "/user/connections", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch connections");
      }
      const data = await res.json();
      if (data.data.length === 0) {
        console.log("No connections found");
        setError(data.message);
        console.log(error);
        return;
      }
      dispatch(addConnection(data.data));
    } catch (error) {
      const errorMsg = error?.message || String(error);
      if (errorMsg.includes("Failed to fetch")) {
        setError("Network error: failed to fetch Connections.");
      } else {
        setError(errorMsg);
      }
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 flex justify-center items-center my-4 font-mono">
        Your Connections
      </h1>
      {error ? (
        <>
          here
          <h2 className="text-pink-400 font-semibold font-serif text-xl mt-10  text-center">
            {error}
          </h2>
        </>
      ) : (
        connections &&
        connections.length > 0 && (
          <div>
            {connections.map((connection, index) => (
              <ConnectionCard
                key={index}
                firstName={connection.firstName}
                lastName={connection.lastName}
                photoUrl={connection.photoUrl}
                bio={connection.bio}
                gender={connection.gender}
                age={connection.age}
                userId={connection.userId}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Connections;
