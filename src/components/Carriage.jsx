import React from 'react';

const Carriage = ({ carriageData }) => {
  console.log(carriageData);

  return (
    <>
      {
        carriageData.seats.map(seat => {
          return (
            <div id={seat.seatId}>{seat.seatNumber}</div>
          )
        })
      }
    </>
  )
}

export default Carriage;