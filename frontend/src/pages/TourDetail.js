import React from "react";
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
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const tourItinerary = [
  {
    date: "2023-11-12",
    cities: ["Oslo"],
    activities: ["Arrival", "Check-in", "City Tour", "Welcome Dinner"],
    description:
      "Arrive at the destination, check into your accommodation, explore the city on a guided tour, and enjoy a welcome dinner.",
  },
  {
    date: "2023-11-13",
    cities: ["Oslo", "Bergen"],
    activities: ["Museum Visit", "Shopping", "Cultural Event"],
    description:
      "Visit local museums, indulge in some shopping, and attend a cultural event in the evening.",
  },
  {
    date: "2023-11-14",
    cities: ["Bergen", "Stavanger", "Stockholm"],
    activities: ["Hiking Trip", "Picnic Lunch", "Scenic Views"],
    description:
      "Embark on a scenic hiking trip, have a picnic lunch, and enjoy breathtaking views of the surroundings.",
  },
  {
    date: "2023-11-15",
    cities: ["Stockholm", "Copenhagen"],
    activities: ["Beach Relaxation", "Water Sports", "Sunset Dinner"],
    description:
      "Relax on the beach, try out water sports, and end the day with a delightful dinner while watching the sunset.",
  },
  {
    date: "2023-11-16",
    cities: ["Copenhagen", "Oslo"],
    activities: ["Free Day", "Optional Excursions"],
    description:
      "Enjoy a free day to explore at your leisure or participate in optional excursions and activities.",
  },
  {
    date: "2023-11-17",
    cities: ["Oslo"],
    activities: ["Departure", "Check-out"],
    description:
      "Depart from the destination and check out from your accommodation.",
  },
];

const TourDetail = () => {
  const [packages, setPackages] = React.useState([]);
  const selector = useSelector((state) => state.package);
  const packId = selector.packId;

  const retrievePackage = async () => {
    await axios.get("http://127.0.0.1:8000/all-packages").then((res) => {
      setPackages(res.data.packages);
    });
  };
  return (
    <>
      <div className="tourDetailContainer">
        <h1 style={{ textAlign: "left", fontWeight: "700" }}>
          Scandinavian Jewels
          <span id="tourCode">EUSCN</span>
        </h1>
        <div className="tourDetailComponents">
          <div className="tourDetailImage">
            <img src="https://i0.wp.com/cms.babbel.news/wp-content/uploads/2017/02/Top_5_Winter_Survival_Secrets_From_Scandinavia.png?fit=1200%2C675&strip=none&ssl=1" />
          </div>
          <div className="tourMajorDetails">
            <div className="price">
              <p>From</p>
              <h1>Rs. 1,50,000</h1>
            </div>
            <div className="duration">
              <p>Duration</p>
              <h1>7 Days</h1>
            </div>
            <div className="cities">
              <h1>8</h1>
              <p>Cities</p>
            </div>
          </div>
        </div>
        <div className="Facilities">
          <p>
            <span style={{ fontWeight: "700" }}>Inclusions:</span> Flight,
            Accomodation, Sightseeing, Visa, Insurance
          </p>
          <p>
            <span style={{ fontWeight: "700" }}>Cities:</span> Oslo, Bergen,
            Stavanger, Stockholm, Copenhagen
          </p>
        </div>
        <div className="tourDetailDescription">
          <h1 style={{ textAlign: "left", fontWeight: "700" }}>Description</h1>
          <p>
            Explore the Wonders of Scandinavia with ExploreHub. This tour
            includes the best of Scandinavia with a visit to Oslo, Bergen,
            Stavanger, Stockholm and Copenhagen. From visiting beautiful fjords
            to exploring the cities, this tour has it all.
          </p>
        </div>
        <h1 style={{ textAlign: "left", fontWeight: "700" }}>Itinerary</h1>
        <div className="tourItinerary">
          {tourItinerary.map((day, index) => {
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
                          {day.cities.map((city) => {
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
      </div>
    </>
  );
};
export default TourDetail;
