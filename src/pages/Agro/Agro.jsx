import React, { useRef } from "react";
import Slider from "react-slick";
import bannerAgro from "../../assets/bannerAgro.jpg";
import arrowLeft from "../../assets/slider/arrowLeft.svg";
import arrowRight from "../../assets/slider/arrowRight.svg";
import CardCase from "../../components/CardCase/cardCase";
import "./Agro.scss";

// TODO: remover esse import e seu arquivo

import NewsCard from "../../components/NewsCard/NewsCard";
import Reviews from "../../components/Reviews/Review";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { api_agro, api_transactions } from "../../api";
import alert from "../../utils/systemAlert";

function Agro() {
  const { id } = useParams();
  const locale = useSelector((state) => state.locales.locale);

  const [page, setPage] = useState({});
  const [testimony, setTestimony] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [news, setNews] = useState([]);
  const [pageExists, setPageExists] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    api_agro
      .page({ locale })
      .then((res) => {
        const getScreen =
          res &&
          res.data &&
          res.data.data &&
          res.data.data.attributes &&
          res.data.data.attributes.screens &&
          res.data.data.attributes.screens.find((e) => e.slug === id);

        if (!getScreen) {
          setPageExists(false);
          return;
        }

        if (getScreen.active === false) {
          setPageExists(false);
          return;
        }

        delete res.data.data.attributes.screens;

        const apiData =
          res &&
          res.data &&
          res.data.data &&
          res.data.data &&
          res.data.data.attributes;

        setPage({
          title: getScreen.title || "",
          description: getScreen.description || "",
          cases: apiData.cases || "",
          search: apiData.search || "",
          news: apiData.news || "",
          customers: apiData.customers || "",
          more: apiData.more || "",
        });

        setTransactions(
          (getScreen &&
            getScreen.transactions &&
            getScreen.transactions.data) ||
            []
        );
        setTestimony(
          (getScreen && getScreen.testimonies && getScreen.testimonies.data) ||
            []
        );
        setNews((getScreen && getScreen.news && getScreen.news.data) || []);

        setPageExists(true);
      })
      .catch((err) => {
        alert.localeNotFound(locale);
      });
  }, [locale]);

  const slider = useRef(null);
  const slider2 = useRef(null);

  let timeOut = null;
  function searchOnChange(value) {
    setSearch(value);

    clearTimeout(timeOut);

    timeOut = setTimeout(() => {
      api_transactions.get({ locale, search: value }).then((res) => {
        setTransactions(res && res.data && res.data.data);
      });
    }, 2000);
  }

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

  const secondSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: transactions.length >= 5 ? 5 : transactions.length,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 345,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          centerMode: true,
          centerPadding: "10px",
        },
      },
    ],
  };

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
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };

  const fourSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    // slidesToShow: news && news.length >= 3 ? 3 : news.length,
    slidesToShow: 2,
    centerPadding: "10px",
    centerMode: true,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
          centerMode: true,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 868,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          centerMode: true,
        },
      },
      {
        breakpoint: 685,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: true,
        },
      },
    ],
  };

  return (
    <div className="AgroContainer">
      {(pageExists && (
        <>
          <div className="bannerContainer">
            <img src={bannerAgro} alt="" />
            <div className="bannerText">
              <div className="theContainer">
                <h2>{page && page.title}</h2>
                <p>{page && page.description}</p>
              </div>
            </div>
          </div>

          <div className="transactionsContainer">
            <div className="theContainer">
              <div className="top">
                <div className="left">
                  <h3>{page && page.cases}</h3>
                  <div className="filters">
                    <input
                      placeholder={page && page.search}
                      type="text"
                      value={search}
                      onChange={(e) => searchOnChange(e.target.value)}
                    />
                  </div>
                </div>
                <div className="slicks">
                  <button onClick={() => slider2.current.slickPrev()}>
                    <img src={arrowLeft} alt="" />
                  </button>
                  <button onClick={() => slider2.current.slickNext()}>
                    <img src={arrowRight} alt="" />
                  </button>
                </div>
              </div>
              <div className="bottom">
                <Slider ref={slider2} {...secondSlider}>
                  {transactions &&
                    transactions.length > 0 &&
                    transactions.map((item, index) => (
                      <CardCase
                        key={index}
                        image={`${item.attributes.image.data.attributes.url}`}
                      />
                    ))}
                </Slider>
                {transactions && transactions.length === 0 && (
                  <div className="noData">Nenhum case encontrado</div>
                )}
              </div>
            </div>
          </div>

          <div className="reviewsContainer">
            <div className="theContainer">
              <div className="top">
                <p>{page && page.customers}</p>
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
                  {testimony &&
                    testimony.map((test) => (
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

          {/* <div className="newsContainer">
            <div className="theContainer">
              <div className="top">
                <h4>{page && page.news}</h4>
                <a href="/noticias">{page && page.more}</a>
              </div>
              <div className="bottom">
                <Slider {...fourSlider}>
                  {news &&
                    news.map((neww) => (
                      <NewsCard
                        key={neww.id}
                        data={neww.attributes}
                        id={neww.id}
                      />
                    ))}
                </Slider>
              </div>
            </div>
          </div> */}
        </>
      )) || <div className="noData">Página não encontrada</div>}
    </div>
  );
}

export default Agro;
