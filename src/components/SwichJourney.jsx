import React, {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {journeyData} from "../mongoDb/features/journeyDataSlice";
import {journeyDataReturn} from "../mongoDb/features/journeyDataReturnSlice";
import {incrementByOne} from "../mongoDb/features/roundsSlice";
import SearchJourneyFormEnkel from "./SearchJourneyForm";
import buildQuery from "../utilities/utilities";
import Journeys from "./Journeys";
import {Row} from "react-bootstrap";

const SearchJourney = ({handleSearch}) => {
  const [active, setActive] = useState("EnkelResa");
  const [journeys, setJourneys] = useState(null);
  const [journeysReturn, setJourneyReturns] = useState(null);

  const dispatch = useDispatch();

  // Search through values and sets values for 'simple ticket 'or 'tur & return'

  handleSearch = async (searchValues) => {
    const query = buildQuery(searchValues);

    if (active === "TurRetur") {
      const query2 = buildQuery({
        startStation: searchValues.endStation,
        endStation: searchValues.startStation,
        date: searchValues.dateFrom,
      });

      if (query && query2) {
        const searchResponse = await fetch(`/api/searchJourney/${query}`);
        const searchResponse2 = await fetch(`/api/searchJourney/${query2}`);
        const json = await searchResponse.json();
        const json2 = await searchResponse2.json();
        setJourneys(json.data);
        setJourneyReturns(json2.data);
        dispatch(journeyData(json.data));
        dispatch(journeyDataReturn(json2.data));
        dispatch(incrementByOne());
      }
      try {
      } catch (error) {
        console.log(error);
      }
    } else {
      if (query) {
        const searchResponse = await fetch(`/api/searchJourney/${query}`);
        const json = await searchResponse.json();
        setJourneys(json.data);
        dispatch(journeyData(json.data));
        dispatch(incrementByOne());
      }
      try {
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log("Steg 1: Skapa twå lisor");
  console.log(journeys);
  console.log(journeysReturn);
  return (
    <>
      <Row id="searchJourneyTest" className="">
        {journeys ? (
          <Journeys active={active} journeyData={journeys} />
        ) : (
          <>
            <nav>
              <Button
                variant="warning"
                style={{margin: "1vh"}}
                onClick={() => setActive("EnkelResa")}
              >
                Enkel resa
              </Button>

              <Button variant="warning" onClick={() => setActive("TurRetur")}>
                Tur och retur
              </Button>
            </nav>

            <Row id="searchJourneyEnkel" className="searchJourneyEnkel">
              <SearchJourneyFormEnkel
                handleSearch={handleSearch}
                active={active}
                journeyData={journeys}
                journeyDataReturn={journeysReturn}
              />
            </Row>
          </>
        )}
        ;
      </Row>
    </>
  );
};

export default SearchJourney;
