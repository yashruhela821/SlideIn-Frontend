import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import RequestCard from "./RequestCard";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import Notification from "./Notification";

const Connections = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request.requests);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const reviewRequest = async (requestId, status) => {
    try {
      // Find the request object before removing it
      const req = requests.find((r) => r._id === requestId);

      const res = await fetch(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!res.ok) {
        setError(res.message);
        setSuccessMessage("");
        return;
      }
      await res.json();
      dispatch(removeRequest(requestId));
      setSuccessMessage(
        "You accepted the request from " +
          (req?.fromUserId?.firstName || "User")
      );
      setLoading(false);
    } catch (error) {
      console.error("Error reviewing request:", error);
      setError("Failed to review request");
    }
  };

  const fetchRequests = async () => {
    try {
      setError(null);
      const res = await fetch(BASE_URL + "/user/requests/received", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch connections");
      }
      const data = await res.json();
      if (data.data.length === 0) {
        setError(data.message);
        setLoading(false);

        return <h1 className="text-red-500 text-center">{data.message}</h1>;
      }
      console.log("Fetched Requests:", data.data);
      dispatch(addRequest(data.data));
      setLoading(false);

      console.log(requests);
    } catch (error) {
      console.error("Error fetching Requests:", error);
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 flex justify-center items-center my-4 font-mono">
        Your Requests
      </h1>

      {error ? (
        <h2 className="text-pink-400 font-semibold font-serif text-xl text-center">
          {error}
        </h2>
      ) : loading ? (
        <div className="text-gray-500 text-center">
          <span className="loading loading-bars loading-xl"></span>
        </div>
      ) : requests && requests.length > 0 ? (
        <div>
          {requests.map((req, index) => (
            <RequestCard
              reviewRequest={reviewRequest}
              requestId={req._id}
              key={index}
              firstName={req.fromUserId.firstName}
              lastName={req.fromUserId.lastName}
              photoUrl={req.fromUserId.photoUrl}
              gender={req.fromUserId.gender}
              age={req.fromUserId.age}
            />
          ))}
        </div>
      ) : (
        <div className="text-pink-400 font-semibold font-serif text-xl text-center">
          No requests found.
        </div>
      )}

      {/* Show Notification only if there is a successMessage */}
      {successMessage && (
        <Notification
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}
    </div>
  );
};

export default Connections;
