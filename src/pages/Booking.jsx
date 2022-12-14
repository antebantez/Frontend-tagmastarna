import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Payment from '../components/Payment';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const Booking = () => {
  const location = useLocation();
  const [ticket] = useState(location.state.ticket);
  const [travelerCategories, setTravelerCategories] = useState(
    { adult: 0, child: 0, senior: 0, youth: 0, student: 0 }
  );
  const [makePayment, setMakePayment] = useState(false);
  const [numOfTravelers, setNumOfTravelers] = useState(ticket.getSeats().length);
  const [travelerCategoriesSelected, setTravelerCategoriesSelected] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(ticket.getPrice(travelerCategories));
  }, [travelerCategories]);

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

  const travelerCategoryChange = async (category, change) => {
    if (numOfTravelers === travelerCategoriesSelected && change > 0) {
      return;
    }
    else if (travelerCategories[category] === 0 && change < 0) {
      return;
    }
    else {
      setTravelerCategories(previousState => ({ ...previousState, [category]: previousState[category] + change }), setTotalPrice(ticket.getPrice(travelerCategories)));
      setTravelerCategoriesSelected(travelerCategoriesSelected + change);
      setTotalPrice(ticket.getPrice(travelerCategories));
    }
  }

  const addCancellationProtection = (e) => {
    ticket.setCancellationProtection(e);
    setTotalPrice(ticket.getPrice(travelerCategories));
  }

  return (
    <>
      <Card className='p-2 mt-5'>
        <h2 style={{ 'textAlign': 'center' }}>Slutf??r bokning</h2>
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
              <div>
                <h5 style={{ 'marginTop': '20px', 'textAlign': 'center' }}>Resen??rer</h5>
                <Row className='text-center mb-2'>
                  <Col><Button variant='warning' onClick={() => travelerCategoryChange('adult', -1)}>-</Button></Col>
                  <Col className='mx-4'><div className='mt-2'>Vuxen: {travelerCategories.adult}</div></Col>
                  <Col><Button variant='warning' onClick={() => travelerCategoryChange('adult', +1)}>+</Button></Col>
                </Row>
                <Row className='text-center mb-2'>
                  <Col><Button variant='warning' onClick={() => travelerCategoryChange('child', -1)}>-</Button></Col>
                  <Col className='mx-4'><div className='mt-2'>Barn: {travelerCategories.child}</div></Col>
                  <Col><Button variant='warning' onClick={() => travelerCategoryChange('child', +1)}>+</Button></Col>
                </Row>
                <Row className='text-center mb-2'>
                  <Col><Button variant='warning' onClick={() => travelerCategoryChange('youth', -1)}>-</Button></Col>
                  <Col xs='5'><div className='mt-2'>Ungdom: {travelerCategories.youth}</div></Col>
                  <Col><Button variant='warning' onClick={() => travelerCategoryChange('youth', +1)}>+</Button></Col>
                </Row>
                <Row className='text-center mb-2'>
                  <Col><Button variant='warning' onClick={() => travelerCategoryChange('student', -1)}>-</Button></Col>
                  <Col xs='5' ><div className='mt-2'>Student: {travelerCategories.student}</div></Col>
                  <Col><Button variant='warning' onClick={() => travelerCategoryChange('student', +1)}>+</Button></Col>
                </Row>
                <Row className='text-center mb-2'>
                  <Col><Button variant='warning' onClick={() => travelerCategoryChange('senior', -1)}>-</Button></Col>
                  <Col xs='5'><div className='mt-2'>Pension??r: {travelerCategories.senior}</div></Col>
                  <Col><Button variant='warning' onClick={() => travelerCategoryChange('senior', +1)}>+</Button></Col>
                  <Form >
                    <Form.Check
                      onClick={(e) => addCancellationProtection(e.target.checked)}
                      className='text-center mx-5 px-5 mt-3 fw-bold'
                      reverse={true}
                      type="checkbox"
                      id="custom-switch"
                      label="Avbokningsskydd"
                    />
                  </Form>
                </Row>
                {
                  travelerCategoriesSelected === numOfTravelers &&
                  <Row>
                    <div
                      style={{ 'fontSize': '20px', 'marginTop': '20px', 'marginBottom': '20px', 'textAlign': 'center' }}
                    >
                      Att betala: {totalPrice} kr
                    </div>
                  </Row>
                }

                {
                  travelerCategoriesSelected === numOfTravelers &&
                  <Row className='justify-content-center'>
                    <Button className='w-50' variant='warning' onClick={() => addTravelersDataToTicket()}>Forts??tt</Button>
                  </Row>
                }
              </div>
            </div>
            :
            <div>
              <Payment ticket={ticket}></Payment>
            </div>
        }
      </Card >
    </>
  );
}

export default Booking;