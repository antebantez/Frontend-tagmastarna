import React, { useState } from 'react';
import SelectSeats from '../pages/SelectSeats';
import buildQuery from '../utilities/utilities';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

const Journeys = ({ journeyData }) => {

  let [trainData, setTrainData] = useState(null);
  let [selectedJourney, setSelectedJourney] = useState(null);

  const handleBooking = async (journeyId, journeyInfo, journey) => {
    const query = buildQuery(journeyInfo)
    try {
      const handleBookingResponse = await fetch(
        `/api/selectSeats/seats/${journeyId}${query}`
      );
      const json = await handleBookingResponse.json();
      setTrainData(json.data);
      setSelectedJourney(journey);
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='mb-5'>
      <h2 className='mt-5 text-center fw'>Välj resa</h2>
      {
        trainData ? <SelectSeats trainData={trainData} journeyData={selectedJourney} /> :
          journeyData && journeyData.map((journey, id) => {
            return <div key={id}>
              
              <Card className='m-4 p-3 text-center'>
              <Card.Title>Från: {journey.startStation}</Card.Title>
              <Card.Title>Till: {journey.endDestination}</Card.Title>
              <Card.Subtitle>
                Avgångstid: {journey.depFromFirstStationTime.split('T')[0]} {journey.depFromFirstStationTime.split('T')[1].slice(0, 5)}
              </Card.Subtitle>
              <Card.Subtitle>Beräknad restid: {journey.endStationArrival - journey.startStationDeparture} minuter</Card.Subtitle>
              <Button className='m-3' variant='warning'
                onClick={() => {
                  handleBooking(
                    journey.journeyId,
                    {
                      //startStationId: journey.startStationId,
                      //endStationId: journey.endStationId,
                      departure: journey.startStationDeparture,
                      arrival: journey.endStationArrival
                    },
                    journey
                  )
                }}
              >
                Boka biljett
              </Button>
                </Card>
                
            </div>
          })
        }
        </div>
    </>
  );
}

export default Journeys;
