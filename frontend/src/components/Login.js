import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//import css file from style sheets directory
import styles from "../style_sheets/Login.module.css";

const Login = (props) => {
  const initialUserEnteredInfo = {
    user_name: "",
    password: "",
  };

  const [isAdminLoginActive, setIsAdminLoginActive] = useState(false);
  const [userEnteredInfo, setUserEnteredInfo] = useState(
    initialUserEnteredInfo
  );
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserEnteredInfo({ ...userEnteredInfo, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();
    await axios
      .post("http://127.0.0.1:8000/login", {
        username: userEnteredInfo.user_name,
        password: userEnteredInfo.password,
      })
      .then(async (response) => {
        console.log(response.data);
        let username = response.data.user.username;
        await axios
          .post("http://127.0.0.1:8000/duo-auth", { username: username })
          .then((response) => {
            // console.log(response.data.authUrl);
            window.open(response.data.authUrl, "_blank");
          })
          .catch((err) => {
            console.log(err);
          });
        props.login(username);
        props.history.push(`/profile/home/${response.data.user.username}`);
      })
      .catch((err) => {
        alert("Username or password is wrong. Try Again!");
      });
  };

  const adminLogin = async (e) => {
    e.preventDefault();
    setAdminEmail("");
    setAdminPassword("");
    await axios
      .post("http://127.0.0.1:8000/admin-login", {
        adminEmail,
        adminPassword,
      })
      .then(async (response) => {
        console.log(response.data);
        if (response.data.isAdmin === true) {
          alert("Admin Logged In Successfully");
        } else if (response.data.isAdmin === false) {
          alert("You are not admin!");
        }
      });
  };
  return (
    <section className={styles.gradientForm}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{
                borderRadius: "15px",
                borderColor: "white",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            >
              <div className="card-body p-5 text-center">
                <h2 className="mb-5">
                  {isAdminLoginActive ? "Admin Login" : "Sign in"}
                </h2>
                {isAdminLoginActive === true ? (
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="user_name"
                      className="form-control"
                      placeholder="Admin Email"
                      value={adminEmail}
                      onChange={(E) => {
                        setAdminEmail(E.target.value);
                      }}
                    />
                  </div>
                ) : (
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="user_name"
                      className="form-control"
                      placeholder="Username"
                      value={userEnteredInfo.user_name}
                      onChange={handleInputChange}
                      name="user_name"
                    />
                  </div>
                )}

                {isAdminLoginActive === true ? (
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Admin Password"
                      value={adminPassword}
                      onChange={(E) => {
                        setAdminPassword(E.target.value);
                      }}
                    />
                  </div>
                ) : (
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Password"
                      value={userEnteredInfo.password}
                      onChange={handleInputChange}
                      name="password"
                    />
                  </div>
                )}
                {isAdminLoginActive === false && (
                  <div
                    className="form-check d-flex justify-content-start mb-4"
                    style={{ marginTop: "25px" }}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="form1Example3"
                    />
                    <label
                      className="form-check-label"
                      for="form1Example3"
                      style={{ marginLeft: "10px", color: "#585555" }}
                    >
                      {" "}
                      Remember password{" "}
                    </label>
                  </div>
                )}
                {isAdminLoginActive === true ? (
                  <>
                    <Link
                      className={styles.btn_login}
                      style={{ marginTop: "15px", width: "fit-content" }}
                      type="submit"
                      onClick={adminLogin}
                    >
                      Login as an Admin
                    </Link>
                  </>
                ) : (
                  <Link
                    className={styles.btn_login}
                    style={{ marginTop: "15px", width: "fit-content" }}
                    type="submit"
                    onClick={login}
                  >
                    Login
                  </Link>
                )}

                {isAdminLoginActive === false && (
                  <>
                    <hr className="my-4" style={{ opacity: "0.15" }} />

                    <div class="d-flex align-items-center justify-content-center pb-4">
                      <p class="mb-0 me-2">Don't have an account?</p>
                      <Link to={"/new+user/signup"}>Sign up</Link>
                    </div>
                    <div class="d-flex align-items-center justify-content-center pb-4">
                      <Link to={"/forgot+password"}>Forgot Password</Link>
                    </div>
                  </>
                )}

                <div
                  class="d-flex align-items-center justify-content-center pb-4"
                  className={styles.btn_login}
                  style={{ marginTop: "15px", width: "fit-content" }}
                  type="submit"
                  onClick={() => {
                    setIsAdminLoginActive(!isAdminLoginActive);
                  }}
                >
                  {isAdminLoginActive === false ? "Admin Login" : "User Login"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
