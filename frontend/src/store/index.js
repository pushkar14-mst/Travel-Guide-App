import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "./hotel-slice";
import packageReducer from "./package-slice";
const store = configureStore({
  reducer: {
    hotel: hotelReducer,
    package: packageReducer,
  },
});
export default store;
