import React, { Component } from "react";
import Train from "../img/ella.jpg";
import Beach from "../img/2.jpg";
import segiri from "../img/3.jpg";
import Apura from "../img/5.jpg";
import galle from "../img/7.jpg";
import pp from "../img/polonnaruwa.jpeg";
import yala from "../img/yala.jpg";
import "../style_sheets/frontPage.css";
import axios from "axios";

const CustomerPackageView = () => {
  const [packages, setPackages] = React.useState([]);
  const getAllPackages = async () => {
    await axios.get("http://127.0.0.1:8000/all-packages").then((res) => {
      setPackages(res.data.packages);
    });
  };
  React.useEffect(() => {
    getAllPackages();
  }, []);
  return (
    <div>
      <div>
        <h1 class="header22">
          <strong>
            <center>Travelo Tour Packages</center>
          </strong>
        </h1>
        <br></br>
        <br></br>

        {packages.map((pack) => {
          return (
            <div
              style={{
                display: "flex",
                margin: "5rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="card" style={{ display: "flex" }}>
                <div
                  style={{
                    hight: 200,
                    width: 400,
                  }}
                >
                  <h4>
                    <a class="name">
                      <strong>{pack.name}</strong>
                    </a>
                  </h4>
                  Destination - {pack.destination} <br></br>
                  Number of days - {pack.numofdays} Days<br></br>
                  Number of passengers - {pack.nopass}
                  <br></br>
                  <p class="text-danger">
                    Total Price - <strong> Rs.{pack.totPrice}/=</strong>
                  </p>
                  <a href="/search/destination" class="btn btn-warning">
                    GET MORE
                  </a>
                  <br></br>
                  <br></br>
                  <a href="#" class="btn btn-success">
                    GET PAYMENT
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        class="card-body6"
        style={{ position: "absolute", right: 5, top: 1200 }}
      >
        <h5 class="text-dark">
          <center>
            <strong>Travelo</strong>
          </center>
        </h5>
        <p class="text-white">
          <center>copyright @2020 Travelo All rights are reserved</center>
        </p>
      </div>
      <div class="card-footer text-muted"></div>
    </div>
  );
};

export default CustomerPackageView;
