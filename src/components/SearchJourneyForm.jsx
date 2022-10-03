import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";

const SearchJourneyForm = ({ handleSearch }) => {
  const [startStation, setStartStationInput] = useState("");
  const [endStation, setEndStationInput] = useState("");
  const [date, setDateInput] = useState("");
  const [stations, setStations] = useState([]);

  const submitForm = (event) => {
    event.preventDefault();
    handleSearch({ startStation, endStation, date });
  };

  // to be used for autosuggesting stations
  useEffect(() => {
    const getStations = async () => {
      const response = await fetch("/api/searchJourney/stations");
      const json = await response.json();

      setStations(json.data);
    };

    getStations();
  }, []);

  return (
    <Row>
      <div className="form-wrapper">
        <Form onSubmit={submitForm} autoComplete="on">
          <Form.Control
            type="text"
            name="startStation"
            value={startStation}
            placeholder="Från"
            onChange={(event) => setStartStationInput(event.target.value)}
          />

          <Form.Control
            type="text"
            name="endStation"
            value={endStation}
            placeholder="Till"
            onChange={(event) => setEndStationInput(event.target.value)}
          />

          <Form.Control
            type="date"
            name="date"
            value={date}
            onChange={(event) => setDateInput(event.target.value)}
          />

          <Button type="submit" onClick={submitForm}>
            Sök
          </Button>
        </Form>
      </div>
    </Row>
  );
};

export default SearchJourneyForm;
