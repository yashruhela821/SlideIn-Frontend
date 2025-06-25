import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connection",
  initialState: {
    connections: [],
    loading: false,
    error: null,
  },

  reducers: {
    addConnection: (state, action) => {
      state.connections = action.payload;
    },
    removeConnection: (state, action) => {
      state.connections = [];
    },
  },
});
export const { addConnection, removeConnection } = connectionsSlice.actions;
export default connectionsSlice.reducer;
