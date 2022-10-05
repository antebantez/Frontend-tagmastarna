import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Seat from '../components/Seat';
import Card from 'react-bootstrap/Card'
import { Col, Row} from 'react-bootstrap'

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
      <Card className='p-3'>
      <h3>Anpassa resa</h3>
      <Card.Subtitle>
        <div>Från : {journeyData.startStation}</div>
        <div>Till: {journeyData.endDestination}</div>
        <div>
          Avgångstid: {journeyData.depFromFirstStationTime.slice(0,19).split('T').join(' ')} + {journeyData.startStationDeparture} minuter
        </div>
        <div>Lediga platser: {trainData.numOfFreeSeats}</div>

          <p>Antal resande: </p>
          <Row>
            <Col><Button className='px-5 fs-3' variant="warning" onClick={() => handleNumOfTravelersClick(-1) }>-</Button></Col>
            <Col className='text-center pt-3'><div>{numOfTravelers}</div></Col>
            <Col><Button className='px-5 fs-3' variant="warning" onClick={() => handleNumOfTravelersClick(1)}>+</Button></Col>

          </Row>
        </Card.Subtitle>
        </Card>
      <div>
        Haer mountar vi komponent som renderar ut tåget och dess saeten
        <Row className='text-center mb-5'>
        {
          trainData.seats.map((seat, id) => {
            return (
              <Col xs="2" className='bg-dark '>
              <div id='seatDiv'
                key={id}
                onClick={() => handleSelectSeat(seat)}
              >
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

export default SelectSeats