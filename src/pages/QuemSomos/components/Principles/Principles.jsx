import { useEffect, useRef, useState } from "react";
import PartnerCardWhite from "../../../../components/PartnerCardWhite/PartnerCardWhite";
import { useSelector } from "react-redux";
import { api_principles } from "../../../../api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Principles.scss";

function Principles({ principlesTitle }) {
  const locale = useSelector((state) => state.locales.locale);

  const [principles, setPrinciples] = useState([]);

  const sliderPrinciplesContainers = useRef(null);

  const sliderPrinciplesContainer = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    variableWidth: true,
  };

  useEffect(() => {
    api_principles
      .get({ locale })
      .then((response) => {
        setPrinciples(response.data.data);
      })
      .catch(() => {
        setPrinciples([]);
      });
  }, [locale]);

  return (
    <div className="PrinciplesContainer">
      <div className="theContainer">
        <div className="top">
          <h4>{principlesTitle}</h4>
        </div>

        <div className="bottom">
          {principles &&
            principles.map((principle) => (
              <>
                <PartnerCardWhite
                  key={principle.id}
                  principle={principle.attributes}
                />
              </>
            ))}
        </div>

        <div className="bottomMobile">
          <Slider
            ref={sliderPrinciplesContainers}
            {...sliderPrinciplesContainer}>
            {principles &&
              principles.map((principle) => (
                <PartnerCardWhite
                  key={principle.id}
                  principle={principle.attributes}
                />
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Principles;
