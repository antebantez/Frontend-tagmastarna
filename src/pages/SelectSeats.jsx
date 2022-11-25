import React, {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import {Row} from "react-bootstrap";
import Train from "../components/Train";

const SelectSeats = ({seatData, numOfSeats, ticket, active}) => {
  const [seatsToSelect] = useState(numOfSeats);
  const [carriageData, setCarriageData] = useState(null);

  const formatSeatData = () => {
    let formatedTrainData = [];

    let carriageIds = [
      ...new Set(seatData.seats.map((seat) => seat.carriageId)),
    ];
    carriageIds = carriageIds.filter((id) => id !== null);
    seatData.seats.map((seat) => {
      !seat.seat_booked_bool
        ? (seat.seat_booked_bool = 0)
        : 1 && seat.booked_seat_number
        ? (seat.seatNumber = seat.booked_seat_number)
        : seat.seatNumber;
    });

    for (let carriageId of carriageIds) {
      let x = {
        seats: seatData.seats
          .filter(
            (seat) =>
              seat.carriageId === carriageId ||
              seat.seat_booked_carriageId === carriageId
          )
          .sort((x, y) => x.seatNumber - y.seatNumber),
        carriageType: seatData.seats
          .filter(
            (seat) =>
              seat.carriageId === carriageId ||
              seat.seat_booked_carriageId === carriageId
          )
          .find((x) => x.carriageType != null).carriageType,
        carriageId: carriageId,
      };
      formatedTrainData.push(x);
    }

    return formatedTrainData;
  };

  const [formatedTrainData] = useState(() => formatSeatData());

  const handleSelectSeats = (seats) => {
    for (let seat of seats) {
      ticket.addSeatReservation(
        seat.journeyId,
        seat.carriageId,
        seat.seatId,
        seat.seatNumber
      );
    }
  };

  useEffect(() => {
    const x = async () => {
      let carriageJson = await (
        await fetch("../../public/Assets/carriages.json")
      ).json();
      setCarriageData(carriageJson);
    };
    x();
  }, []);
  console.log(ticket);
  console.log(formatedTrainData);
  console.log(seatsToSelect);
  return (
    <>
      <Card className="bg-dark mt-3">
        <Row className="text-center">
          <div className="relative flex items-center text-white">
            <div
              id="slider"
              className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth"
            >
              {formatedTrainData.length > 0 && (
                <Train
                  trainData={formatedTrainData}
                  selectSeatsCallback={handleSelectSeats}
                  number={seatsToSelect}
                  ticket={ticket}
                  active={active}
                />
              )}
            </div>
          </div>
        </Row>
      </Card>
    </>
  );
};

export default SelectSeats;
