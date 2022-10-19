import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

const TicketPage = () => {
  const auth = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);
  const [bookingClickedId, setBookingClickedId] = useState([]);
  const [showQrCode, setShowQrCode] = useState(false);

  useEffect(() => {
    const getBookings = async () => {
      
      const bookingsResponse = await fetch(
        `api/user/bookings/${auth.email}`
      );
      let bookingsResponseJson = await bookingsResponse.json();
      
      let formatedBookings = [];
      for (let booking of bookingsResponseJson.data) {
        if (formatedBookings.find(x => x.id === booking.booking_id)) {
          let x = formatedBookings.find(x => x.id === booking.booking_id);
          x.seats.push(booking.seatNumber);
          x.travelerCategories.push(booking.travelerCategory);
        }
        else {
          formatedBookings.push(
            {
              id: booking.booking_id,
              carriageId: booking.carriageId,
              customerName: booking.name,
              departureTime: booking.departureTime,
              seats: [booking.seatNumber],
              travelerCategories: [booking.travelerCategory],
              startStation: booking.startStation,
              endStation: booking.endStation
            }
          )
        }
      }
      setBookings(formatedBookings);
    }

    getBookings();
  }, []);

  return (
    <>
    <Container  className="">
      <Card id="myTickets" className="mt-5 p-1" >
      <Row className="text-center">
            <Col className="p-3">
        <h1>Mina biljetter</h1>
        </Col>
          </Row>
          
          {bookings.length > 0 &&
            bookings.map((booking, id) => (         
              <Card key={id} className="m-2 bg-warning" onClick={() => { setShowQrCode(true); setBookingClickedId(booking.id); }}>
              <Row className="text-center">
              <Col>
                  <div>Från: {booking.startStation }</div>
                  <div>Till: {booking.endStation}</div>
                  <div>Boknings-ID: {booking.id }</div>
                  <div>Avgångstid: {booking.departureTime.slice(0,19).split('T').join(' ')}</div>
                  <div>Vagn: {booking.carriageId }</div>
                  <div>Säten: {booking.seats.join(', ')}</div> 
              </Col>
                </Row>
                </Card>
            ))
          }
      </Card>
      </Container>   
        <Modal
          show={showQrCode}
          backdrop="static"
          centered
        >
          <Modal.Header className='text-center'><h2>Bokning bekräftad</h2></Modal.Header>
          <Modal.Body>
            <h6 className='text-center'>Skanna din QR-kod för att visa biljetten</h6>
            <Row className='p-5 '>
              <Col className='text-center'>
              {
                //qrCodeLoading ?
                  //<Spinner size="xxl" animation='grow' variant='warning' role="status" /> :
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${bookingClickedId}&amp;size=100x100`} alt='' title=''></img>
              }
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
              <Button variant='warning' className='px-4 text-white fs-5' onClick={() => setShowQrCode(false)}>X</Button>
          </Modal.Footer>
        </Modal>
  </>    
  );
};

export default TicketPage;
