import React, { useState } from 'react';
import buildQuery from '../utilities/utilities';
import Button from 'react-bootstrap/Button';
import CustomizeJourney from './CustomizeJourney';
import Ticket from '../classes/Ticket';

const Journeys = ({ journeyData }) => {
  const [trainData, setTrainData] = useState(null);
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [ticket, setTicket] = useState(null);

  const handleBooking = async (journeyId, journeyInfo, journey) => {
    const query = buildQuery(journeyInfo)
    try {
      const handleBookingResponse = await fetch(
        //`/api/selectSeats/seats/${journeyId}${query}`
        `/api/selectSeats/seats/${journeyId}?departure=${journeyInfo.departure}&arrival=${journeyInfo.arrival}`
      );
      const json = await handleBookingResponse.json();
      setTicket(new Ticket(journey));
      setTrainData(json.data);
      setSelectedJourney(journey);
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h2>Välj resa</h2>
      {
        trainData ? <CustomizeJourney trainData={trainData} journeyData={selectedJourney} ticket={ticket} /> :
          journeyData && journeyData.map((journey, id) => {
            return (
              <div key={id}>
                <div>Från: {journey.startStation}</div>
                <div>Till: {journey.endDestination}</div>
                <div>Avgångstid: {new Date(new Date(journey.depFromFirstStationTime).setMinutes(new Date(journey.depFromFirstStationTime).getMinutes() + journey.startStationDeparture)).toLocaleString()}</div>
                <div>Beräknad restid: {journey.endStationArrival - journey.startStationDeparture} minuter</div>
                <Button
                  onClick={() => {
                    handleBooking(
                      journey.journeyId,
                      {
                        departure: journey.startStationDeparture,
                        arrival: journey.endStationArrival
                      },
                      journey
                    )
                  }}
                >
                  Boka biljett
                </Button>
              </div>
            )
          })
      }
    </>
  );
}

export default Journeys;
