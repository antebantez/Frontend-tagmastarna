import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Seat from '../components/Seat';

const SelectSeats = ({ trainData, journeyData }) => {
  const [numOfTravelers, setNumOfTravelers] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);

  console.log(journeyData);
  console.log(trainData);

  const handleNumOfTravelersClick = (valueChange) => {
    setNumOfTravelers((previousValue) => previousValue + valueChange);
    seatsToSelect((previousValue) => previousValue + valueChange);
  }

  const handleSelectSeat = (seat) => {
    console.log(seat);
  }

  return (
    <>
      <h3>Anpassa resa</h3>
      <div>
        <div>Från : {journeyData.startStation}</div>
        <div>Till: {journeyData.endDestination}</div>
        <div>
          Avgångstid: {journeyData.depFromFirstStationTime} + {journeyData.startStationDeparture} minuter
        </div>
        <div>Lediga platser: {trainData.numOfFreeSeats}</div>

        <p>Antal resande: </p>
        <Button onClick={() => handleNumOfTravelersClick(1)}>+</Button>
        <div>{numOfTravelers}</div>
        <Button onClick={() => handleNumOfTravelersClick(-1)}>-</Button>

      </div>
      <div>
        Haer mountar vi komponent som renderar ut tåget och dess saeten
        {
          trainData.seats.map((seat, id) => {
            return (
              <div
                key={id}
                onClick={() => handleSelectSeat(seat)}
              >
                seatId: {seat.seatId} seatNumber: {seat.seatNumber}
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default SelectSeats