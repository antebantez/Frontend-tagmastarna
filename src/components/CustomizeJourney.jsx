import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import SelectSeats from "../pages/SelectSeats";
import Card from "react-bootstrap/Card";
import {Col, Row} from "react-bootstrap";

import {useLocation} from "react-router-dom";

const CustomizeJourney = ({trainData, ticket, selectedJourney, active}) => {
  const [continueBooking, setContinueBooking] = useState(false);
  const [numOfTravelers, setNumOfTravelers] = useState(1);

  const setFirstDate = () => {
    const journeyDepartureTime = new Date(
      selectedJourney.depFromFirstStationTime
    );
    journeyDepartureTime.setMinutes(
      journeyDepartureTime.getMinutes() + selectedJourney.startStationDeparture
    );
    return journeyDepartureTime;
  };
  const handleNumOfTravelersClick = (valueChange) => {
    setNumOfTravelers((previousValue) => previousValue + valueChange);
    if (numOfTravelers <= 0) {
      setNumOfTravelers(1);
    }
    if (numOfTravelers >= 9) {
      setNumOfTravelers(1);
      alert("Max 9 passangers!");
    }
  };
  const disabledTravelersButton = () => {
    if (numOfTravelers <= 0) {
      return (
        <Button
          disabled
          variant="warning"
          className="m-3 w-50 mt-4"
          onClick={() => setContinueBooking(true)}
        >
          Fortsätt
        </Button>
      );
    } else {
      return (
        <Button
          variant="warning"
          className="m-3 w-50 mt-4"
          onClick={() => setContinueBooking(true)}
        >
          Fortsätt
        </Button>
      );
    }
  };
  console.log(ticket);
  return (
    <>
      <Card className="p-3">
        <Card.Subtitle>
          {console.log("Steg 3: Visa välj - resa (journeyData)")}

          <div className="mb-1">Från: {selectedJourney.startStation}</div>
          <div className="mb-1">Till: {selectedJourney.endDestination}</div>

          <div className="mb-1">
            Avgångstid: {setFirstDate().toLocaleString("sv-SE")}
          </div>

          <div className="mb-1">Lediga platser: {trainData.numOfFreeSeats}</div>
          <Row className="mt-3">
            <div className="mb-1">Antal resande: {numOfTravelers}</div>
            {!continueBooking && (
              <Col>
                {" "}
                <Button
                  className="px-5 fs-3"
                  variant="warning"
                  onClick={() => handleNumOfTravelersClick(-1)}
                >
                  -
                </Button>
              </Col>
            )}
            <Col className="text-center pt-3">
              <div></div>
            </Col>
            {!continueBooking && (
              <Col>
                {" "}
                <Button
                  className="px-5 fs-3"
                  variant="warning"
                  onClick={() => handleNumOfTravelersClick(1)}
                >
                  +
                </Button>
              </Col>
            )}
          </Row>
        </Card.Subtitle>
      </Card>
      <Row className="justify-content-center">
        {continueBooking ? (
          <SelectSeats
            seatData={trainData}
            numOfSeats={numOfTravelers}
            ticket={ticket}
            active={active}
            selectedJourney={selectedJourney}
          />
        ) : (
          disabledTravelersButton()
        )}
      </Row>
    </>
  );
};

export default CustomizeJourney;
