import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./OurClients.scss";
import { useSelector } from "react-redux";
import { api_testmony } from "../../../../api";
import arrowLeft from "../../../../assets/slider/arrowLeft.svg";
import arrowRight from "../../../../assets/slider/arrowRight.svg";
import Reviews from "../../../../components/Reviews/Review";

function OurClients({ clientsTitle }) {
  const slider = useRef(null);

  const locale = useSelector((state) => state.locales.locale);
  const [testimony, setTestimony] = useState([]);

  const firstSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: testimony && testimony.length >= 3 ? 3 : testimony.length,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          variableWidth: true,
        },
      },
    ],
  };

  const isMobile = window.innerWidth <= 768;

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  useEffect(() => {
    api_testmony
      .getByType({ locale })
      .then((res) => {
        setTestimony(res.data.data);
      })
      .catch(() => {
        setTestimony([]);
      });
  }, []);

  return (
    <div className="reviewsContainer">
      <div className="theContainer">
        <div className="top">
          <p>{clientsTitle}</p>
          <div className="slicks">
            <button onClick={() => slider.current.slickPrev()}>
              <img src={arrowLeft} alt="" />
            </button>
            <button onClick={() => slider.current.slickNext()}>
              <img src={arrowRight} alt="" />
            </button>
          </div>
        </div>
        <div className="rev">
          <Slider ref={slider} {...firstSlider} initialSlide={-1}>
            {!isMobile &&
              testimony &&
              testimony
                .sort((a, b) => {
                  const priorityOrder = {
                    "Muito alta": 1,
                    Alta: 2,
                    Normal: 3,
                    Baixa: 4,
                  };

                  const priorityA = priorityOrder[a.attributes.priority];
                  const priorityB = priorityOrder[b.attributes.priority];

                  return priorityA - priorityB;
                })
                .map((test, index) => (
                  <Reviews
                    key={test.id}
                    name={test?.attributes?.name}
                    company={test?.attributes?.company}
                    testimony={test?.attributes?.testimony}
                  />
                ))}
            {isMobile &&
              testimony &&
              testimony
                .sort((a, b) => {
                  const priorityOrder = {
                    "Muito alta": 1,
                    Alta: 2,
                    Normal: 3,
                    Baixa: 4,
                  };

                  const priorityA = priorityOrder[a.attributes.priority];
                  const priorityB = priorityOrder[b.attributes.priority];

                  return priorityA - priorityB;
                })
                .map((test) => (
                  <Reviews
                    key={test.id}
                    name={test?.attributes?.name}
                    company={test?.attributes?.company}
                    testimony={test?.attributes?.testimony}
                  />
                ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default OurClients;
