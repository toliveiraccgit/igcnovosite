import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { api_group, api_partners, api_unique } from "../../../../api";
import Partner from "../../../../components/Partner/Partner";

import "./Partners.scss";
import arrowLeft from "../../../../assets/slider/arrowLeft.svg";
import arrowRight from "../../../../assets/slider/arrowRight.svg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Partners() {
  const locale = useSelector((state) => state.locales.locale);

  const [partners, setPartners] = useState([]);
  const [countPartners, setCountPartners] = useState(0);
  const [groups, setGroups] = useState([]);
  const [content, setContent] = useState({});

  const sliderPartners = useRef(null);
  const sliderPartnersMobile = useRef(null);

  const handleFilterChange = (groupName) => {
    if (groupName == "Todos") {
      api_partners
        .getAll({ locale })
        .then((response) => {
          setPartners(response.data.data);
        })
        .catch(() => {
          setPartners([]);
        });
    } else {
      api_partners
        .getByGroupName({
          locale,
          groupName: encodeURIComponent(groupName),
        })
        .then((response) => {
          setPartners(response.data.data);
        })
        .catch(() => {
          setPartners([]);
        });
    }
  };

  const handlePrevClick = () => {
    sliderPartners.current.slickPrev();
  };

  const handleNextClick = () => {
    sliderPartners.current.slickNext();
  };

  const sliderPartnerMobile = {
    dots: true,
    className: "center",
    centerMode: true,
    infinite: false,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    variableWidth: true,
  };

  useEffect(() => {
    api_unique
      .getPartners({ locale })
      .then((response) => {
        setContent(response.data.data.attributes.partners);
      })
      .catch(() => {
        setStartPage({});
      });

    api_partners
      .getAll({ locale })
      .then((response) => {
        setPartners(response.data.data);
        setCountPartners(response.data.data.length);
      })
      .catch(() => {
        setPartners([]);
      });

    api_group
      .get({ locale })
      .then((response) => {
        setGroups(response.data.data);
      })
      .catch(() => {
        setGroups([]);
      });
  }, [locale]);

  return (
    <div className="partnersContainer">
      <div className="theContainer">
        <>
          <div className="top">
            <div className="left">
              <div className="textArea">
                <h4>
                  {content &&
                    String(content.title).replace(
                      "{partners_count}",
                      countPartners
                    )}
                </h4>
                <p>{content?.description}</p>
              </div>
              <div className="filters">
                <select
                  onChange={(e) => {
                    handleFilterChange(e.target.value);
                  }}>
                  <option value="Todos">Todos</option>
                  {groups &&
                    groups.map((group) => (
                      <option
                        key={group.attributes.name}
                        value={group.attributes.name}>
                        {group.attributes.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {partners && partners.length >= 5 ? (
              <div className="slicks">
                <button onClick={handlePrevClick}>
                  <img src={arrowLeft} alt="" />
                </button>
                <button onClick={handleNextClick}>
                  <img src={arrowRight} alt="" />
                </button>
              </div>
            ) : (
              <div className="slicks"></div>
            )}
          </div>

          <div className="partner-container">
            {partners &&
              partners.map((partner) => (
                <Partner key={partner.id} partner={partner} />
              ))}
          </div>
        </>

        <div className="slider-mobile">
          {partners && partners.length >= 5 ? (
            <Slider ref={sliderPartnersMobile} {...sliderPartnerMobile}>
              {partners &&
                partners.map((partner) => (
                  <Partner key={partner.id} partner={partner} />
                ))}
            </Slider>
          ) : (
            <div className="noSlider">
              {partners &&
                partners.map((partner) => (
                  <Partner key={partner.id} partner={partner} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Partners;
