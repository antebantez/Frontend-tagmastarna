import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap'


const Carriage = ({ carriageData, selectSeatsCallback, number }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatsToSelect, setSeatsToSelect] = useState(number)

  const handleSelectSeats = (seat, eventTarget) => {
    let x = selectedSeats.find(x => x.seatId == seat.seatId);
    console.log(x);
    if (selectedSeats.find(x => x.seatId == seat.seatId)) {
      eventTarget.classList.toggle('seat');
      eventTarget.classList.toggle('seatSelected');
      setSelectedSeats(selectedSeats.filter(x => x.seatId !== seat.seatId));
      return;
    }
    if (selectedSeats.length < seatsToSelect) {
      eventTarget.classList.toggle('seat');
      eventTarget.classList.toggle('seatSelected');
      setSelectedSeats([...selectedSeats, seat]);
    }
  }

  return (
    <>
      <Container fluid>
        <Row>
          {
            carriageData.seats.map((seat, x) => {
              return (
                <Col>
                  <div
                    className='px-3 py-2 fw-bold m-1 rounded seat'
                    id={seat.seatId}
                    key={x}
                    onClick={(event) => handleSelectSeats(seat, event.currentTarget)}
                  >
                    {seat.seatNumber}
                  </div>
                </Col>
              )
            })
          }
        </Row>
      </Container>
    </>
  )
}

export default Carriage;