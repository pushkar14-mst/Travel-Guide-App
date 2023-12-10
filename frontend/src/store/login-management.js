import { createSlice } from "@reduxjs/toolkit";
const loginManagementSlice = createSlice({
  name: "loginManagement",
  initialState: {
    user: null,
  },
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
    },
    logoutUser(state) {
      state.user = null;
    },
  },
});

export const loginManagementActions = loginManagementSlice.actions;
export const loginManagementReducer = loginManagementSlice.reducer;
