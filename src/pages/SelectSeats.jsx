import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import { Col, Row } from 'react-bootstrap'

const SelectSeats = ({ seatData, numOfSeats, ticket }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatsToSelect, setSeatsToSelect] = useState(numOfSeats);

  const handleSelectSeat = (seat, eventTarget) => {
    eventTarget.classList.toggle('seat');
    eventTarget.classList.toggle('seatSelected');
    setSelectedSeats([...selectedSeats, seat]);
    ticket.addSeatReservation(
      seat.journeyId, seat.carriageId, seat.seatId, seat.seatNumber
    );
    setSeatsToSelect((previousValue) => previousValue - 1);
  }

  return (
    <>
      <h3 style={{ 'color': 'white', 'textAlign': 'center', 'marginTop': '15px' }}>Välj säten</h3>
      {
        seatsToSelect === 0 &&
        <Row className='text-center'>
          < Link to={'/booking'} state={{ ticket: ticket }} >
            <Button className='w-50' variant='warning'>Bekräfta</Button>
          </Link>
        </Row>
      }
      <div style={{ 'color': 'white' }}>
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
        <Row className='text-center'>
          {
            seatData.seats.map((seat, id) => {
              return (
                <Col xs="2" className='text-white' >
                  <div className='seat'
                    key={id}
                    onClick={(event) => handleSelectSeat(seat, event.currentTarget)}
                  >
                    {seat.seatNumber}
                  </div>
                </Col>
              )
            })
          }
        </Row>
      </div>
    </>
  )
}

export default SelectSeats;