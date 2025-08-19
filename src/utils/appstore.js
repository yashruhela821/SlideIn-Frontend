import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionsReducer from "./connectionsSlice";
import requestReducer from "./requestSlice";

// Combine your reducers
const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  connection: connectionsReducer,
  request: requestReducer,
});

// Configure persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["connection"], // persist only the connections slice, include others if needed
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer and disable serializable check for redux-persist
const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist uses non-serializable actions internally
    }),
});

export const persistor = persistStore(appStore);
export default appStore;
