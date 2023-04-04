import React from "react";
import "./PartnerCardWhite.scss";

function PartnerCardWhite({ principle }) {
  return (
    <div className="PartnerCardWhiteContainer">
      <div className="Texts">
        <h4 className="title">{principle.title}</h4>
        <p className="subtitle">{principle.label}</p>

        <p
          className="text"
          dangerouslySetInnerHTML={{ __html: principle.description }}
        ></p>
      </div>
    </div>
  );
}

export default PartnerCardWhite;
