import React from 'react';
import Carriage from './Carriage';
import {Row, Col, Container} from 'react-bootstrap'

const Train = ({ trainData }) => {
  //console.log(trainData);

  return (
    <>
      <Container fluid className=''>
        <Row className=''>
          <div className=''>
        {
          trainData.map(carriage => {
            return (
            <Col xs="12" className=''>
            <div className='text-white'>
              <h3>
                  
              </h3>
            </div>
                <div  className='mb-5 bg-dark rounded'>
                  <Carriage key={carriage.carriageId} carriageData={carriage} />
                </div>
              
            </Col>
              
              )
            })
          }
      </div>
        </Row>
          </Container>
    </>
  )
}

export default Train;