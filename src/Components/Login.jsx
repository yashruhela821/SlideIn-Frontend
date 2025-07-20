import React, { use, useState } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import Rotation from "./Rotation";
import SplitText from "./Trial";

const Login = () => {
  const [email, setEmail] = useState("nova@gmail.com");
  const [password, setPassword] = useState("GolaKhalo123@");
  const [firstName, setFirstName] = useState("Nova");
  const [lastName, setLastName] = useState("Khan");
  const [isLogin, setIsLogin] = useState(true); // Assuming you want to toggle between login and signup
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  const user = useSelector((store) => store.user);
  const [hidePassword, sethidePassword] = useState(true);

  const handleSignup = async () => {
    try {
      setError(""); // Reset error state before making the request
      if (!email || !password || !firstName || !lastName) {
        setError("All fields are required");
        return;
      }
      const response = await fetch(BASE_URL + "/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Signup failed");
        return;
      }
      const data = await response.json();

      dispatch(addUser(data.user));
      navigate("/");
    } catch (error) {
      const errorMsg = error?.message || String(error);
      console.error("Sign up Error:", error);

      if (errorMsg.includes("Failed to fetch")) {
        setError("Network error: Sign up failed ");
      } else if (
        errorMsg.includes("SSL") ||
        errorMsg.includes("ssl3_read_bytes") ||
        errorMsg.includes("tlsv1 alert internal error")
      ) {
        setError("Connection issue. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const handleLogin = async () => {
    try {
      setError(""); // Reset error state before making the request
      if (!email || !password) {
        setError("Email and password are required");
        return;
      }
      const response = await fetch(BASE_URL + "/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        setError(errorData.message || "Login failed");
        return;
      }
      const UserData = await response.json();
      dispatch(addUser(UserData.user));
      navigate("/");
    } catch (error) {
      const errorMsg = error?.message || String(error);
      console.error("Login Error:", error);

      if (errorMsg.includes("Failed to fetch")) {
        setError("Network error: Login failed ");
      } else if (
        errorMsg.includes("SSL") ||
        errorMsg.includes("ssl3_read_bytes") ||
        errorMsg.includes("tlsv1 alert internal error")
      ) {
        setError("Connection issue. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  if (user.isAuthenticated) {
    navigate("/");
    return;
  }

  return (
    <>
      <div
        className="min-h-screen  relative flex  justify-between 
    bg-orange-50"
      >
        <img
          className="w-64 h-72 absolute bottom-0 right-10 z-1 "
          src="watching.png"
        ></img>

        <img
          className="w-80 h-80 absolute bottom-0 left-2/6  "
          src="sittingnew.png"
        ></img>
        <img
          className="w-42 h-42 absolute bottom-10 rotate-12 left-10 z-1 "
          src="transparent_gift_box.png"
        ></img>
        <img
          className="w-68 h-68 absolute top-0  right-2/6 z-1 "
          src="frame.png"
        ></img>
        <img
          className="w-38 h-38 absolute top-1/9 rotate-12 right-25 z-1 "
          src="chat.png"
        ></img>
        <img
          className="w-28 h-28 absolute top-3/7 rotate-12 left-3/7 z-1 "
          src="teer.png"
        ></img>

        <div className="ml-22 mt-24 w-1/2 ">
          <div
            style={{
              fontSize: "2.8rem",
              fontWeight: 700,
              color: "#A86E2C",
              display: "flex",
              alignItems: "center",
              gap: "0.6em",
              background: "none",
              padding: 0,
              margin: 0,
              minHeight: "1.5em",
            }}
          >
            <Rotation
              texts={["Magic", "Joy", "Laughter", "Love", "Moments"]}
              mainClassName=""
              staggerFrom="last"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              staggerDuration={0.06}
              splitLevelClassName=""
              transition={{ type: "spring", damping: 24, stiffness: 350 }}
              rotationInterval={1800}
              auto={true}
            />
          </div>
          <div>
            <SplitText
              text="Slide in, break the ice, and let the good times roll.
               Welcome to a 
              community where every
               message matters."
              className="mt-38 mx-22 p-8 "
              splitType="chars"
              delay={50}
              duration={0.01}
              ease="power3.out"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
            />
          </div>
        </div>

        <div className="flex  items-center bg-blue-200 broder border -left-4 border-b-amber-600">
          <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-3xl">
            <div className="card bg-yellow-50 w-full max-w-sm shadow-[4px_8px_8px_0_#f59e42] rounded-xl border border-orange-400 transition-all duration-150">
              <div className="card-body">
                <fieldset>
                  {!isLogin && (
                    <div>
                      <label className="label font-mono text-orange-600">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="input font-mono border border-orange-300 rounded-lg shadow-[0_2px_0_0_#f59e42] focus:shadow-[0_1px_0_0_#f59e42] transition-all duration-100"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <label className="label font-mono text-orange-600">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="input font-mono border border-orange-300 rounded-lg shadow-[0_2px_0_0_#f59e42] focus:shadow-[0_1px_0_0_#f59e42] transition-all duration-100"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  )}

                  <label className="label font-mono text-orange-600">
                    Email
                  </label>
                  <input
                    type="email"
                    className="input font-mono border border-orange-300 rounded-lg shadow-[0_2px_0_0_#f59e42] focus:shadow-[0_1px_0_0_#f59e42] transition-all duration-100"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="label font-mono text-orange-600 ">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={hidePassword ? "password" : "text"}
                      className="input font-mono border border-orange-300 rounded-lg shadow-[0_2px_0_0_#f59e42] focus:shadow-[0_1px_0_0_#f59e42] transition-all duration-100"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      onClick={() => !sethidePassword((prev) => !prev)}
                      className="absolute top-2.5 right-6 text-sm text-yellow-500"
                    >
                      {hidePassword ? "Show" : "Hide"}
                    </button>
                  </div>

                  <p className="text-red-600 font-mono">{error}</p>
                  <div className="flex justify-between mt-2">
                    <span>
                      <a className="link link-hover font-mono text-yellow-500">
                        Forgot password?
                      </a>
                    </span>
                    <span>
                      {isLogin ? (
                        <a
                          onClick={() => setIsLogin(!isLogin)}
                          className="link link-hover font-mono text-yellow-500"
                        >
                          {" "}
                          New User? <br></br>Register now!
                        </a>
                      ) : (
                        <a
                          onClick={() => setIsLogin(!isLogin)}
                          className="link link-hover font-mono text-yellow-500"
                        >
                          Exiting User ?<br></br> Login Now!
                        </a>
                      )}
                    </span>
                  </div>
                  {isLogin && (
                    <button
                      className="
                px-2 py-1
                rounded-lg
                font-mono
                bg-yellow-400
                text-gray-900
                  border border-orange-400
                  shadow-[0_4px_0_0_#f59e42]
                  transition-all duration-100
                  hover:shadow-[0_2px_0_0_#f59e42]
                  active:shadow-none
                  active:translate-y-1
                  focus:outline-none
                  select-none
                  cursor-pointer

                  "
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  )}
                  {!isLogin && (
                    <button
                      className="
                px-2 py-1
                rounded-lg
                font-mono
                  bg-yellow-400
                  text-gray-900
                  border border-orange-400
                  shadow-[0_4px_0_0_#f59e42]
                  transition-all duration-100
                  hover:shadow-[0_2px_0_0_#f59e42]
                  active:shadow-none
                  active:translate-y-1
                  focus:outline-none
                  select-none
                  cursor-pointer
                  "
                      onClick={handleSignup}
                    >
                      Sign up
                    </button>
                  )}
                </fieldset>
              </div>
            </div>
          </div>
          <div className="text-center lg:text-left mb-8 lg:mb-0 ">
            {isLogin ? (
              <h1 className="text-5xl font-bold  text-yellow-700 font-mono">
                Login now!
              </h1>
            ) : (
              <h1 className="text-5xl font-bold text-yellow-700 font-mono mr-5 ">
                SignUp <br />
                now!
              </h1>
            )}
          </div>
        </div>
      </div>

      <div className=" text-center  m-2 ">
        <h1 className="text-2xl font-bold text-yellow-400 font-mono mb-4">
          Terms and Policies
        </h1>
        <ul className=" p-2 border- rounded-2xl  gap-4 text-white font-mono">
          <Link to="/PrivacyPolicy">
            <li className="hover:underline">Privacy Policy</li>
          </Link>
          <Link to="/Terms&Conditions">
            <li className="hover:underline">Terms & Conditions</li>
          </Link>
          <Link to="/RefundOrCancellationPolicy">
            <li className="hover:underline">Refund/Cancellation Policy</li>
          </Link>
          <Link to="/ContactUs">
            <li className="hover:underline">Contact Us</li>
          </Link>
        </ul>
      </div>
    </>
  );
};
export default Login;
