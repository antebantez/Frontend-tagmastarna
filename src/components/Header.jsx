import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation, Link } from "react-router-dom";

const Header = () => {

  // Logic to determine if the header should be shown
  let route = useLocation().pathname;
  let doNotShowOnRoutes = [
    // '/SearchJourney'
  ];
  let isHidden = doNotShowOnRoutes.includes(route);

  return isHidden ? null : (
    <Row className="">
      <Col className="">
        <Link to="/">
          <img height="70" width="180" src="Assets/logo.png" />
        </Link>
      </Col>
      <Col className=" bg-transparent "></Col>
    </Row>
  );
};

export default Header;
