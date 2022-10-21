import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

const Payment = ({ ticket }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState({});
  const [qrCodeLoading, setQrCodeLoading] = useState(true);

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
          setPaymentSuccessful(true);
          postRequestBody.bookingId = result.bookingId;
          let bookingDataObject = postRequestBody;
          delete bookingDataObject['travelers'];
          setConfirmedBookingData(bookingDataObject);
          //sendConfirmationEmail(bookingDataObject);
        }
      )
      .catch(err => {
        console.log(err);
      });
    fetchQrCode();
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    validateEmail(e);
  }

  const validateEmail = (e) => {
    const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (e.target?.value && e.target.value.match(validEmail)) {
      setEmailValid(true);
      setEmail(e.target.value)
    }
    else {
      setEmailValid(false);
      setEmail(e.target.value)
    }
  }

  const handlePhoneNumber = (e) => {
    setPhoneNumber(formatPhoneNumber(e.target.value));
  }

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) {
      return phoneNumber;
    }
    phoneNumber = phoneNumber.replace(/[^\d]/g, '');

    const pNumLen = phoneNumber.length
    if (pNumLen <= 3) {
      return phoneNumber;
    }
    else if (pNumLen <= 6) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    else {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 10)}`;
    }
  }

  const handleCreditCard = (e) => {
    const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g
    const onlyNumbers = e.target.value.replace(/[^\d]/g, '')
    const length = onlyNumbers.substring(0, 16);

    setPaymentDetails(length.replace(regex, (regex, $1, $2, $3, $4) =>
      [$1, $2, $3, $4].filter(group => !!group).join(' ')
    ));
  }

  const disabledPaymentButton = () => {
    if (emailValid && phoneNumber.length == 11 && paymentDetails.length == 19 && name.length) {
      return (

        <Button onClick={() => finalizePayment()} className='mt-4 w-75' variant='warning'>Genomför betalning</Button>
      )
    }
    else {
      return (
        <Button disabled={true} onClick={() => finalizePayment()} className='mt-4 w-75' variant='warning'>Genomför betalning</Button>
      )
    }
  }
  /* Fake loading only for the looks*/
  const fetchQrCode = async () => {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    await sleep(1500);
    setQrCodeLoading(false);
  }

  const sendConfirmationEmail = async (bookingDataObject) => {
    let postRequestBody = {
      email: email,
      bookingInfo: {
        date: bookingDataObject.departureTime,
        id: bookingDataObject.bookingId
      }
    }
    await fetch(
      `/api/booking/confirmationEmail`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postRequestBody)
      }
    )
  }

  return (
    <>
      <h4>Betalning</h4>
      <Form autoComplete='off'>
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
          style={!emailValid && email.length > 0 ? { 'borderColor': 'red', 'borderWidth': '3px' } : { 'borderColor': 'lightGrey' }}
          onChange={(e) => handleEmail(e)}

        />
        <Form.Control className='mt-2 mb-2'
          type='text'
          name='phoneNumber'
          value={phoneNumber}
          placeholder='Telefonnummer'
          onChange={(e) => handlePhoneNumber(e)}
        />
        <Form.Control className='mt-2 mb-2'
          type='text'
          name='paymentDetails'
          value={paymentDetails}
          placeholder='Kreditkortsnummer'
          onChange={handleCreditCard}

        />
        <Row className='justify-content-center'>
          {
            disabledPaymentButton()
          }
        </Row >
      </Form>
      {
        <Modal
          show={paymentSuccessful}
          backdrop="static"
          centered
        >
          <Modal.Header className='text-center'><h2>Bokning bekräftad</h2></Modal.Header>
          <Modal.Body>
            <h6 className='text-center'>Skanna din QR-kod för att visa biljetten</h6>
            <Row className='p-5 '>
              <Col className='text-center'>
                {
                  qrCodeLoading ?
                    <Spinner size="xxl" animation='grow' variant='warning' role="status" /> :
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${confirmedBookingData.bookingId}&amp;size=100x100`} alt='' title=''></img>
                }
              </Col>
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