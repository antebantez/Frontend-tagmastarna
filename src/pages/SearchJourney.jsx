import React from 'react'
import { useState } from 'react';
import SearchJourneyForm from '../components/SearchJourneyForm';
import Journeys from '../components/Journeys';

const SearchJourney = () => {

  const [journeys, setJourneys] = useState(null);
  const [stations, setStations] = useState([]);

  const buildQuery = (values) => {
    const mappedValues = Object.keys(values).map((key) => {
      if (values[key]) {
        return `${key}=${values[key]}`;
      }
    });

    return mappedValues[0] ? `?${mappedValues.join('&')}` : '';
  }

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
  }

  // useEffect(() => {
  //   const getStations = async () => {
  //     const response = await fetch('...');
  //     const json = await response.json();

  //     setStations(json.data);
  //   }

  //   getStations();
  // }, []);

  return (
    <>

      <div>SearchJourney</div>

      {journeys ? <Journeys journeyData={journeys} /> : <SearchJourneyForm handleSearch={handleSearch} />}

    </>
  );
}

export default SearchJourney;