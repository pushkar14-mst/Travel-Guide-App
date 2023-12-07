import { createSlice } from "@reduxjs/toolkit";
const loginManagementSlice = createSlice({
  name: "loginManagement",
  initialState: {
    isUserLoggedIn: false,
    username: "",
  },
  reducers: {
    loginUser(state, action) {
      state.isUserLoggedIn = true;
      state.username = action.payload.username;
    },
    logoutUser(state) {
      state.isUserLoggedIn = false;
      state.username = "";
    },
  },
});

export const loginManagementActions = loginManagementSlice.actions;
export const loginManagementReducer = loginManagementSlice.reducer;
