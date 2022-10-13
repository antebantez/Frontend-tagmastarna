import React from 'react';
import {Row, Col, Container} from 'react-bootstrap'


const Carriage = ({ carriageData }) => {
  console.log(carriageData);

  return (
    <>
      <Container fluid>
        <Row>
      {
        carriageData.seats.map(seat => {
          return (
            <Col>
              <div className='px-3 py-2 fw-bold m-1 rounded bg-success' id={seat.seatId}>
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