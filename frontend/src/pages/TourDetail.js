import React, { useEffect } from "react";
import "./TourDetail.css";
import { useSelector } from "react-redux";
import axios from "axios";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import Button from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarIcon from "@mui/icons-material/Star";
const TourDetail = () => {
  const [packages, setPackages] = React.useState([]);
  const [starHovered, setStarHovered] = React.useState(null);
  const [selectedStar, setSelectedStar] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const selector = useSelector((state) => state.package);
  const packName = selector?.name;
  const packId = selector?.packId;
  const loggedInUser = useSelector((state) => state.userLogin.user);
  // console.log(packId);

  const retrievePackage = async () => {
    await axios
      .get("https://travel-guide-app.vercel.app/all-packages")
      .then((res) => {
        setPackages(res.data.packages);
      });
  };
  const retrieveUser = async () => {
    await axios
      .get("https://travel-guide-app.vercel.app/all-users")
      .then((res) => {
        res.data.users.map((user) => {
          if (user.username === loggedInUser) {
            setUser(user);
          }
        });
      });
  };
  const handleBookingRequest = async () => {
    if (loggedInUser === null) {
      alert("Please login to book this tour");
    }
    let user = user.username;
    let name = packName;
    let packId = selector?.packId;
    let destination = selector?.destination;
    let numofdays = selector?.dayWiseItinerary.length;
    let hotel = selector?.hotel;
    let transport = selector?.transport;
    let tourGuide = selector?.tourGuide;
    let totPrice = selector?.totPrice;
    let date = new Date();
    let paymentStatus = "pending";
    let bookingStatus = "pending";
    let bookingId = Math.floor(Math.random() * 1000000000);
    let bookingRequest = {
      user,
      name,
      packId,
      destination,
      numofdays,
      hotel,
      transport,
      tourGuide,
      totPrice,
      date,
      paymentStatus,
      bookingStatus,
      bookingId,
    };
    await axios(
      "http://127.0.0.1:8000/add-booking-request",
      bookingRequest
    ).then((res) => {
      if (res.data.message) {
        alert("Booking request sent successfully");
      }
      alert("Something went wrong. Please try again later");
    });
  };
  const handleStarHover = (index) => {
    setStarHovered(index);
  };

  const handleStarLeave = () => {
    setStarHovered(null);
  };

  const handleStarClick = async (index) => {
    if (loggedInUser === null) {
      return alert("Please login to rate this tour");
    }
    setSelectedStar(index);
    await axios
      .post(
        `https://travel-guide-app.vercel.app/update-ratings/${packId}/${
          index + 1
        }`
      )
      .then((res) => {
        if (res.data) {
          alert("Rating updated successfully");
        }
        alert("Something went wrong. Please try again later");
        setSelectedStar(null);
      });
  };
  useEffect(() => {
    retrieveUser();
    retrievePackage();
  }, []);
  return packages
    .filter((pack, index) => {
      return pack.name === packName && index !== 0;
    })
    .map((pack) => {
      return (
        <>
          <div className="tourDetailContainer">
            <h1 style={{ textAlign: "left", fontWeight: "700" }}>
              {pack.name}
              <span id="tourCode">{pack.packId}</span>
            </h1>
            <div className="tourDetailComponents">
              <div className="tourDetailImage">
                <img src="https://i0.wp.com/cms.babbel.news/wp-content/uploads/2017/02/Top_5_Winter_Survival_Secrets_From_Scandinavia.png?fit=1200%2C675&strip=none&ssl=1" />
              </div>
              <div className="tourMajorDetails">
                <div className="price">
                  <h1>Rs. {pack.totPrice}</h1>
                </div>
                <div className="duration">
                  <p>Duration</p>
                  <h1>{pack.dayWiseItinerary.length} Days</h1>
                </div>
                <div className="cities">
                  <h1>{pack.dayWiseItinerary[1]?.cities.length}</h1>
                  <p>Cities</p>
                </div>
              </div>
            </div>
            <div className="add-ratings">
              <div>
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    onMouseOver={() => handleStarHover(index)}
                    onMouseLeave={handleStarLeave}
                    onClick={() => handleStarClick(index)}
                  >
                    {starHovered !== null || selectedStar !== null ? (
                      index <=
                      (starHovered !== null ? starHovered : selectedStar) ? (
                        <StarIcon />
                      ) : (
                        <StarOutlineOutlinedIcon />
                      )
                    ) : (
                      <StarOutlineOutlinedIcon />
                    )}
                  </span>
                ))}
                <p>
                  Selected Rating:{" "}
                  {selectedStar !== null ? selectedStar + 1 : "None"}
                </p>
              </div>
            </div>
            <div className="Facilities">
              <p>
                <span style={{ fontWeight: "700" }}>Inclusions:</span> Flight,
                Accomodation, Sightseeing, Visa, Insurance
              </p>
              <p>
                <span style={{ fontWeight: "700" }}>Cities:</span> Oslo, Bergen,
                {pack.destination}
              </p>
            </div>
            <div className="tourDetailDescription">
              <h1 style={{ textAlign: "left", fontWeight: "700" }}>
                Description
              </h1>
              <p>
                Explore the Wonders of Scandinavia with ExploreHub. This tour
                includes the best of Scandinavia with a visit to Oslo, Bergen,
                Stavanger, Stockholm and Copenhagen. From visiting beautiful
                fjords to exploring the cities, this tour has it all.
              </p>
            </div>
            <h1 style={{ textAlign: "left", fontWeight: "700" }}>Itinerary</h1>
            <div className="tourItinerary">
              {pack?.dayWiseItinerary?.map((day, index) => {
                return (
                  <Timeline position="alternate">
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent fontWeight={700}></TimelineContent>
                      <div className="dayDetails">
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>{`Day ${index + 1}`}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              <span
                                style={{
                                  fontWeight: "700",
                                }}
                              >
                                Cities covered in this day: &nbsp;
                              </span>
                              {day?.cities.map((city) => {
                                if (day.cities.length === 1) return city;
                                return city + ", ";
                              })}
                            </Typography>
                            <Typography>
                              <span
                                style={{
                                  fontWeight: "700",
                                }}
                              >
                                Activites: &nbsp;
                              </span>
                              {day.activities.map((activity) => {
                                return activity + ", ";
                              })}
                              <br />
                              <span
                                style={{
                                  fontWeight: "700",
                                }}
                              >
                                What will be doing in this day: &nbsp;
                              </span>
                              <p>{day.description}</p>
                              <br />
                              <iframe
                                width="100%"
                                height="502"
                                id="gmap_canvas"
                                src={`https://maps.google.com/maps?q=${day.cities.join(
                                  ","
                                )}&t=&z=10&ie=UTF8&iwloc=&output=embed`}
                                frameborder=""
                                scrolling="no"
                                marginheight="0"
                                marginwidth="0"
                              ></iframe>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    </TimelineItem>
                  </Timeline>
                );
              })}
            </div>
            <button id="tour-booking-btn" onClick={handleBookingRequest}>
              Book This Tour
            </button>
          </div>
        </>
      );
    });
};
export default TourDetail;
