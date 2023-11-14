import React, { Component, useEffect } from "react";
import Train from "../img/ella.jpg";
import Beach from "../img/2.jpg";
import segiri from "../img/3.jpg";
import Apura from "../img/5.jpg";
import galle from "../img/7.jpg";
import pp from "../img/polonnaruwa.jpeg";
import yala from "../img/yala.jpg";
import "../style_sheets/frontPage.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const CustomerPackageView = () => {
  const [packages, setPackages] = React.useState([]);
  const [destination, setDestination] = React.useState("");
  const [numofdays, setNumofdays] = React.useState("");
  const [totPrice, setTotPrice] = React.useState("");
  const [isFilterActive, setIsFilterActive] = React.useState(false);
  const [filteredPackages, setFilteredPackages] = React.useState([]);
  const dispatch = useDispatch();

  const getAllPackages = async () => {
    await axios.get("http://127.0.0.1:8000/all-packages").then((res) => {
      setPackages(res.data.packages);
    });
  };

  useEffect(() => {
    getAllPackages();
  }, []);

  const filterPackages = (e) => {
    setIsFilterActive(true);
    e.preventDefault();

    let temp = packages
      .filter((pack) => {
        if (destination) {
          return pack.destination
            .toLowerCase()
            .includes(destination.toLowerCase());
        } else if (numofdays) {
          return pack.numofdays == numofdays;
        } else if (totPrice) {
          return pack.totPrice == totPrice;
        } else if (destination && numofdays) {
          return (
            pack.destination
              .toLowerCase()
              .includes(destination.toLowerCase()) &&
            pack.numofdays == numofdays
          );
        } else if (destination && totPrice) {
          return (
            pack.destination
              .toLowerCase()
              .includes(destination.toLowerCase()) && pack.totPrice == totPrice
          );
        } else if (numofdays && totPrice) {
          return pack.numofdays == numofdays && pack.totPrice == totPrice;
        } else if (destination && numofdays && totPrice) {
          return (
            pack.destination
              .toLowerCase()
              .includes(destination.toLowerCase()) &&
            pack.numofdays == numofdays &&
            pack.totPrice == totPrice
          );
        }
      })
      .map((pack) => {
        return pack;
      });

    console.log(temp);
    setFilteredPackages(temp);
    // setPackages([]);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 class="header22">
          <strong>
            <center>Travelo Tour Packages</center>
          </strong>
        </h1>
        <br></br>
        <br></br>
        <div className="filter-box">
          <div className="filter-box-body">
            <div className="filter-box-body-item">
              <label htmlFor="destination">Destination</label>
              <input
                type="text"
                name="destination"
                id="destination"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                }}
              />
            </div>
            <div className="filter-box-body-item">
              <label htmlFor="numofdays">Number of Days</label>
              <input
                type="text"
                name="numofdays"
                id="numofdays"
                value={numofdays}
                onChange={(e) => {
                  setNumofdays(e.target.value);
                }}
              />
            </div>
            <div className="filter-box-body-item">
              <label htmlFor="totPrice">Total Price</label>
              <input
                type="text"
                name="totPrice"
                id="totPrice"
                value={totPrice}
                onChange={(e) => {
                  setTotPrice(e.target.value);
                }}
              />
            </div>
            <div className="filter-box-body-item">
              <button onClick={filterPackages}>Filter</button>
              {isFilterActive && (
                <button
                  onClick={() => {
                    setIsFilterActive(false);
                    setFilteredPackages([]);
                    setDestination("");
                    setNumofdays("");
                    setTotPrice("");
                  }}
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>
        </div>

        <br></br>

        <div
          style={{
            display: "flex",
            margin: "4rem",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: "2rem",
          }}
        >
          {!isFilterActive
            ? packages.map((pack) => {
                return (
                  <div className="card" style={{ display: "flex" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "0.5rem",
                      }}
                    >
                      <h4>
                        <Link to={`/tour-detail`}>
                          <a class="name">
                            <strong>{pack.name}</strong>
                          </a>
                        </Link>
                      </h4>
                      Destination - {pack.destination} <br></br>
                      Number of days - {pack.numofdays} Days<br></br>
                      <br></br>
                      <p
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        Total Price - <strong> Rs.{pack.totPrice}/-</strong>
                      </p>
                      <button
                        style={{
                          backgroundColor: "#4CAF50",
                          border: "none",
                          color: "white",
                          padding: "15px 32px",
                          textAlign: "center",
                          textDecoration: "none",
                          display: "inline-block",
                          fontSize: "16px",
                          margin: "4px 2px",
                          cursor: "pointer",
                          borderRadius: "12px",
                        }}
                      >
                        <a>More Information</a>
                      </button>
                    </div>
                  </div>
                );
              })
            : filteredPackages.map((pack) => {
                return (
                  <div className="card" style={{ display: "flex" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "0.5rem",
                      }}
                    >
                      <h4>
                        <Link to={`/tour-detail`}>
                          <a class="name">
                            <strong>{pack.name}</strong>
                          </a>
                        </Link>
                      </h4>
                      Destination - {pack.destination} <br></br>
                      Number of days - {pack.numofdays} Days<br></br>
                      <br></br>
                      <p
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        Total Price - <strong> Rs.{pack.totPrice}/-</strong>
                      </p>
                      <button
                        style={{
                          backgroundColor: "#4CAF50",
                          border: "none",
                          color: "white",
                          padding: "15px 32px",
                          textAlign: "center",
                          textDecoration: "none",
                          display: "inline-block",
                          fontSize: "16px",
                          margin: "4px 2px",
                          cursor: "pointer",
                          borderRadius: "12px",
                        }}
                      >
                        <a>More Information</a>
                      </button>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default CustomerPackageView;
