import io from "socket.io-client";
import { BASE_URL } from "./constants";
import { path } from "framer-motion/client";
export const createSocketConnection = (BASE_URL) => {
  if (location.hostname === "localhost") {
    return io(BASE_URL);
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};
