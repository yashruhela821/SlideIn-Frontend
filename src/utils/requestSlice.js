import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: {
    requests: [],
    loading: false,
    error: null,
  },

  reducers: {
    addRequest: (state, action) => {
      state.requests = action.payload;
    },
    removeRequest: (state, action) => {
      state.requests = state.requests.filter(
        (request) => request._id !== action.payload
      );
    },
  },
});
export const { addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
