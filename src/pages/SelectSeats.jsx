import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import { Row } from 'react-bootstrap'
import Train from '../components/Train';

const SelectSeats = ({ seatData, numOfSeats, ticket }) => {
  const [seatsToSelect] = useState(numOfSeats);
  const [allSeats, setAllSeats] = useState([]);
  const [formattedTrainData, setFormattedTrainData] = useState([]);

  const formatSeatData = () => {
    let bookedSeats = [];
    for (let seat of allSeats) {
      if (!seatData.seats.find(x => x.seatId === seat.seatId)) {
        seat.seat_booked_bool = 1;
        bookedSeats.push(seat)
      }
    }
    seatData.seats = [...seatData.seats, ...bookedSeats];
    let formattedTrainData = [];

    let carriageIds = [...new Set(seatData.seats.map(seat => seat.carriageId))];
    carriageIds = carriageIds.filter(id => id !== null);
    seatData.seats.map(seat => {
      !seat.seat_booked_bool ? seat.seat_booked_bool = 0 : 1 &&
        seat.booked_seat_number ? seat.seatNumber = seat.booked_seat_number : seat.seatNumber
    });

    for (let carriageId of carriageIds) {
      let x = {
        seats: seatData.seats
          .filter(
            seat => seat.carriageId === carriageId ||
              seat.seat_booked_carriageId === carriageId
          )
          .sort((x, y) => x.seatNumber - y.seatNumber),
        carriageType: seatData.seats.filter(
          seat => seat.carriageId === carriageId ||
            seat.seat_booked_carriageId === carriageId
        ).find(x => x.carriageType != null).carriageType,
        carriageId: carriageId
      }
      formattedTrainData.push(x);
    }

    return formattedTrainData;
  }

  useEffect(() => {
    const getAllSeats = async () => {
      const allSeats = await fetch(`/api/selectSeats/${ticket.journeyId}`);
      const allSeatsJson = await allSeats.json();
      setAllSeats(allSeatsJson.data);
      setFormattedTrainData(formatSeatData());
    }

    getAllSeats();
  }, []);

  const handleSelectSeats = (seats) => {
    for (let seat of seats) {
      ticket.addSeatReservation(
        seat.journeyId, seat.carriageId, seat.seatId, seat.seatNumber
      );
    }
  }

  return (
    <>

      <Card className='bg-dark mt-3'>
        <Row className='text-center'>
          <div className='relative flex items-center text-white'>

            <div id='slider' className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth'>
              {
                formattedTrainData.length > 0 &&
                <Train
                  trainData={formatSeatData()}
                  selectSeatsCallback={handleSelectSeats}
                  number={seatsToSelect}
                  ticket={ticket}
                />
              }
            </div>
          </div>

        </Row>
      </Card>
    </>
  )
}

export default SelectSeats;