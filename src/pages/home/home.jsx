import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import homeBanner from "../../assets/homeBanner.png";
import rightArrow from "../../assets/homeBanners/arrowRight.png";
import arrowLeft from "../../assets/slider/arrowLeft.svg";
import arrowRight from "../../assets/slider/arrowRight.svg";
import BannerHome from "../../components/BannerHome/BannerHome";
import CardCase from "../../components/CardCase/cardCase";
import Reviews from "../../components/Reviews/Review";
import "./home.scss";

import { useSelector } from "react-redux";
import APIHome from "../../api/home";
import APIServices from "../../api/services";
import config from "../../config/env";

function home() {
  const slider = useRef(null);
  const slider4 = useRef(null);

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const [banners, setBanners] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [testimony, setTestimony] = useState([]);
  const [services, setServices] = useState([]);

  const firstSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: testimony.length >= 3 ? 3 : testimony.length,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const handlePrevClick = () => {
    slider4.current.slickPrev();
  };

  const handleNextClick = () => {
    slider4.current.slickNext();
  };

  const fourSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: transactions.length >= 5 ? 5 : transactions.length,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1315,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1074,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: true,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 690,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 390,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: true,
          centerPadding: "10px",
        },
      },
    ],
  };

  const [services_api_title, set_services_api_title] = useState("serviços");
  const [transactions_api_title, set_transactions_api_title] = useState({
    transaction: "últimas transações",
    more: "ver todas",
  });
  const [clients_api_title, set_clients_api_title] =
    useState("nossos clientes");

  const locale = useSelector((state) => state.locales.locale);

  useEffect(() => {
    APIHome.get({ locale }).then((res) => {
      setBanners(res.data.data.attributes.banner);

      const limitData =
        res &&
        res.data &&
        res.data.data &&
        res.data.data.attributes &&
        res.data.data.attributes.transaction &&
        res.data.data.attributes.transaction.transactions &&
        res.data.data.attributes.transaction.transactions.data.slice(0, 6);

      setTransactions(limitData);
      setTestimony(res.data.data.attributes.testmonys.data);

      // set services, transactions and clients translations
      set_services_api_title(res.data.data.attributes.services);
      set_transactions_api_title(res.data.data.attributes.transaction);
      set_clients_api_title(res.data.data.attributes.clients);
    });

    APIServices.get({ locale }).then((res) => {
      const limitData = res.data.data.slice(0, 3);
      setServices(limitData);
    });
  }, [locale]);

  return (
    <div className="homeContainer">
      <Slider {...settings}>
        {(banners &&
          banners.length > 0 &&
          banners.map((banner) => (
            <BannerHome
              key={banner.id}
              image={`${config.api.BASE}${banner.image.data.attributes.url}`}
              title={banner.title}
              label={banner.metrics && banner.metrics.label}
              link={banner.metrics && banner.metrics.link}
            />
          ))) || <BannerHome image={homeBanner} />}
      </Slider>
      <div className="lastTransactions">
        <div className="theContainer">
          <div className="top">
            <h4>
              {transactions_api_title && transactions_api_title.transaction}
            </h4>
            <div className="slicks">
              <button onClick={handlePrevClick}>
                <img src={arrowLeft} alt="" />
              </button>
              <button onClick={handleNextClick}>
                <img src={arrowRight} alt="" />
              </button>
            </div>
          </div>
          <div className="bottom">
            <Slider ref={slider4} {...fourSlider}>
              {transactions &&
                transactions.map((transaction) => (
                  <CardCase
                    image={transaction.attributes.image.data.attributes.url}
                    key={transaction.index}
                  />
                ))}
            </Slider>
          </div>
        </div>
      </div>

      <div className="reviewsContainer">
        <div className="theContainer">
          <div className="top">
            <p>{clients_api_title}</p>
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
            <Slider ref={slider} {...firstSlider}>
              {testimony.map((test) => (
                <Reviews
                  key={test.id}
                  name={test.attributes.name}
                  company={test.attributes.company}
                  testimony={test.attributes.testimony}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>

      <div className="servicesContainer">
        <div className="theContainer">
          <div className="top">
            <h4>{services_api_title}</h4>
          </div>
          <div className="bottom">
            {services.map((service, index) => (
              <div
                key={index}
                className={
                  index === 0
                    ? "lineOne"
                    : index === 1
                    ? "lineSecond"
                    : "lineThrd"
                }
              >
                {index !== 1 && (
                  <img
                    className="banner"
                    src={`${config.api.BASE}${service.attributes.image.data.attributes.url}`}
                    alt=""
                  />
                )}
                <div className={index === 1 ? "left" : "right"}>
                  <h4 className="title">{service.attributes.name}</h4>
                  <p className="paragraph">{service.attributes.description}</p>
                  <Link to={service.attributes.button.link}>
                    {service.attributes.button.label}{" "}
                    <img src={rightArrow} alt="" />{" "}
                  </Link>
                </div>
                {index === 1 && (
                  <img
                    className="banner"
                    src={`${config.api.BASE}${service.attributes.image.data.attributes.url}`}
                    alt=""
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default home;
