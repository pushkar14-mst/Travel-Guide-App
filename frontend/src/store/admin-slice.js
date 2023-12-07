import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isAdmin: false,
  },
  reducers: {
    setIsAdminActive(state) {
      state.isAdmin = true;
    },
  },
});

export const adminActions = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
