import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import { Col, Row } from 'react-bootstrap'
import Train from '../components/Train';

const SelectSeats = ({ seatData, numOfSeats, ticket }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatsToSelect, setSeatsToSelect] = useState(numOfSeats);
  const [carriageData, setCarriageData] = useState(null);

  const formatSeatData = () => {
    let formatedTrainData = [];

    let carriageIds = [...new Set(seatData.seats.map(seat => seat.carriageId))];
    carriageIds = carriageIds.filter(id => id !== null);
    seatData.seats.map(seat => {
      !seat.seat_booked_bool ? seat.seat_booked_bool = 0 : 1 &&
        seat.booked_seat_number ? seat.seatNumber = seat.booked_seat_number : seat.seatNumber
    });

    for (let carriageId of carriageIds) {
      let x = {
        seats: seatData.seats
          .filter(
            seat => seat.carriageId === carriageId ||
              seat.seat_booked_carriageId === carriageId
          )
          .sort((x, y) => x.seatNumber - y.seatNumber),
        carriageType: seatData.seats.filter(
          seat => seat.carriageId === carriageId ||
            seat.seat_booked_carriageId === carriageId
        ).find(x => x.carriageType != null).carriageType,
        carriageId: carriageId
      }
      formatedTrainData.push(x);
    }

    return formatedTrainData;
  }

  const [formatedTrainData, setFormatedTrainData] = useState(() => formatSeatData());

  const handleSelectSeat = (seat, eventTarget) => {
    eventTarget.classList.toggle('seat');
    eventTarget.classList.toggle('seatSelected');
    setSelectedSeats([...selectedSeats, seat]);
    ticket.addSeatReservation(
      seat.journeyId, seat.carriageId, seat.seatId, seat.seatNumber
    );
    setSeatsToSelect((previousValue) => previousValue - 1);
  }

  useEffect(() => {
    const x = async () => {
      let carriageJson = await (await fetch('../../public/Assets/carriages.json')).json();
      setCarriageData(carriageJson);
    }
    x();
  }, []);

  const slideLeft = () => {
    let s = document.getElementById('slider');
    s.scrollLeft = s.scrollLeft - 500;
  }

  const slideRight = () => {
    let s = document.getElementById('slider');
    s.scrollLeft = s.scrollLeft + 500;
  }

  return (
    <>
      <h3 style={{ 'color': 'white', 'textAlign': 'center', 'marginTop': '15px' }}>Välj säten</h3>
      {
        seatsToSelect === 0 &&
        <Row className='text-center'>
          < Link to={'/booking'} state={{ ticket: ticket }} >
            <Button className='w-50' variant='warning'>Bekräfta</Button>
          </Link>
        </Row>
      }
      <div style={{ 'color': 'white' }}>
        Mina val:
        {
          /* selectedSeats > 0 && selectedSeats.map((seat, id) => {
            return (
              <div key={id}>
                <div>Plats: {seat.seatNumber}</div>
                <div>Vagn: {seat.carriageId}</div>
              </div>
            )
          }) */
        }
      </div>
      <Card className='bg-dark'>
        <Row className='text-center'>
          <div className='relative flex items-center text-white'>
            
            <div id='slider' className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth'>
              {
                formatedTrainData.length > 0 &&
                <Train trainData={formatedTrainData} />
                /* formatedTrainData.length > 0 && formatedTrainData.seats.map((seat, id) => {
                  return (
                    <Col xs="2" className='text-white' >
                      <div className='seat'
                        key={id}
                        onClick={(event) => handleSelectSeat(seat, event.currentTarget)}
                      >
                        {seat.seatNumber}
                      </div>
                    </Col>
                  )
                }) */
              }
            </div>
          </div>
          
        </Row>
      </Card>
    </>
  )
}

export default SelectSeats;