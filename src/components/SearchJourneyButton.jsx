import React from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const SearchJourney = () => {
  return (
    <Row>
        <div id='hpDiv' className='text-center' >
          
        <Col className=''>
          <Link to="/ticketPage"><Button id='testKnapp' className='border border-2 border-dark mt-5'> Sök resa</Button></Link>
          
          </Col>
          </div>
        </Row>
  )
}

export default SearchJourney