import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

const SearchJourneyForm = ({ handleSearch }) => {
  const [startStation, setStartStationInput] = useState('');
  const [endStation, setEndStationInput] = useState('');
  const [date, setDateInput] = useState('');

  const submitForm = (event) => {
    event.preventDefault();
    handleSearch({ startStation, endStation, date });
  }

  return (
    <div className="form-wrapper">

      <h2>Sök resa</h2>

      <Form onSubmit={submitForm} autoComplete='off'>
        <Form.Control
          type='text'
          name='startStation'
          value={startStation}
          placeholder='Från'
          onChange={(event) => setStartStationInput(event.target.value)}
        />

        <Form.Control
          type='text'
          name='endStation'
          value={endStation}
          placeholder='Till'
          onChange={(event) => setEndStationInput(event.target.value)}
        />

        <Form.Control
          type='date'
          name='date'
          value={date}
          placeholder='Datum'
          onChange={(event) => setDateInput(event.target.value)}
        />

        <button onClick={submitForm}>Sök</button>
      </Form>
    </div>
  )
}

export default SearchJourneyForm;