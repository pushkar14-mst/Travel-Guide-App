import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "./hotel-slice";
import packageReducer from "./package-slice";
import { adminReducer } from "./admin-slice";
import { loginManagementReducer } from "./login-management";
const store = configureStore({
  reducer: {
    hotel: hotelReducer,
    package: packageReducer,
    admin: adminReducer,
    userLogin: loginManagementReducer,
  },
});
export default store;
