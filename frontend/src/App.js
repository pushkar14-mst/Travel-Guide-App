import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//import css file from style sheets directory
import styles from "./style_sheets/App.module.css";

//import images from img directory
import logo from "./img/logo.png";

//Import components from the component directory
import Home from "./components/Home";
import AddPayment from "./components/AddPayment";
import DisplayPayment from "./components/DisplayPayment";
import UpdatePayment from "./components/UpdatePayment";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";
import PaymentHistory from "./components/PaymentHistory";
import PrintPayments from "./components/PrintPayment";
import Checkout from "./components/Checkout";
import AddTourguide from "./components/AddTourguide";
import AllTourguides from "./components/AllTourguides";
import updateTourguide from "./components/UpdateTourguide";
import AddHotel from "./components/AddHotel";
import BookingHotel from "./components/BookingHotel";
import Navbar from "./components/Navbar";
import AllHotel from "./components/AllHotel";
import EditHotel from "./components/EditHotel";
import ViewHotel from "./components/ViewHotel";
import report from "./components/report";
import AddPackage from "./components/addPackage";
import manager from "./components/PackManager";
import sith from "./components/CustomerPackageView";
import cusPack from "./components/CustomerPack";
import CusPackage from "./components/customizePackage";
import findMyPack from "./components/findMyPack";
import AllPacks from "./components/AllPacks";
import EditPack from "./components/PackUpdate";
import guidereport from "./components/guidereport";
import ForgotPassword from "./components/ForgotPassword";
import axios from "axios";
import CustomerPackageView from "./components/CustomerPackageView";
import TourDetail from "./pages/TourDetail";
const App = () => {
  const [userId, setUserId] = React.useState(null);
  const [message, setMessage] = React.useState(null);

  async function login(userId) {
    console.log(userId);
    setUserId(userId);
  }

  async function logout() {
    setUserId(null);
    await axios.get("http://localhost:8000/logout").then((response) => {
      console.log(response.data);
    });
  }

  return (
    <Router>
      <div className="App min-vh-100" style={{ backgroundColor: "#f7f7f7" }}>
        <nav className={`navbar-fixed-top ${styles.nav}`}>
          <div className={`container ${styles.parentnav}`}>
            <img src={logo} alt="Travelo logo" className={styles.logo}></img>
            <div className={styles.topnav_center}>
              <ul>
                <li>
                  <Link to={`/home`}>Home</Link>
                </li>

                <li>
                  <Link to={`/view/hotel`}>Hotels</Link>
                  {/* <Link to={`/checkout/${userId}`}>Hotels</Link> */}
                </li>

                <li>
                  <Link to={`/add/tourguide`}>Tour Guide</Link>
                </li>

                <li>
                  <a href="/view/cuspackage">Tour Packages</a>
                </li>

                <li>
                  <Link to={`/profile/home/${userId}`}>Profile</Link>
                </li>
              </ul>
            </div>
            {userId ? (
              <>
                <Link
                  to={"/home"}
                  onClick={logout}
                  className={styles.btn_login}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to={"/user/login"} className={styles.btn_login}>
                  Login
                </Link>
              </>
            )}
          </div>
        </nav>
        <div>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>

            <Route path="/home" component={Home} />

            <Route
              path="/add/payment+details"
              render={(props) => <AddPayment {...props} userId={userId} />}
            />

            <Route
              path={`/view/payment+details/${userId}`}
              render={(props) => <DisplayPayment {...props} userId={userId} />}
            />

            <Route
              path={`/update/payment+details/${userId}`}
              render={(props) => <UpdatePayment {...props} userId={userId} />}
            />

            <Route
              path={`/profile/home/${userId}`}
              render={(props) => <UserProfile {...props} username={userId} />}
            />
            <Route path="/forgot+password" component={ForgotPassword} />
            <Route path="/new+user/signup" component={Signup} />

            <Route
              path="/user/login"
              render={(props) => <Login {...props} login={login} />}
            />

            <Route
              path={`/view/payment+history/${userId}`}
              render={(props) => <PaymentHistory {...props} userId={userId} />}
            />

            <Route
              path={`/print/payment+history`}
              render={(props) => <PrintPayments {...props} userId={userId} />}
            />

            <Route
              path={`/checkout`}
              render={(props) => <Checkout {...props} userId={userId} />}
            />

            <Route path={["/all/tourguide"]} component={AllTourguides} />

            <Route path={["/add/tourguide"]} component={AddTourguide} />

            <Route
              path={["/update/tourguide/:id"]}
              component={updateTourguide}
            />

            <Route
              path={["/update/tourguide/:id"]}
              component={updateTourguide}
            />

            <Route
              path={["/update/tourguide/:id"]}
              component={updateTourguide}
            />

            <Route path={["/admin/hotel"]} component={Navbar} />

            <Route path={["/add/hotel"]} component={AddHotel} />

            <Route path={["/all/hotel"]} component={AllHotel} />

            <Route path="/update/hotel/:id" component={EditHotel} />

            <Route path={["/print/hotel"]} component={report} />

            <Route path={["/view/hotel"]} component={ViewHotel} />

            <Route path={["/insert/hotel"]} component={BookingHotel} />

            <Route path={["/landing/page"]} component={Navbar} />

            <Route path={["/add/package"]} component={AddPackage} />

            <Route
              path={["/view/cuspackage"]}
              component={CustomerPackageView}
            />
            <Route path={["/tour-detail"]} component={TourDetail} />
            <Route path={["/search/destination"]} component={cusPack} />

            <Route path={["/edit/cusPack"]} component={CusPackage} />

            <Route path={["/find/cusPack"]} component={findMyPack} />

            <Route path={["/page/manager"]} component={manager} />

            <Route path={["/manage/AllPacks"]} component={AllPacks} />

            <Route path={["/update/packs/id"]} component={EditPack} />
            <Route exact path={["/guidereport"]} component={guidereport} />

            <Route path="/guidereport" component={guidereport} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
