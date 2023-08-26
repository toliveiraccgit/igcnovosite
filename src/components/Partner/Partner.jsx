import React from "react";
import "./Partner.scss";
import EmailIcon from "../../assets/QuemSomos/Email-White.png";
import Linkedin from "../../assets/QuemSomos/icon-linkedin-white.png";

function Partner({ partner }) {
  return (
    <div className="PartnerContainerDesktop">
      <div className="containerImg">
        <img
          className="PartnerImg"
          src={partner?.attributes?.photo?.data?.attributes?.url}
          alt=""
        />
        <div className="social">
          <a href={"https://www.linkedin.com/in" + partner.attributes.linkedin}>
            <img className="LinkedinIcon" src={Linkedin} alt="" />
          </a>
          <a href={`mailto:${partner.attributes.email}`}>
            <img className="EmailIcon" src={EmailIcon} alt="" />
          </a>
        </div>
      </div>

      <div className="text-area">
        <p>{`${partner?.attributes?.name}`}</p>
        <span>{`${partner?.attributes?.grupo?.data?.attributes?.name}`}</span>
      </div>
    </div>
  );
}

export default Partner;
