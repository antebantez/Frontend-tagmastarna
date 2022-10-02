import React from 'react'

const SelectSeats = ({ trainData, journeyData }) => {

  console.log(journeyData);
  console.log(trainData);

  return (
    <>
      <h3>Anpassa resa</h3>
      <div>
        <div>Från : {journeyData.startStation}</div>
        <div>Till: {journeyData.endDestination}</div>
        <div>Avgångstid : {journeyData.depFromFirstStationTime} + {journeyData.startStationDeparture} minuter</div>
        <div>Lediga platser : { }</div>
      </div>
      <div>
        Haer mountar vi komponent som renderar ut tåget och dess saeten
        {
          trainData.map((seat, id) => {
            return <div key={id}>{seat.seatId}</div>
          })
        }
      </div>
    </>
  )
}

export default SelectSeats