import React from 'react';
import Carriage from './Carriage';
import { Row, Col, Container } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'

const Train = ({ trainData }) => {
  //console.log(trainData);

  return (
    <>
      <Container fluid className=''>
        <Row className=''>
          <div className=''>
            <Carousel controls={false} interval={null}>
        {
          trainData.map(carriage => {
            return (
            <Carousel.Item>
              
              <Col xs="12" className=''>
                  <div className='text-white'>
                    
              <h3>
                    {carriage.carriageType == 1 ? "Första klass" : "" }
                    {carriage.carriageType == 2 ? "Andra klass" : ""  }
                    {carriage.carriageType == 3 ? "Bistrovagn" : ""  }
                    {carriage.carriageType == 4 ? "Manövervagn" : "" }
              </h3>
                      
            </div>
                <div  className='mb-5 bg-dark rounded'>
                  <Carriage key={carriage.carriageId} carriageData={carriage} />
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