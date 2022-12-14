import React from "react";
import { useState } from "react";
import SearchJourneyForm from "../components/SearchJourneyForm";
import Journeys from "../components/Journeys";
import buildQuery from "../utilities/utilities";
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
      <Row id="searchJourneyTest" className="">
        {
          journeys ? (<Journeys journeyData={journeys} />) :
            (<SearchJourneyForm handleSearch={handleSearch} />)
        }
      </Row>

    </>
  );
};

export default SearchJourney;
