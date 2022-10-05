import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Payment = ({ ticket }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');

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
        }
      )
      .catch(err => {
        console.log(err);
      });
  }

  /* const finalizePayment = async () => {
    let customerId = await getCustomerId();
    console.log(customerId);
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
        //body: JSON.stringify(ticket.getBookingData())
        body: JSON.stringify(postRequestBody)
      }
    )
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
        }
      )
      .catch(err => {
        console.log(err);
      });
  } */

  return (
    <>
      <h3>Betalning</h3>
      <Form.Control
        type='text'
        name='name'
        value={name}
        placeholder='Namn'
        onChange={(event) => setName(event.target.value)}
      />
      <Form>
        <Form.Control
          type='text'
          name='email'
          value={email}
          placeholder='E-mail'
          onChange={(event) => setEmail(event.target.value)}
        />
        <Form.Control
          type='text'
          name='phoneNumber'
          value={phoneNumber}
          placeholder='Telefonnummer'
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <Form.Control
          type='text'
          name='paymentDetails'
          value={paymentDetails}
          placeholder='Kreditkortsnummer'
          onChange={(event) => setPaymentDetails(event.target.value)}
        />
        <Button onClick={() => finalizePayment()}>Genomför betalning</Button>
      </Form>
    </>
  )
}

export default Payment;