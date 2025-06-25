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
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Signup failed");
        return;
      }
      dispatch(addUser(data.user));
      navigate("/");
    } catch (error) {
      console.error("Error during signup:", error);
      setError(error.message);

      return;
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
      const UserData = await response.json();

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
        return;
      }
      dispatch(addUser(UserData.user));
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.message);
      return;
    }
  };

  if (user.isAuthenticated) {
    navigate("/");
    return;
  }
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            {isLogin ? (
              <h1 className="text-5xl font-bold">Login now!</h1>
            ) : (
              <h1 className="text-5xl font-bold">
                Signup <br></br>now!
              </h1>
            )}
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                {!isLogin && (
                  <div>
                    <label className="label">First Name</label>
                    <input
                      type="email"
                      className="input"
                      placeholder="Email"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label className="label">Last Name</label>
                    <input
                      type="email"
                      className="input"
                      placeholder="Email"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                )}

                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-red-600">{error}</p>
                <div className="flex justify-between mt-2">
                  <span>
                    <a className="link link-hover">Forgot password?</a>
                  </span>
                  <span>
                    <a
                      onClick={() => setIsLogin(!isLogin)}
                      className="link link-hover"
                    >
                      New User?
                    </a>
                  </span>
                </div>
                {isLogin && (
                  <button
                    onClick={handleLogin}
                    className="btn btn-neutral mt-4"
                  >
                    Login
                  </button>
                )}
                {!isLogin && (
                  <button
                    onClick={handleSignup}
                    className="btn btn-neutral mt-4"
                  >
                    Signup Now
                  </button>
                )}
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
