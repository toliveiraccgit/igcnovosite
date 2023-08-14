import "./Specialist.scss";

import emailicon from "../../assets/emailicon.svg";
import linkedin from "../../assets/linkedinicon.svg";

import React from "react";

function Specialists({ partner }) {
  return (
    <div className="specialistCardContainer">
      <img src={`${partner && partner?.photo?.data?.attributes?.url}`} alt="" />
      <div className="rightContainer">
        <h4>{partner && partner.name}</h4>
        <p>
          {/* <img src={emailicon} alt="" /> */}
          {partner && partner.email}
        </p>
        <a href={partner && partner.linkedin}>
          <span>
            {/* <img src={linkedin} alt="" /> */}
            Linkedin
          </span>
        </a>
      </div>
    </div>
  );
}

export default Specialists;
