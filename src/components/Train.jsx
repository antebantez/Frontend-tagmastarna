import React, {useState} from "react";
import {Row, Col, Container} from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {incrementByOne} from "../mongoDb/features/roundsSlice";

const Train = ({
  active,

  /* Single Ticket props */
  selectSeatsCallback,
  number,
  ticket,

  trainData,
  /* Single Ticket2 props */
  ticket2,
  trainData2,
  number2,

  /* Return Ticket props */

  ticketReturn,
}) => {
  const dispatch = useDispatch();
  const rounds = useSelector((state) => state.rounds);
  const journeyData = useSelector((state) => state.journeyData);
  const journeyDataReturn = useSelector((state) => state.journeyDataReturn);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatsToSelect, setSeatsToSelect] = useState(number);

  console.log(ticketReturn);
  console.log(ticket);
  /* Return Selected "Simple" ticket info  */

  const handleSelectSeats = (seat, eventTarget, carriageType) => {
    let x = selectedSeats.find((x) => x.seatId == seat.seatId);
    if (selectedSeats.find((x) => x.seatId == seat.seatId)) {
      if (seat.handicap) {
        eventTarget.classList.toggle("handicapSeat");
      } else {
        eventTarget.classList.toggle("seat");
      }
      eventTarget.classList.toggle("seatSelected");
      setSelectedSeats(selectedSeats.filter((x) => x.seatId !== seat.seatId));
      return;
    }
    if (selectedSeats.length < seatsToSelect) {
      if (seat.handicap) {
        eventTarget.classList.toggle("handicapSeat");
      } else {
        eventTarget.classList.toggle("seat");
      }
      eventTarget.classList.toggle("seatSelected");
      setSelectedSeats([...selectedSeats, seat]);
      carriageType === 1 ? ticket.setFirstClass(1) : ticket.setFirstClass(0);
    }
  };

  return (
    <>
      {active === "EnkelResa" ? (
        <form>
          <>
            {console.log("Steg 4: Välj säten för EnkelBiljett")}
            {console.log("Rounds:", rounds.rounds)}
            <h2
              style={{
                color: "white",
                textAlign: "center",
                marginTop: "15px",
              }}
            >
              Välj säten
            </h2>

            <div style={{color: "white"}}>
              {seatsToSelect === selectedSeats.length && (
                <Row className="text-center">
                  <Link
                    to={"/booking"}
                    state={{
                      ticket: ticket,
                    }}
                  >
                    <Button
                      className="w-50 mb-4"
                      variant="warning"
                      onClick={() => selectSeatsCallback(selectedSeats)}
                    >
                      Bekräfta och avsluta
                    </Button>
                  </Link>
                </Row>
              )}
            </div>
            <Container fluid className="">
              <Row className="text-center">
                <Col xs={1}>
                  <div className="text-center seatInfoHandicap"></div>
                </Col>
                <Col xs={11}>
                  <p>= Handikappsplats</p>
                </Col>
              </Row>
              <Row className="">
                <div className="">
                  <Carousel
                    controls={false}
                    interval={null}
                    touch={selectedSeats.length > 0 ? false : true}
                    indicators={selectedSeats.length > 0 ? false : true}
                  >
                    {trainData.map((carriage, x) => {
                      return (
                        <Carousel.Item key={x}>
                          <Col xs="12" className="">
                            <div className="text-white mt-3">
                              <h4 className="text-decoration-underline">
                                {carriage.carriageType == 1
                                  ? "Första klass"
                                  : ""}
                                {carriage.carriageType == 2
                                  ? "Andra klass"
                                  : ""}
                                {carriage.carriageType == 3 ? "Bistrovagn" : ""}
                                {carriage.carriageType == 4
                                  ? "Manövervagn"
                                  : ""}
                              </h4>
                            </div>
                            <div className="mb-5 bg-dark rounded">
                              <Container fluid>
                                <Row>
                                  {carriage.seats.map((seat, x) => {
                                    return (
                                      <Col key={x}>
                                        <div
                                          className={
                                            seat.seat_booked_bool
                                              ? "px-3 py-2 fw-bold m-1 rounded occupiedSeat"
                                              : seat.handicap
                                              ? "px-3 py-2 fw-bold m-1 rounded handicapSeat"
                                              : "px-3 py-2 fw-bold m-1 rounded seat"
                                          }
                                          id={seat.seatId}
                                          key={x}
                                          onClick={
                                            seat.seat_booked_bool
                                              ? () => {}
                                              : (event) =>
                                                  handleSelectSeats(
                                                    seat,
                                                    event.currentTarget,
                                                    carriage.carriageType
                                                  )
                                          }
                                        >
                                          {seat.seatNumber}
                                        </div>
                                      </Col>
                                    );
                                  })}
                                </Row>
                              </Container>
                            </div>
                          </Col>
                        </Carousel.Item>
                      );
                    })}
                  </Carousel>
                </div>
              </Row>
            </Container>
          </>
        </form>
      ) : active === "TurRetur" && rounds.rounds === 1 ? (
        <form>
          <>
            {console.log("Steg 4: Välj säten för EnkelBiljett")}
            {console.log("Rounds:", rounds.rounds)}
            <h2
              style={{color: "white", textAlign: "center", marginTop: "15px"}}
            >
              Välj säten
            </h2>

            <div style={{color: "white"}}>
              {seatsToSelect === selectedSeats.length && (
                <Row className="text-center">
                  <Link
                    to={"/journeys"}
                    state={{
                      ticket: ticket,
                      trainData: trainData,
                      number: number,
                    }}
                  >
                    <Button
                      className="w-50 mb-4"
                      variant="warning"
                      onClick={() =>
                        dispatch(incrementByOne()) &&
                        selectSeatsCallback(selectedSeats)
                      }
                    >
                      Bekräfta och välj återresa
                    </Button>
                  </Link>
                </Row>
              )}
            </div>
            <Container fluid className="">
              <Row className="text-center">
                <Col xs={1}>
                  <div className="text-center seatInfoHandicap"></div>
                </Col>
                <Col xs={11}>
                  <p>= Handikappsplats</p>
                </Col>
              </Row>
              <Row className="">
                <div className="">
                  <Carousel
                    controls={false}
                    interval={null}
                    touch={selectedSeats.length > 0 ? false : true}
                    indicators={selectedSeats.length > 0 ? false : true}
                  >
                    {trainData.map((carriage, x) => {
                      return (
                        <Carousel.Item key={x}>
                          <Col xs="12" className="">
                            <div className="text-white mt-3">
                              <h4 className="text-decoration-underline">
                                {carriage.carriageType == 1
                                  ? "Första klass"
                                  : ""}
                                {carriage.carriageType == 2
                                  ? "Andra klass"
                                  : ""}
                                {carriage.carriageType == 3 ? "Bistrovagn" : ""}
                                {carriage.carriageType == 4
                                  ? "Manövervagn"
                                  : ""}
                              </h4>
                            </div>
                            <div className="mb-5 bg-dark rounded">
                              <Container fluid>
                                <Row>
                                  {carriage.seats.map((seat, x) => {
                                    return (
                                      <Col key={x}>
                                        <div
                                          className={
                                            seat.seat_booked_bool
                                              ? "px-3 py-2 fw-bold m-1 rounded occupiedSeat"
                                              : seat.handicap
                                              ? "px-3 py-2 fw-bold m-1 rounded handicapSeat"
                                              : "px-3 py-2 fw-bold m-1 rounded seat"
                                          }
                                          id={seat.seatId}
                                          key={x}
                                          onClick={
                                            seat.seat_booked_bool
                                              ? () => {}
                                              : (event) =>
                                                  handleSelectSeats(
                                                    seat,
                                                    event.currentTarget,
                                                    carriage.carriageType
                                                  )
                                          }
                                        >
                                          {seat.seatNumber}
                                        </div>
                                      </Col>
                                    );
                                  })}
                                </Row>
                              </Container>
                            </div>
                          </Col>
                        </Carousel.Item>
                      );
                    })}
                  </Carousel>
                </div>
              </Row>
            </Container>
          </>
        </form>
      ) : (
        rounds.rounds === 2 && (
          <>
            <div style={{color: "white"}}>
              {console.log("Steg 7: Välj säten för ReturBiljett")}
              {console.log("Rounds:", rounds.rounds)}

              <Row className="text-center">
                <Link
                  to={"/bookingReturn"}
                  state={{
                    ticketReturn: ticketReturn,
                    ticket2: ticket2,
                  }}
                >
                  <Button
                    className="w-50 mb-4"
                    variant="warning"
                    onClick={() => selectSeatsCallback2(selectedSeats2)}
                  >
                    Bekräfta hela resan
                  </Button>
                </Link>
              </Row>
            </div>
            <Container fluid className="">
              <Row className="">
                <div className="">
                  {trainData2.map((carriage, x) => {
                    return (
                      <Carousel.Item key={x}>
                        <Col xs="12" className="">
                          <div className="text-white mt-3">
                            <h4 className="text-decoration-underline">
                              {carriage.carriageType == 1 ? "Första klass" : ""}
                              {carriage.carriageType == 2 ? "Andra klass" : ""}
                              {carriage.carriageType == 3 ? "Bistrovagn" : ""}
                              {carriage.carriageType == 4 ? "Manövervagn" : ""}
                            </h4>
                          </div>
                          <div className="mb-5 bg-dark rounded">
                            <Container fluid>
                              <Row>
                                {carriage.seats.map((seat, x) => {
                                  return (
                                    <Col key={x}>
                                      <div
                                        id={seat.seatId}
                                        key={x}
                                        onClick={
                                          seat.seat_booked_bool
                                            ? () => {}
                                            : (event) =>
                                                handleSelectSeats2(
                                                  seat,
                                                  event.currentTarget,
                                                  carriage.carriageType
                                                )
                                        }
                                      >
                                        {seat.seatNumber}
                                      </div>
                                    </Col>
                                  );
                                })}
                              </Row>
                            </Container>
                          </div>
                        </Col>
                      </Carousel.Item>
                    );
                  })}
                </div>
              </Row>
            </Container>
          </>
        )
      )}
    </>
  );
};

export default Train;
