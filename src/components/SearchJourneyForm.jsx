import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row } from "react-bootstrap";

const SearchJourneyForm = ({ handleSearch }) => {
  const [startStation, setStartStationInput] = useState("");
  const [endStation, setEndStationInput] = useState("");
  const [date, setDateInput] = useState("");
  const [stations, setStations] = useState([]);

  const submitForm = (event) => {
    event.preventDefault();
    handleSearch({ startStation, endStation, date });
  };

  useEffect(() => {
    const getStations = async () => {
      const response = await fetch("/api/searchJourney/stations");
      const json = await response.json();
      setStations(Array.from(new Set(json.data)));
    };

    getStations();
  }, []);

  return (<>

    <Row id="searchJourneyForm" className="searchJourneyForm">
      <div className="form-wrapper ">
        <Form onSubmit={submitForm} autoComplete="on" className="">
          <Form.Group>
            <Form.Control
              list="list-stations"
              id="selectRoutesForm"
              type="text"
              name="startStation"
              value={startStation}
              placeholder="Från"
              onChange={(event) => setStartStationInput(event.target.value)}
              className="m-3 p-2 fs-3 border-0"
            />
            <datalist id='list-stations'>
              {
                stations && stations.map((station) => <option key={station}>{station}</option>)
              }
            </datalist>

            <Form.Control
              list="list-destination-stations"
              id="selectRoutesForm"
              type="text"
              name="endStation"
              value={endStation}
              placeholder="Till"
              onChange={(event) => setEndStationInput(event.target.value)}
              className="m-3 p-2 fs-3 border-0"
            />
            <datalist id='list-destination-stations'>
              {
                stations && stations.map((station) => <option key={station}>{station}</option>)
              }
            </datalist>

            <Form.Control
              id="selectRoutesForm"
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              name="date"
              value={date}
              onChange={(event) => setDateInput(event.target.value)}
              className="m-3 p-2 fs-3 border-0 text-white"
            />
          </Form.Group>

          <Button variant="warning" className="m-3 px-5 py-2" type="submit" onClick={submitForm}>
            Sök
          </Button>
        </Form>
      </div>
    </Row>
  </>
  );
};

export default SearchJourneyForm;
