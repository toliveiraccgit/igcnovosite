import React from "react";
import "./HowWorks.scss";

function HowWorks({ number, title }) {
  return (
    <div className="howWorksContainer">
      <p className="number">{number}</p>
      <p className="title">{title}</p>
    </div>
  );
}

export default HowWorks;
