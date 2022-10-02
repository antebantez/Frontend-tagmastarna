import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SearchJourneyForm = ({ handleSearch }) => {
  const [startStation, setStartStationInput] = useState('');
  const [endStation, setEndStationInput] = useState('');
  const [date, setDateInput] = useState('');
  const [numOfTravelers, setNumOfTravelers] = useState(1);
  const [stations, setStations] = useState([]);

  const submitForm = (event) => {
    event.preventDefault();
    handleSearch({ startStation, endStation, date, numOfTravelers });
  }

  // to be used for autosuggesting stations
  useEffect(() => {
    const getStations = async () => {
      const response = await fetch('/api/searchJourney/stations');
      const json = await response.json();

      setStations(json.data);
    }

    getStations();
  }, []);

  const handleNumOfTravelersClick = (valueChange) => {
    setNumOfTravelers((previousValue) => previousValue + valueChange);
  }

  return (
    <div className="form-wrapper">

      <h2>Sök resa</h2>

      <Form onSubmit={submitForm} autoComplete='on'>
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
          onChange={(event) => setDateInput(event.target.value)}
        />

        <p>Antal resande</p>
        <Button onClick={() => handleNumOfTravelersClick(1)}>+</Button>
        <div>{numOfTravelers}</div>
        <Button onClick={() => handleNumOfTravelersClick(-1)}>-</Button>

        <Button type='submit' onClick={submitForm}>Sök</Button>
      </Form>

    </div>
  )
}

export default SearchJourneyForm;