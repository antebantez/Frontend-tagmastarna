import React, { useState } from 'react';
import buildQuery from '../utilities/utilities';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import CustomizeJourney from './CustomizeJourney';
import Ticket from '../classes/Ticket';
import Card from 'react-bootstrap/Card'
import Price from '../classes/Price'
const Journeys = ({ journeyData }) => {
  const [trainData, setTrainData] = useState(null);
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [ticket, setTicket] = useState(null);

  const handleBooking = async (journeyId, journeyInfo, journey) => {
    try {
      const handleBookingResponse = await fetch(
        `/api/selectSeats/seats/${journeyId}?departure=${journeyInfo.departure}&arrival=${journeyInfo.arrival}`
      );
      const json = await handleBookingResponse.json();
      let numOfFreeSeats = json.data.seats.filter(x => x.seat_booked_bool !== 1).length;
      json.data.numOfFreeSeats = numOfFreeSeats;
      journey.freeSeatsFraction = numOfFreeSeats / json.data.seats.length;
      setTicket(new Ticket(journey));
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
        <h2 className=' text-center fw-bold'>Välj resa</h2>
        {
          journeyData.length === 0 &&
          <Card className='p-5 text-center '>
            <div className='fw-bold'>
              Inga resor hittades
            </div>
            <Link to='/searchJourney'>
              <Button variant='warning' className='px-4 py-3 mt-4' onClick={() => location.reload()}>Återgå till sök</Button>
            </Link>
          </Card>
        }
        {
          trainData ? <CustomizeJourney trainData={trainData} journeyData={selectedJourney} ticket={ticket} /> :
            journeyData && journeyData.map((journey, id) => {
              return <div key={id}>

                <Card className='m-4 p-3 text-center'>
                  <Card.Title>Från: {journey.startStation}</Card.Title>
                  <Card.Title>Till: {journey.endDestination}</Card.Title>
                  <Card.Subtitle>Vuxen pris från: {Price.getAdultPrice(journey.endStationArrival - journey.startStationDeparture)}:-</Card.Subtitle>
                  <Card.Subtitle>
                    Avgångstid: {new Date(new Date(journey.depFromFirstStationTime).setMinutes(new Date(journey.depFromFirstStationTime).getMinutes() + journey.startStationDeparture)).toLocaleString()}
                  </Card.Subtitle>
                  <Card.Subtitle>Beräknad restid: {journey.endStationArrival - journey.startStationDeparture} minuter</Card.Subtitle>
                  <Button className='m-3' variant='warning'
                    onClick={() => {
                      handleBooking(
                        journey.journeyId,
                        {
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
