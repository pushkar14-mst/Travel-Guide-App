import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  no_of_rooms: 0,
  name: "",
  type: "",
  location: "",
  price: 0,
};
const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    addHotel(state, action) {
      state.no_of_rooms = action.payload.no_of_rooms;
      state.name = action.payload.name;
      state.type = action.payload.type;
      state.location = action.payload.location;
      state.price = action.payload.price;
      console.log(
        state.name,
        state.type,
        state.location,
        state.price,
        state.no_of_rooms
      );
    },
  },
});

export const hotelActions = hotelSlice.actions;
export default hotelSlice.reducer;
