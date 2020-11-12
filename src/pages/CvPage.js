import React from "react";
import { CardGroup, Card } from "react-bootstrap";
import cv from "../images/cv.png";

const CvPage = () => {
  return (
    <div>
      <CardGroup className="d-flex align-content-center flex-column align-items-center">
        <Card border="light" style={{ width: "25rem" }}>
          <Card.Img variant="top" src={cv} />
          <Card.Body className="card-title">
            <Card.Title>Jeesun Lee</Card.Title>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
};

export default CvPage;
