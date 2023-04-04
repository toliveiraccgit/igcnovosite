import React from "react";
import "./Partner.scss";

// TODO: REMOVER ESTA IMAGEM

import EmailIcon from "../../assets/QuemSomos/Email.png";
import Linkedin from "../../assets/QuemSomos/Linkedin.png";

import config from "../../config/env";

function Partner({ partner }) {
  return (
    <div className="PartnerContainerDesktop">
      <div className="containerImg">
        <img
          className="PartnerImg"
          src={`${config.api.BASE}${partner?.attributes?.photo?.data?.attributes?.url}`}
          alt=""
        />
      </div>

      <div className="insidePartner">
        <div className="top">
          <p className="namePartner">{partner.attributes.name}</p>
        </div>
        <div className="bottomm">
          <a href={"https://www.linkedin.com/in" + partner.attributes.linkedin}>
            <img className="LinkedinIcon" src={Linkedin} alt="" />
          </a>
          <a href={`mailto:${partner.attributes.email}`}>
            <img className="EmailIcon" src={EmailIcon} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Partner;
