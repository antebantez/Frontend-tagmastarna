import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import Card from "react-bootstrap/Card";
import {useSelector} from "react-redux";
import TicketReturn from "../../classes/TicketReturn";
import {useLocation} from "react-router-dom";
import PriceReturn from "../../classes/PriceReturn";
import TrainReturn from "./TrainReturn";
const JourneysReturn = () => {
  const location = useLocation();
  /*  Return ticket info */

  const [ticketReturn, setTicketReturn] = useState(null);
  const [selectedJourneyReturn, setSelectedJourneyReturn] = useState(null);
  const [trainDataReturn, setTrainDataReturn] = useState(null);
  const [ticket] = useState(location.state.ticket);
  const [trainData] = useState(location.state.trainData);
  const number = useState(location.state.number);
  const [selectSeatCallback] = useState(location.state.selectSeatCallback);
  const journeyDataReturn = useSelector((state) => state.journeyDataReturn);

  const handleBooking = async (journeyReturn) => {
    try {
      setTrainDataReturn(trainData);
      setTicketReturn(new TicketReturn(journeyReturn));
      setSelectedJourneyReturn(journeyReturn);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(trainData);
  console.log(number[0]);

  return (
    <>
      <div className="mb-5">
        {console.log("här")}

        {trainDataReturn ? (
          <TrainReturn
            ticketReturn={ticketReturn}
            selectedJourneyReturn={selectedJourneyReturn}
            ticket={ticket}
            selectSeatCallback={selectSeatCallback}
          />
        ) : (
          journeyDataReturn.journeyDataReturn &&
          journeyDataReturn.journeyDataReturn.map((journeyReturn) => {
            return (
              <div key={journeyReturn.journeyId}>
                <Card className="m-4 p-3 text-center">
                  <Card.Title>Från: {journeyReturn.startStation}</Card.Title>
                  <Card.Title>Till: {journeyReturn.endDestination}</Card.Title>
                  <Card.Subtitle>
                    Vuxen pris från:{" "}
                    {PriceReturn.getAdultPriceReturn(
                      journeyReturn.endStationArrival -
                        journeyReturn.startStationDeparture
                    )}
                    :-
                  </Card.Subtitle>
                  <Card.Subtitle>
                    Avgångstid:{" "}
                    {new Date(
                      new Date(journeyReturn.depFromFirstStationTime)
                    ).toLocaleString("sv-SE")}
                  </Card.Subtitle>
                  <Card.Subtitle style={{marginBottom: "5vh"}}>
                    Beräknad restid:{" "}
                    {journeyReturn.endStationArrival -
                      journeyReturn.startStationDeparture}{" "}
                    minuter
                  </Card.Subtitle>
                  <Button
                    className="m-3"
                    variant="warning"
                    onClick={() => {
                      handleBooking(journeyReturn);
                    }}
                  >
                    Välj retur resa
                  </Button>
                </Card>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default JourneysReturn;
