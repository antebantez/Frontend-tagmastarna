import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

const Payment = ({ ticket }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState({});

  const finalizePayment = async () => {
    let customerId;
    const getCustomerResponse = await fetch(
      `/api/user/user/${email}`
    );
    const getCustomerResponseJson = await getCustomerResponse.json();
    if (getCustomerResponseJson.success) {
      customerId = getCustomerResponseJson.customerId;
    }
    else {
      const postHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      await fetch(
        `/api/user`,
        {
          method: 'POST',
          headers: postHeaders,
          body: JSON.stringify({ name: name, email: email, phoneNumber: phoneNumber })
        }
      )
        .then(res => res.json())
        .then(
          (res) => {
            customerId = res.customerId;
          }
        )
        .catch(err => {
          console.log(err);
        });
    }

    const postRequestBody = await ticket.getBookingData();
    postRequestBody.customerId = customerId;
    console.log(customerId);
    console.log(postRequestBody);
    await fetch(
      `/api/booking`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postRequestBody)
      }
    )
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setPaymentSuccessful(true);
          postRequestBody.bookingId = result.bookingId;
          let bookingDataObject = postRequestBody;
          delete bookingDataObject['travelers'];
          setConfirmedBookingData(bookingDataObject);
        }
      )
      .catch(err => {
        console.log(err);
      });

  }

  return (
    <>
      <h4>Betalning</h4>
      <Form>
        <Form.Control className='mt-2 mb-2'
          type='text'
          name='name'
          value={name}
          placeholder='Namn'
          onChange={(event) => setName(event.target.value)}
        />
        <Form.Control className='mt-2 mb-2'
          type='text'
          name='email'
          value={email}
          placeholder='E-mail'
          onChange={(event) => setEmail(event.target.value)}
        />
        <Form.Control className='mt-2 mb-2'
          type='text'
          name='phoneNumber'
          value={phoneNumber}
          placeholder='Telefonnummer'
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <Form.Control className='mt-2 mb-2'
          type='text'
          name='paymentDetails'
          value={paymentDetails}
          placeholder='Kreditkortsnummer'
          onChange={(event) => setPaymentDetails(event.target.value)}
        />
        <Row className='justify-content-center'>
          <Button className='mt-4 w-75' variant='warning' onClick={() => finalizePayment()}>Genomför betalning</Button>
        </Row>
      </Form>
      {
        <Modal
          show={paymentSuccessful}
          backdrop="static"
          centered
        >
          <Modal.Header className='text-center'><h2>Bokning bekräftad</h2></Modal.Header>
          <Modal.Body>
            {
              Object.keys(confirmedBookingData).map((k, i) => {
                return (
                  <div key={i}>{k}: {confirmedBookingData[k]}</div>
                )
              })
            }
            <Row className='p-5'>
              <img src="https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld&amp;size=100x100" alt="" title="" />
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Link to='/'>
              <Button variant='warning' className='px-4 text-white fs-5' onClick={() => setPaymentSuccessful(false)}>X</Button>
            </Link>
          </Modal.Footer>
        </Modal>
      }
    </>
  )
}

export default Payment;