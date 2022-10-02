import React, { useState } from 'react';
import SelectSeats from '../pages/SelectSeats';
import buildQuery from '../utilities/utilities';

const Journeys = ({ journeyData }) => {

  let [trainData, setTrainData] = useState(null);
  let [selectedJourney, setSelectedJourney] = useState(null);

  const handleBooking = async (journeyId, journeyInfo, journey) => {
    const query = buildQuery(journeyInfo)
    try {
      const handleBookingResponse = await fetch(
        `/api/selectSeats/seats/${journeyId}${query}`
      );
      const json = await handleBookingResponse.json();
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
        trainData ? <SelectSeats trainData={trainData} journeyData={selectedJourney} /> :
          journeyData && journeyData.map((journey, id) => {
            return <div key={id}>
              <div>Från: {journey.startStation}</div>
              <div>Till: {journey.endDestination}</div>
              <div>Avgångstid: {journey.depFromFirstStationTime}</div>
              <div>Beräknad restid: {journey.endStationArrival - journey.startStationDeparture} minuter</div>
              <button
                onClick={() => {
                  handleBooking(
                    journey.journeyId,
                    {
                      //startStationId: journey.startStationId,
                      //endStationId: journey.endStationId,
                      departure: journey.startStationDeparture,
                      arrival: journey.endStationArrival
                    },
                    journey
                  )
                }}
              >
                Boka biljett
              </button>
            </div>
          })
      }
    </>
  );
}

export default Journeys;
