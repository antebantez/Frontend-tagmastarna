import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Payment from '../components/Payment';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';

const Booking = () => {
  const location = useLocation();
  const [ticket] = useState(location.state.ticket);
  const [travelerCategories, setTravelerCategories] = useState(
    { adult: 0, child: 0, senior: 0 }
  );
  const [makePayment, setMakePayment] = useState(false);

  const addTravelersDataToTicket = () => {
    let seatIds = [];
    for (let seat of ticket.getSeats()) {
      seatIds.push(seat.seat_id);
    }
    Object.keys(travelerCategories).forEach((k, v) => {
      for (let i = 0; i < travelerCategories[k]; i++) {
        ticket.addTraveler(
          { travelerName: '', travelerCategory: k, seatId: seatIds.pop() }
        );
      }
    });
    setMakePayment(true);
  }

  return (
    <>
      <Card className='p-2 mt-5'>
        <h2 style={{ 'textAlign': 'center' }}>Slutför bokning</h2>
        {
          !makePayment ?
            <div>
              {
                ticket.getTicketRenderInfo().map((infoField, id) => {
                  return (
                    <div key={id}>
                      {infoField.description}{infoField.value}
                    </div>
                  )
                })
              }
              <div>Bokade platser</div>
              {
                ticket.getSeats().map((seat, id) => {
                  return (
                    <div key={id}>
                      <div >
                        Plats: {seat.seat_id}
                      </div>
                      <div >
                        Vagn: {seat.carriageId}
                      </div>
                    </div>
                  )
                })
              }
              <div>
                <h5 style={{ 'marginTop': '20px', 'textAlign': 'center' }}>Resenärer</h5>
                <Row className='text-center mb-2'>
                  <Col><Button variant='warning' onClick={() => setTravelerCategories(previousState => ({ ...previousState, adult: previousState.adult - 1 }))}>-</Button></Col>
                  <Col className='mx-4'><div>Vuxen: {travelerCategories.adult}</div></Col>
                  <Col><Button variant='warning' onClick={() => setTravelerCategories(previousState => ({ ...previousState, adult: previousState.adult + 1 }))}>+</Button></Col>
                </Row>
                <Row className='text-center mb-2'>
                  <Col><Button variant='warning' onClick={() => setTravelerCategories(previousState => ({ ...previousState, child: previousState.child - 1 }))}>-</Button></Col>
                  <Col className='mx-4'><div>Barn: {travelerCategories.child}</div></Col>
                  <Col><Button variant='warning' onClick={() => setTravelerCategories(previousState => ({ ...previousState, child: previousState.child + 1 }))}>+</Button></Col>
                </Row>
                <Row className='text-center mb-2'>
                  <Col><Button variant='warning' onClick={() => setTravelerCategories(previousState => ({ ...previousState, senior: previousState.senior - 1 }))}>-</Button></Col>
                  <Col xs='5'><div>Pensionär: {travelerCategories.senior}</div></Col>
                  <Col><Button variant='warning' onClick={() => setTravelerCategories(previousState => ({ ...previousState, senior: previousState.senior + 1 }))}>+</Button></Col>
                </Row>
                <Row>
                  <div style={{ 'fontSize': '20px', 'marginTop': '20px', 'marginBottom': '20px', 'textAlign': 'center' }}>Att betala:</div>
                </Row>
                <Row className='justify-content-center'>
                  <Button className='w-50' variant='warning' onClick={() => addTravelersDataToTicket()}>Fortsätt</Button>
                </Row>
              </div>
            </div>
            :
            <div>
              {console.log(ticket.getBookingData())}
              <Payment ticket={ticket}></Payment>
            </div>
        }
      </Card >
    </>
  );
}

export default Booking;