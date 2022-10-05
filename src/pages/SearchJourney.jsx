import React from "react";
import { useState } from "react";
import SearchJourneyForm from "../components/SearchJourneyForm";
import Journeys from "../components/Journeys";
import buildQuery from "../utilities/utilities";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Row, Col } from "react-bootstrap";

const SearchJourney = () => {
  const [journeys, setJourneys] = useState(null);

  const handleSearch = async (searchValues) => {
    const query = buildQuery(searchValues);
    if (query) {
      try {
        const searchResponse = await fetch(`/api/searchJourney/${query}`);
        const json = await searchResponse.json();
        setJourneys(json.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Row className="searchJourney">

      </Row>
      <Row id="searchJourneyTest" className="mt-5">
        {journeys ? (
          <Journeys journeyData={journeys} />
        ) : (
          <SearchJourneyForm handleSearch={handleSearch} />
        )}
      </Row>

    </>
  );
};

export default SearchJourney;
