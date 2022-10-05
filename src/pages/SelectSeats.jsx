import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Seat from '../components/Seat';
import Card from 'react-bootstrap/Card'
import { Col, Row } from 'react-bootstrap'

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
        <Card className='p-3'>
          <h3>Anpassa resa</h3>
          <Card.Subtitle>
            <div>Från : {journeyData.startStation}</div>
            <div>Till: {journeyData.endDestination}</div>
            <div>
              Avgångstid: {journeyData.depFromFirstStationTime.slice(0, 19).split('T').join(' ')} + {journeyData.startStationDeparture} minuter
            </div>
            <div>Lediga platser: {trainData.numOfFreeSeats}</div>

            <p>Antal resande: </p>
            <Row>
              <Col><Button className='px-5 fs-3' variant="warning" onClick={() => handleNumOfTravelersClick(-1)}>-</Button></Col>
              <Col className='text-center pt-3'><div>{numOfTravelers}</div></Col>
              <Col><Button className='px-5 fs-3' variant="warning" onClick={() => handleNumOfTravelersClick(1)}>+</Button></Col>

            </Row>
          </Card.Subtitle>
        </Card>
        <div>
          Haer mountar vi komponent som renderar ut tåget och dess saeten
          <Row className='text-center mb-5'>
            {
              seatsToSelect === 0 &&
              < Link to={'/booking'} state={{ ticket: ticket }} >
                <Button>Bekräfta</Button>
              </Link>
            }
            {
              seatData.seats.map((seat, id) => {
                return (
                  <Col xs="2" className='bg-dark '>
                    <div id='seatDiv'
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
                    {/*seatId: {seat.seatId} seatNumber: */}{seat.seatNumber}
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