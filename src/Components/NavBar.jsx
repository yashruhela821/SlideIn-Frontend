import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const photourl =
    user?.photoUrl ||
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

  const handleLogout = async () => {
    try {
      const response = await fetch(BASE_URL + "/logout", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <div className="navbar  fixed top-0 left-0 w-full z-50">
        {" "}
        <div className="flex-1">
          <Link
            to="/"
            className="btn font-tangerine btn-ghost text-xl font-bold"
          >
            {" "}
            🐝MingleBee{" "}
          </Link>
        </div>
        {user && (
          <div className="flex gap-2 items-center">
            <p className="font-mono text-yellow-700">
              Welcome, {user.firstName}
            </p>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="
          btn btn-ghost btn-circle avatar mx-3
          shadow-[0_4px_0_0_#f59e42]
          border border-orange-300
          bg-yellow-100
          transition-all duration-150
          hover:shadow-[0_2px_0_0_#f59e42]
          active:shadow-none
          active:translate-y-1
        "
              >
                <div className="w-16 rounded-full border-2 border-orange-200 ">
                  <img alt="User avatar" src={photourl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="
          menu menu-sm dropdown-content
          bg-yellow-50
          rounded-xl
          z-10
          mt-3 w-52 p-2
          shadow-[0_5px_5px_0_#f59e42]
          border border-orange-300
          font-mono
        "
              >
                <li>
                  <Link
                    to="/profile"
                    className="justify-between text-yellow-700 hover:bg-yellow-100 rounded-lg transition"
                  >
                    Profile
                    <span className="badge bg-orange-200 text-orange-700 border-none">
                      New
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/connections"
                    className="text-yellow-700 hover:bg-yellow-100 rounded-lg transition"
                  >
                    Connections
                  </Link>
                </li>
                <li>
                  <Link
                    to="/requests"
                    className="text-yellow-700 hover:bg-yellow-100 rounded-lg transition"
                  >
                    Requests
                  </Link>
                </li>
                <li>
                  <Link
                    to="/password"
                    className="text-yellow-700 hover:bg-yellow-100 rounded-lg transition"
                  >
                    Change Password
                  </Link>
                </li>
                <li onClick={handleLogout}>
                  <a className="text-orange-700 hover:bg-orange-100 rounded-lg transition">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
