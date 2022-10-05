import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import SelectSeats from '../pages/SelectSeats';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';

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
      <Card className='p-3'>
        <h3>Anpassa resa</h3>
        <Card.Subtitle>
          <div>Från : {journeyData.startStation}</div>
          <div>Till: {journeyData.endDestination}</div>
          <div>Avgångstid: {journeyDepartureTime.toLocaleString()}</div>
          <div>Lediga platser: {trainData.numOfFreeSeats}</div>
          <Row>
            {!continueBooking && <Col> <Button className='px-5 fs-3' variant="warning" onClick={() => handleNumOfTravelersClick(-1)}>-</Button></Col>}
            <Col className='text-center pt-3'><div>{numOfTravelers}</div></Col>
            {!continueBooking && <Col> <Button className='px-5 fs-3' variant="warning" onClick={() => handleNumOfTravelersClick(1)}>+</Button></Col>}
          </Row>
        </Card.Subtitle>
      </Card>
      <div>
        {continueBooking ? <SelectSeats seatData={trainData} numOfSeats={seatsToSelect} ticket={ticket} /> :
          <Button variant='warning' className='m-3' onClick={() => setContinueBooking(true)}>Fortsätt</Button>}
      </div>
    </>
  )
}

export default CustomizeJourney;