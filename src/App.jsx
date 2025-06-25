import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Body from "./Components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appstore";
import Feed from "./Components/Feed";
import Profile from "./Components/Profile";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests";
import Password from "./Components/Password";
function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/password" element={<Password />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
