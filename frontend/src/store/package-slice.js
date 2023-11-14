import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  name: "",
  packId: "",
  destination: "",
  noofdays: "",
  nopass: "",
  hotel: "",
  transport: "",
  tourGuide: "",
  totPrice: "",
};

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    addPackage(state, action) {
      state.name = action.payload.name;
      state.packId = action.payload.packId;
      state.destination = action.payload.destination;
      state.noofdays = action.payload.noofdays;
      state.nopass = action.payload.nopass;
      state.hotel = action.payload.hotel;
      state.transport = action.payload.transport;
      state.tourGuide = action.payload.tourGuide;
      state.totPrice = action.payload.totPrice;
    },
    currentPackage(state, action) {
      state.packId = action.payload.packId;
    },
  },
});

export const packageActions = packageSlice.actions;
export default packageSlice.reducer;
