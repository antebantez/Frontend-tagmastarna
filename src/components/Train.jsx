import React, { useState } from 'react';
import Carriage from './Carriage';
import { Row, Col, Container } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const Train = ({ trainData, selectSeatsCallback, number, ticket }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatsToSelect, setSeatsToSelect] = useState(number)

  const handleSelectSeats = (seat, eventTarget, carriageType) => {
    let x = selectedSeats.find(x => x.seatId == seat.seatId);
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
      carriageType === 1 ? ticket.setFirstClass(1) : ticket.setFirstClass(0);
    }
  }


  return (
    <>

      <h2 style={{ 'color': 'white', 'textAlign': 'center', 'marginTop': '15px' }}>Välj säten</h2>

      <div style={{ 'color': 'white' }}>
        {
          seatsToSelect === selectedSeats.length &&
          <Row className='text-center'>
            < Link to={'/booking'} state={{ ticket: ticket }} >
              <Button
                className='w-50'
                variant='warning'
                onClick={() => selectSeatsCallback(selectedSeats)}
              >Bekräfta
              </Button>
            </Link>
          </Row>
        }
      </div>
      <Container fluid className=''>

        <Row className=''>
          <div className=''>
            <Carousel controls={false} interval={null}>
              {
                trainData.map((carriage) => {
                  return (
                    <Carousel.Item>

                      <Col xs="12" className=''>
                        <div className='text-white mt-3'>

                          <h4 className="text-decoration-underline">
                            {carriage.carriageType == 1 ? "Första klass" : ""}
                            {carriage.carriageType == 2 ? "Andra klass" : ""}
                            {carriage.carriageType == 3 ? "Bistrovagn" : ""}
                            {carriage.carriageType == 4 ? "Manövervagn" : ""}
                          </h4>

                        </div>
                        <div className='mb-5 bg-dark rounded'>
                          <Container fluid>
                            <Row>
                              {
                                carriage.seats.map((seat, x) => {
                                  return (
                                    <Col>
                                      <div
                                        //className='px-3 py-2 fw-bold m-1 rounded seat'
                                        className={seat.seat_booked_bool ? 'px-3 py-2 fw-bold m-1 rounded occupiedSeat' : 'px-3 py-2 fw-bold m-1 rounded seat'}
                                        id={seat.seatId}
                                        key={x}
                                        onClick={seat.seat_booked_bool ? () => { } : (event) => handleSelectSeats(seat, event.currentTarget, carriage.carriageType)}
                                      >
                                        {seat.seatNumber}
                                      </div>
                                    </Col>
                                  )
                                })
                              }
                            </Row>
                          </Container>
                        </div>

                      </Col>
                    </Carousel.Item>
                  )
                })
              }
            </Carousel>
          </div>
        </Row>

      </Container>
    </>
  )
}

export default Train;