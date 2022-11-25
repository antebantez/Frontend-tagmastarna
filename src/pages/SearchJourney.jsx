import React from "react";
import {useState} from "react";
import SwichJourney from "../components/SwichJourney";
import Journeys from "../components/Journeys";
import buildQuery from "../utilities/utilities";

import {Row, Col} from "react-bootstrap";

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
    console.log(searchValues);
  };

  return (
    <div>
      <Row className="searchJourney"></Row>
      <Row id="searchJourneyTest" className="">
        {journeys ? (
          <Journeys journeyData={journeys} />
        ) : (
          <SwichJourney handleSearch={handleSearch} />
        )}
      </Row>
    </div>
  );
};

export default SearchJourney;
