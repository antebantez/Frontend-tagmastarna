import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";

const SearchJourney = () => {
  return (
    <Row>
      <div id="hpDiv" className="text-center">
        <Col className="">
          <Link to="/SearchJourney">
            <Button id="testKnapp" className="border-0 mt-5">
              <h2 id="Search-text">Sök resa</h2>
            </Button>
          </Link>
        </Col>
      </div>
    </Row>
  );
};

export default SearchJourney;
