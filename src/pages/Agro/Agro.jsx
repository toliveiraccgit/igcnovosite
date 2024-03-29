import React, { useRef } from "react";
import Slider from "react-slick";
import arrowLeft from "../../assets/slider/arrowLeft.svg";
import arrowRight from "../../assets/slider/arrowRight.svg";
import closeButton from "../../assets/closeButton.png";
import CardCase from "../../components/CardCase/cardCase";
import Modal from "react-modal";
import "./Agro.scss";

// TODO: remover esse import e seu arquivo

// import NewsCard from "../../components/NewsCard/NewsCard";
import Reviews from "../../components/Reviews/Review";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { api_transacoes, api_transactions } from "../../api";
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

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const isMobile = window.innerWidth <= 768;

  const openModal = (e, item) => {
    e.preventDefault();
    setSelectedTransaction(item.id);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "807px",
      height: "382px",
      width: "100%",
    },
    closeButtonModal: {
      top: "20px",
      right: "20px",
    },
  };

  const customMobileStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "75%",
      height: "auto",
      width: "100%",
    },
    closeButtonModal: {
      top: "20px",
      right: "20px",
    },
  };

  useEffect(() => {
    api_transacoes
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
          banner: getScreen.banner || "",
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
          slidesToShow: 5,
          slidesToScroll: 5,
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
          slidesToScroll: 1,
          initialSlide: 0,
          dots: true,
          variableWidth: true,
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
            <img
              src={`${page && page.banner?.data?.attributes?.url}`}
              alt="Banner"
            />
            <div className="bannerText">
              <div className="theContainer">
                <h3>{page && page.title}</h3>
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
                    transactions
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
                      .map((item, index) => (
                        <a
                          style={{ cursor: "pointer", marginBottom: 20 }}
                          onClick={(e) => openModal(e, item)}
                        >
                          <CardCase
                            key={index}
                            image={`${item.attributes.image.data.attributes.url}`}
                          />
                        </a>
                      ))}
                </Slider>
                {transactions && transactions.length === 0 && (
                  <div className="noData">Nenhum case encontrado</div>
                )}
              </div>

              {!isMobile &&
                transactions &&
                transactions.map((item) => (
                  <Modal
                    isOpen={selectedTransaction === item.id}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    key={item.id}
                  >
                    <>
                      <div className="ContainerModal">
                        <div className="leftContainerModal">
                          <div className="cardSocial-container">
                            <img
                              className="CardSocialImg"
                              src={item.attributes.image.data.attributes.url}
                              alt="Logo"
                            />
                          </div>
                        </div>
                        <div className="rightContainerModal">
                          <h2 className="titleModal">{item.attributes.name}</h2>
                          <button
                            style={customStyles.closeButtonModal}
                            className="closeButtonModal"
                            onClick={closeModal}
                          >
                            <img src={closeButton} alt="" />
                          </button>
                          <div className="DescriptionContainerModal">
                            <p className="Description">
                              {item.attributes.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  </Modal>
                ))}

              <div className="bottomMobile">
                {isMobile &&
                  transactions &&
                  transactions
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
                    .map((item) => (
                      <>
                        <div onClick={(e) => openModal(e, item)} key={item.id}>
                          <CardCase
                            image={item.attributes.image.data.attributes.url}
                            key={item.index}
                          />
                        </div>
                        <Modal
                          isOpen={selectedTransaction === item.id}
                          onRequestClose={closeModal}
                          style={customMobileStyles}
                          contentLabel="Example Modal"
                          key={item.id}
                        >
                          <div className="ContainerModalMobile">
                            <div className="rightContainerModal">
                              <button
                                style={customStyles.closeButtonModal}
                                className="closeButtonModal"
                                onClick={closeModal}
                              >
                                <img src={closeButton} alt="" />
                              </button>
                              <div className="DescriptionContainerModal">
                                <p className="Description">
                                  <div className="Img">
                                    <div className="cardSocial-container">
                                      <img
                                        className="CardSocialImg"
                                        src={
                                          item.attributes.image.data.attributes
                                            .url
                                        }
                                        alt="Logo"
                                      />
                                    </div>
                                  </div>
                                  <h2 className="titleModal">
                                    {item.attributes.name}
                                  </h2>
                                  {item.attributes.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Modal>
                      </>
                    ))}
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
                      .map((test) => (
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
        </>
      )) || (
        <div className="noData">
          <div class="loading-icon" />
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
}

export default Agro;
