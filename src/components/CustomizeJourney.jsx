import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import SelectSeats from '../pages/SelectSeats';

const CustomizeJourney = ({ trainData, journeyData, ticket }) => {
  const [continueBooking, setContinueBooking] = useState(false);
  const [numOfTravelers, setNumOfTravelers] = useState(1);
  const [seatsToSelect, setSeatsToSelect] = useState(1);
  const journeyDepartureTime = new Date(journeyData.depFromFirstStationTime);
  journeyDepartureTime.setMinutes(journeyDepartureTime.getMinutes() + journeyData.startStationDeparture);

  const handleNumOfTravelersClick = (valueChange) => {
    setNumOfTravelers((previousValue) => previousValue + valueChange);
    setSeatsToSelect((previousValue) => previousValue + valueChange);
  }

  return (
    <>
      <h3>Anpassa resa</h3>
      <div>
        <div>Från : {journeyData.startStation}</div>
        <div>Till: {journeyData.endDestination}</div>
        <div>Avgångstid: {journeyDepartureTime.toLocaleString()}</div>
        <div>Lediga platser: {trainData.numOfFreeSeats}</div>
        <p>Antal resande: {numOfTravelers}</p>
        {!continueBooking && <Button onClick={() => handleNumOfTravelersClick(1)}>+</Button>}
        {!continueBooking && <Button onClick={() => handleNumOfTravelersClick(-1)}>-</Button>}
      </div>

      <div>
        {continueBooking ? <SelectSeats seatData={trainData} numOfSeats={seatsToSelect} ticket={ticket} /> :
          <Button onClick={() => setContinueBooking(true)}>Fortsätt</Button>}
      </div>
    </>
  )
}

export default CustomizeJourney;