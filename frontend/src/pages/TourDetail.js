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
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TourDetail = () => {
  const [packages, setPackages] = React.useState([]);
  const selector = useSelector((state) => state.package);
  const packName = selector?.name;
  // console.log(packId);
  const retrievePackage = async () => {
    await axios.get("http://127.0.0.1:8000/all-packages").then((res) => {
      setPackages(res.data.packages);
    });
  };

  useEffect(() => {
    retrievePackage();
  }, []);
  return packages
    .filter((pack, index) => {
      return pack.name === packName && index !== 0;
    })
    .map((pack) => {
      // console.log(pack.dayWiseItinerary);
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
          </div>
        </>
      );
    });
};
export default TourDetail;
