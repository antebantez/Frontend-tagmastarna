import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import SelectSeats from '../pages/SelectSeats';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';

const CustomizeJourney = ({ trainData, journeyData, ticket }) => {
  const [continueBooking, setContinueBooking] = useState(false);
  const [numOfTravelers, setNumOfTravelers] = useState(1);
  const journeyDepartureTime = new Date(journeyData.depFromFirstStationTime);
  journeyDepartureTime.setMinutes(journeyDepartureTime.getMinutes() + journeyData.startStationDeparture);

  const handleNumOfTravelersClick = (valueChange) => {
    setNumOfTravelers((previousValue) => previousValue + valueChange);
    if (numOfTravelers <= 0) {
      setNumOfTravelers(1);
    }
    if (numOfTravelers >= 9) {
      setNumOfTravelers(1);
      alert("Max 9 passangers!");
    }
  }

  const disabledTravelersButton = () => {
    if (numOfTravelers <= 0) {
      return (
        <Button disabled variant='warning' className='m-3 w-50 mt-4' onClick={() => setContinueBooking(true)}>Fortsätt</Button>
      )
    }
    else {
      return (
        <Button variant='warning' className='m-3 w-50 mt-4' onClick={() => setContinueBooking(true)}>Fortsätt</Button>
      )
    }
  }

  return (
    <>
      <Card className='p-3'>
        <h3>Anpassa resa</h3>
        <Card.Subtitle>
          <div className='mb-1'>Från : {journeyData.startStation}</div>
          <div className='mb-1'>Till: {journeyData.endDestination}</div>
          <div className='mb-1'>Avgångstid: {journeyDepartureTime.toLocaleString()}</div>
          <div className='mb-1'>Lediga platser: {trainData.numOfFreeSeats}</div>
          <Row className='mt-3'>
            <div className='mb-1'>Antal resande: {numOfTravelers}</div>
            {!continueBooking && <Col> <Button className='px-5 fs-3' variant="warning" onClick={() => handleNumOfTravelersClick(-1)}>-</Button></Col>}
            <Col className='text-center pt-3'><div></div></Col>
            {!continueBooking && <Col> <Button className='px-5 fs-3' variant="warning" onClick={() => handleNumOfTravelersClick(1)}>+</Button></Col>}
          </Row>
        </Card.Subtitle>
      </Card>
      <Row className='justify-content-center'>
        {continueBooking ? <SelectSeats seatData={trainData} numOfSeats={numOfTravelers} ticket={ticket} /> :
          disabledTravelersButton()}
      </Row>
    </>
  )
}

export default CustomizeJourney;