import React, { Component } from "react";
import mana from "../img/boss.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import myStyle from "../style_sheets/Style.module.css";
import galle from "../img/Travelo.jpeg";
import { useSelector } from "react-redux";

const PackManager = () => {
  const selector = useSelector((state) => state.admin);
  const isAdmin = selector.isAdmin;

  return isAdmin === true ? (
    <div>
      <div className={myStyle.header2} style={{ width: "1600px" }}>
        {" "}
        <h1 className="header" style={{ position: "inherit", top: "40px" }}>
          <strong>
            <center>Package Manager's Home Page</center>
          </strong>
        </h1>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
        <img
          className="logo"
          src={galle}
          style={{ position: "absolute", right: 1300, top: 13 }}
          height={50}
          width={200}
          alt="Card image cap"
        ></img>
        <Link to="#">
          <button className="btnBack2" type="button">
            Logout
          </button>
        </Link>
        &nbsp;&nbsp;
      </div>

      <div className="container">
        <div className="ManagerCard" style={{ width: "24rem" }}>
          <div className="card-body1">
            <h5 className="text-white card-title">
              <strong>Create new tour packages</strong>
            </h5>
            <Link to="/add/package">
              <button className="ManLetsgoo" type="button">
                <i className="fa-solid fa-angles-right"></i>Lets go..
              </button>
            </Link>
            &nbsp;&nbsp;
          </div>
        </div>
        <br></br>

        <div className="ManagerCard" style={{ width: "24rem" }}>
          <div className="card-body1">
            <h5 className="card-title text-white">
              <strong>Manage package details</strong>
            </h5>
            <Link to="/manage/AllPacks">
              <button className="ManLetsgoo" type="button">
                <i className="fa-solid fa-angles-right"></i>Lets go..
              </button>
            </Link>
            &nbsp;&nbsp;
          </div>
        </div>
        <br></br>

        <div className="ManagerCard" style={{ width: "24rem" }}>
          <div className="card-body1">
            <h5 className="card-title text-white">
              <strong>Customer created packages</strong>
            </h5>
            <Link to="/all2">
              <button className="ManLetsgoo" type="button">
                <i className="fa-solid fa-angles-right"></i>Lets go..
              </button>
            </Link>
            &nbsp;&nbsp;
          </div>
        </div>

        <br></br>
      </div>

      <div className="card text-center">
        <div className="card-header"></div>
        <div className="card-body" style={{ width: "1600px" }}>
          <h5 className="text-dark">
            <strong>Travelo</strong>
          </h5>
          <p className="text-white">
            copyright @2020 Travelo All rights are reserved
          </p>
        </div>
        <div className="card-footer text-muted"></div>
      </div>
    </div>
  ) : (
    <div>
      <h1>You are not Authorized to this page</h1>
    </div>
  );
};

export default PackManager;
