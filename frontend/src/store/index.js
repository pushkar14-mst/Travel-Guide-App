import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "./hotel-slice";
const store = configureStore({
  reducer: {
    hotel: hotelReducer,
  },
});
export default store;
