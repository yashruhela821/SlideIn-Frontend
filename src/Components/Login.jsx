import React, { use, useState } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-300 to-yellow-200">
        <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-3xl">
          <div className="text-center lg:text-left mb-8 lg:mb-0">
            {isLogin ? (
              <h1 className="text-5xl font-bold text-yellow-700 font-mono">
                Login now!
              </h1>
            ) : (
              <h1 className="text-5xl font-bold text-yellow-700 font-mono">
                Sign up <br />
                now!
              </h1>
            )}
          </div>
          <div className="card bg-yellow-50 w-full max-w-sm shadow-[0_8px_0_0_#f59e42] rounded-xl border border-orange-400 transition-all duration-150">
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

                <label className="label font-mono text-orange-600">Email</label>
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
                        New User? <br></br>Register now
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
      </div>
    </>
  );
};
export default Login;
