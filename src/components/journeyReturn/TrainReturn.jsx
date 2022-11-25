import React, {useEffect, useState} from "react";
import {Row, Col, Container} from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const TrainReturn = ({
  /* Single Ticket props */
  ticket,
  ticketReturn,
}) => {
  const rounds = useSelector((state) => state.rounds);

  return (
    <>
      {rounds.rounds === 2 && (
        <form>
          <>
            <div style={{color: "white", marginTop: "250px"}}>
              {console.log("Steg 7: Välj säten för ReturBiljett")}
              {console.log("Rounds:", rounds.rounds)}

              <Row className="text-center">
                <Link
                  to={"/bookingReturn"}
                  state={{
                    ticketReturn: ticketReturn,
                    ticket: ticket,
                  }}
                >
                  <Button className="w-50 mb-4" variant="warning">
                    Bekräfta
                  </Button>
                </Link>
              </Row>
            </div>
            <Container fluid className=""></Container>
          </>
        </form>
      )}
    </>
  );
};

export default TrainReturn;
