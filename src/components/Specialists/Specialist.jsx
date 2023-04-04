import "./Specialist.scss";

import emailicon from "../../assets/emailicon.svg";
import linkedin from "../../assets/linkedinicon.svg";

import React from "react";
import config from "../../config/env";

function Specialists({ partner }) {
  return (
    <div className="specialistCardContainer">
      <img
        src={
          config.api.BASE +
          `${partner && partner?.photo?.data?.attributes?.url}`
        }
        alt=""
      />
      <div className="rightContainer">
        <h4>{partner && partner.name}</h4>
        <p>
          <img src={emailicon} alt="" />
          {partner && partner.email}
        </p>
        <p>
          <img src={linkedin} alt="" />
          {partner && partner.linkedin}
        </p>
      </div>
    </div>
  );
}

export default Specialists;
