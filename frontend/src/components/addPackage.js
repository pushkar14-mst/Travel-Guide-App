import React, { useState } from "react";
import axios from "axios";
import myStyle from "../style_sheets/Style.module.css";
import galle from "../img/Travelo.jpeg";
import create from "../img/Create package.jpg";
import { useDispatch, useSelector } from "react-redux";
import { packageActions } from "../store/package-slice";

function AddPackage() {
  const [name, setName] = useState("");
  const [packId, setPid] = useState("");
  const [destination, setDesti] = useState("");
  const [numofdays, setDays] = useState("");
  const [hotel, setHotel] = useState("");
  const [transport, setTrans] = useState("");
  const [tourGuide, setGuide] = useState("");
  const [totPrice, setPrice] = useState("");
  const [tourDate, setTourDate] = useState("");
  const [dayWiseItinerary, setDayWiseItinerary] = useState([
    {
      noOfCities: 0,
      noOfActivities: 0,
      cities: [],
      activities: [],
      description: " ",
    },
  ]);
  const dispatch = useDispatch();

  const inputArray = Array.from({ length: numofdays }, (_, index) => index);

  dispatch(
    packageActions.addPackage({
      name,
      packId,
      destination,
      numofdays,
      hotel,
      transport,
      tourGuide,
      totPrice,
      tourDate,
      dayWiseItinerary,
    })
  );
  async function sendData(e) {
    e.preventDefault();

    const newPackage = {
      name,
      packId,
      destination,
      numofdays,
      hotel,
      transport,
      tourGuide,
      totPrice,
      tourDate,
      dayWiseItinerary,
    };

    await axios
      .post("https://travel-guide-app.vercel.app/add-package", newPackage)
      .then(() => {
        alert("Package Added");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container" class="p-3 mb-2 bg-white">
      <form onSubmit={sendData}>
        <img
          class={myStyle.logo}
          src={galle}
          style={{ position: "absolute", right: 1300, top: 26 }}
          height={50}
          width={200}
          alt="Card image cap"
        ></img>
        <a
          class="btnHome"
          href="/man"
          style={{ position: "absolute", right: 50, top: 600 }}
        >
          Home
        </a>
        <div class="header2">
          {" "}
          <h1 class="header">
            <strong>
              <center>Enter New Tour Package Details</center>
            </strong>
          </h1>
          <br></br>
        </div>
        <br></br>
        <br></br>
        <div>
          <div className="form-group" style={{ width: "500px" }}>
            <label for="Name">
              <strong>Package Name *</strong>
            </label>
            <input
              type="text"
              class="form-control"
              id="pacName"
              placeholder="Enter package name here"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <br></br>

          <div className="form-group" style={{ width: "500px" }}>
            <label for="id">
              <strong>Package ID</strong>*
            </label>
            <input
              type="text"
              class="form-control"
              id="packId"
              placeholder="Enter package_ID here"
              onChange={(e) => {
                setPid(e.target.value);
              }}
            />
          </div>
          <br></br>
          <div className="form-group" style={{ width: "500px" }}>
            <label for="id">
              <strong>Package Date</strong>*
            </label>
            <input
              type="date"
              class="form-control"
              id="packDate"
              placeholder="Enter Date here"
              onChange={(e) => {
                setPid(e.target.value);
              }}
            />
          </div>

          <div
            class="form-row"
            className="form-group"
            style={{ width: "500px" }}
          >
            <label for="desti">
              <strong>Destination *</strong>
            </label>
            <input
              type="text"
              class="form-control"
              id="desti"
              placeholder="Enter any destination"
              onChange={(e) => {
                setDesti(e.target.value);
              }}
            />
          </div>
          <br></br>

          <div className="form-group" style={{ width: "500px" }}>
            <label for="numDays">
              <strong>Number of days *</strong>
            </label>
            <input
              type="number"
              class="form-control"
              id="numDays"
              min="1"
              max="30"
              placeholder="Enter duration of the package"
              onChange={(e) => {
                setDays(e.target.value);
              }}
            />
          </div>
          <br></br>
        </div>
        <br></br>
        <div style={{ position: "absolute", top: 220, right: 300 }}>
          <div className="form-group" style={{ width: "500px" }}>
            <label for="hotel">
              <strong>Hotel/Other</strong>
            </label>
            <select
              type="text"
              class="form-control"
              id="hotel"
              required
              placeholder="Enter hotel name"
              onChange={(e) => {
                setHotel(e.target.value);
              }}
            >
              <option selected>None</option>
              <option>Camping</option>
              <option>NCG Holiday (pvt)</option>
              <option>Jitwing (pvt)</option>
              <option>Paradice resolt Rsd(pvt)</option>
            </select>
          </div>
          <br></br>
          <div className="form-group" style={{ width: "500px" }}>
            <label for="transport">
              <strong>Transport</strong>
            </label>
            <select
              type="text"
              class="form-control"
              id="transport"
              requred
              placeholder="Enter Transport Company"
              onChange={(e) => {
                setTrans(e.target.value);
              }}
            >
              <option selected>None</option>
              <option>Dilanka Cabs/Transports</option>
              <option>NCG Transport(pvt)</option>
              <option>Selinaiyo Lanka Vehicle Center</option>
              <option>SK and sons(pvt)</option>
            </select>
          </div>
          <br></br>
          <div className="form-group" style={{ width: "500px" }}>
            <label for="guide">
              <strong>Tour guide</strong>
            </label>
            <select
              type="text"
              class="form-control"
              id="guide"
              required
              placeholder="with/without"
              onChange={(e) => {
                setGuide(e.target.value);
              }}
            >
              <option selected>None</option>
              <option>With</option>
              <option>Without</option>
            </select>
          </div>
          <br></br>
          <div className="form-group" style={{ width: "500px" }}>
            <label for="price">
              <strong>Total price(Rs) *</strong>
            </label>
            <input
              type="text"
              class="form-control"
              id="price"
              placeholder="Enter total price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <br></br>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {inputArray.map((i) => (
            <div key={i}>
              <label for="day">
                <strong>Day {i + 1}</strong>
              </label>
              <div
                className="form-group"
                style={{
                  display: "flex",
                  width: "100%",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <textarea
                  class="form-control"
                  id="day"
                  placeholder="Enter day description"
                  onChange={(e) => {
                    setDayWiseItinerary((prev) => {
                      const newDayWiseItinerary = prev.map((day) =>
                        day.day === i + 1
                          ? { ...day, description: e.target.value }
                          : day
                      );

                      if (
                        !newDayWiseItinerary.some((day) => day.day === i + 1)
                      ) {
                        newDayWiseItinerary.push({
                          day: i + 1,
                          description: e.target.value,
                          cities: [],
                          activities: [],
                          noOfActivities: 0,
                          noOfCities: 0,
                        });
                      }

                      return newDayWiseItinerary;
                    });
                  }}
                  rows="3"
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="No of Activities"
                  onChange={(e) => {
                    setDayWiseItinerary((prev) => {
                      const newDayWiseItinerary = prev.map((day) =>
                        day.day === i + 1
                          ? { ...day, noOfActivities: Number(e.target.value) }
                          : day
                      );

                      if (
                        !newDayWiseItinerary.some((day) => day.day === i + 1)
                      ) {
                        newDayWiseItinerary.push({
                          day: i + 1,
                          description: "",
                          cities: [],
                          activities: [],
                          noOfActivities: Number(e.target.value),
                          noOfCities: 0,
                        });
                      }

                      return newDayWiseItinerary;
                    });
                  }}
                />

                {Array.from(
                  {
                    length: dayWiseItinerary[i + 1]?.noOfActivities || 0,
                  },
                  (_, j) => j
                ).map((_, j) => {
                  // console.log("here", dayWiseItinerary[j]);
                  return (
                    <div>
                      <input
                        type="text"
                        placeholder={`Activity ${j + 1}`}
                        className="form-control"
                        onChange={(e) => {
                          setDayWiseItinerary((prev) => {
                            return prev.map((day) =>
                              day.day === i + 1
                                ? {
                                    ...day,
                                    activities: [
                                      ...day.activities.slice(0, j),
                                      e.target.value,
                                      ...day.activities.slice(j + 1),
                                    ],
                                  }
                                : day
                            );
                          });
                        }}
                      />
                    </div>
                  );
                })}

                <input
                  type="number"
                  class="form-control"
                  id="numOfCities"
                  placeholder="Enter No of Cities Covered in this day"
                  onChange={(e) => {
                    setDayWiseItinerary((prev) => {
                      const newDayWiseItinerary = prev.map((day) =>
                        day.day === i + 1
                          ? { ...day, noOfCities: Number(e.target.value) }
                          : day
                      );

                      if (
                        !newDayWiseItinerary.some((day) => day.day === i + 1)
                      ) {
                        newDayWiseItinerary.push({
                          day: i + 1,
                          description: "",
                          cities: [],
                          activities: [],
                          noOfActivities: 0,
                          noOfCities: Number(e.target.value),
                        });
                      }

                      return newDayWiseItinerary;
                    });
                  }}
                />

                {Array.from(
                  { length: dayWiseItinerary[i + 1]?.noOfCities || 0 },
                  (_, j) => j
                ).map((_, j) => {
                  return (
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={`Name of City ${j + 1}`}
                        onChange={(e) => {
                          setDayWiseItinerary((prev) => {
                            return prev.map((day) =>
                              day.day === i + 1
                                ? {
                                    ...day,
                                    cities: [
                                      ...day.cities.slice(0, j),
                                      e.target.value,
                                      ...day.cities.slice(j + 1),
                                    ],
                                  }
                                : day
                            );
                          });
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <br></br>
            </div>
          ))}
        </div>
        <button
          type="submit"
          class={myStyle.btnUpdate2}
          style={{ width: "150px" }}
        >
          <strong>&nbsp;Create</strong>
        </button>
        &nbsp;
      </form>
      <br></br>

      <div class="card-body">
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
}

export default AddPackage;
