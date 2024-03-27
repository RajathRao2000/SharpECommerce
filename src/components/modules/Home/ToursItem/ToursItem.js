import React from "react";
import { Button } from "react-bootstrap";
import "./ToursItem.css";

function ToursItem(props) {
  const { date, location, place } = props;
  return (
    <div className="tour-item">
      <div className="tour-date">{date}</div>
      <div className="tour-location">{location}</div>
      <div className="tour-place">{place}</div>
      <Button className="buy-btn" type="button" variant="primary">
        BUY TICKETS
      </Button>
    </div>
  );
}

export default ToursItem;