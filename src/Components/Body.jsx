import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.user);

  const fetchUser = async () => {
    try {
      const res = await fetch(BASE_URL + "/profile/view", {
        credentials: "include",
      });

      // First check response status
      if (!res.ok) {
        if (res.status === 401) {
          navigate("/login");
          return;
        }
        throw new Error(`Request failed with status ${res.status}`);
      }

      // Only parse JSON if response is OK
      const userData = await res.json();
      if (userData.user) {
        dispatch(addUser(userData.user));
      } else {
        console.log("No user data found");
      }
    } catch (error) {
      // Handle network errors separately
      if (error.name === "TypeError") {
        console.error("Network error:", error);
      } else {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    if (!user) fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Body;
