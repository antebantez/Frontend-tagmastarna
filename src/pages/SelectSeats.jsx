import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Booking from './Booking';
import { Link } from 'react-router-dom';
import Ticket from '../classes/Ticket';

const SelectSeats = ({ seatData, numOfSeats, ticket }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatsToSelect, setSeatsToSelect] = useState(numOfSeats);

  const handleSelectSeat = (seat) => {
    setSelectedSeats([...selectedSeats, seat]);
    ticket.addSeatReservation(
      seat.journeyId, seat.carriageId, seat.seatId, seat.seatNumber
    );
    setSeatsToSelect((previousValue) => previousValue - 1);
  }

  return (
    <>
      <h3>Välj säten</h3>
      <div>
        Mina val:
        {
          selectedSeats > 0 && selectedSeats.map((seat, id) => {
            return (
              <div key={id}>
                <div>Plats: {seat.seatNumber}</div>
                <div>Vagn: {seat.carriageId}</div>
              </div>
            )
          })
        }
      </div>
      <div>
        {
          seatsToSelect === 0 &&
          < Link to={'/booking'} state={{ ticket: ticket }} >
            <Button>Bekräfta</Button>
          </Link>
        }
        {
          seatData.seats.map((seat, id) => {
            return (
              <div
                key={id}
                onClick={() => handleSelectSeat(seat)}
                style={
                  {
                    color: 'white',
                    backgroundColor: 'green',
                    padding: '10px',
                    margin: '10px',
                    maxWidth: '300px',
                    justifyContent: 'center'

                  }
                }
              >
                seatId: {seat.seatId} seatNumber: {seat.seatNumber} carriageId: {seat.carriageId}
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default SelectSeats;