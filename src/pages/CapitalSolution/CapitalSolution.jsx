import React, { useEffect, useRef, useState } from "react";
import Banner from "../../assets/CapitalSolutionsBanner.png";

import Icon01 from "../../assets/CapitalSolutions/icon01.png";
import Icon02 from "../../assets/CapitalSolutions/icon02.png";
import Icon03 from "../../assets/CapitalSolutions/icon03.png";
import Icon04 from "../../assets/CapitalSolutions/icon04.png";

import Slider from "react-slick";

import moment from "moment";
import "moment/dist/locale/es";
import "moment/dist/locale/pt-br";

import arrowLeft from "../../assets/slider/arrowLeft.svg";
import arrowRight from "../../assets/slider/arrowRight.svg";
import CardCase from "../../components/CardCase/cardCase";
import Reviews from "../../components/Reviews/Review";
import Specialists from "../../components/Specialists/Specialist";
import TheNews from "../../components/news/theNews";

import "./CapitalSolution.scss";

import { useSelector } from "react-redux";
import {
  api_capital_solution,
  api_contact,
  api_partners,
  api_testmony,
  api_transactions,
  api_news,
} from "../../api";

function CapitalSolution() {
  const [capitalSolution, setCapitalSolution] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [partners, setPartners] = useState([]);
  const [testimony, setTestimony] = useState([]);

  const [contacts, setContacts] = useState({});

  const [formName, setFormName] = useState(undefined);
  const [formEmail, setFormEmail] = useState(undefined);
  const [formPhone, setFormPhone] = useState(undefined);
  const [formCpfCnpj, setFormCpfCnpj] = useState(undefined);
  const [formMessage, setFormMessage] = useState(undefined);

  const [statusMessage, setStatusMessage] = useState("");

  const [news, setNews] = useState([]);
  const [newsAll, setNewsAll] = useState([]);
  const [highlight, setHighlight] = useState({});

  const locale = useSelector((state) => state.locales.locale);

  useEffect(() => {
    api_capital_solution
      .page({ locale })
      .then((response) => {
        setCapitalSolution(response.data.data.attributes);
      })
      .catch(() => {
        setCapitalSolution({});
      });

    api_transactions.get({ locale }).then((res) => {
      setTransactions(res.data.data);
    });

    api_partners
      .get({ locale })
      .then((res) => {
        setPartners(res.data.data);
      })
      .catch(() => {
        setPartners([]);
      });

    api_contact.page({ locale }).then((res) => {
      setContacts(res.data.data.attributes);
    });

    api_testmony
      .get({ locale })
      .then((res) => {
        setTestimony(res.data.data);
      })
      .catch(() => {
        setTestimony([]);
      });

    api_news
      .page({ locale })
      .then((res) => {
        setPage(res.data.data.attributes);
      })
      .catch(() => {
        alert.localeNotFound(locale);
      });

    api_news.highlights({ locale }).then((res) => {
      if (res.data.data.length > 0) {
        setHighlight(res.data.data && res.data.data[0] && res.data.data[0]);
      }
    });

    api_news.get({ locale, count: 4 }).then((res) => {
      if (res.data.data.length > 0) {
        setNews(res.data.data);
      }
    });

    api_news.get({ locale, count: 10 }).then((res) => {
      if (res.data.data.length > 0) {
        setNewsAll(res.data.data);
      }
    });
  }, [locale]);

  const handlerSubmit = (e) => {
    e.preventDefault();

    if (!formName || formName === "") {
      setStatusMessage("O campo nome é obrigatório");
      return;
    }

    if (!formEmail || formEmail === "") {
      setStatusMessage("O campo e-mail é obrigatório");
      return;
    }

    if (!formMessage || formMessage === "") {
      setStatusMessage("O campo mensagem é obrigatório");
      return;
    }

    const data = {
      name: formName,
      email: formEmail,
      phone: formPhone || "",
      cpf_cnpj: formCpfCnpj || "",
      message: formMessage,
    };

    api_contact
      .send({ data })
      .then(() => {
        setStatusMessage("Mensagem enviada com sucesso");
        setFormName(undefined);
        setFormEmail(undefined);
        setFormPhone(undefined);
        setFormCpfCnpj(undefined);
        setFormMessage(undefined);
      })
      .catch(() => {
        setStatusMessage("Ocorreu um erro ao enviar a mensagem");
      });
  };

  const slider = useRef(null);
  const slider2 = useRef(null);
  const slider3 = useRef(null);
  const slider3Mobile = useRef(null);
  const sliderNews = useRef(null);

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

  const firstSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: testimony && testimony.length > 3 ? 3 : testimony.length,
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
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  const secondSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow:
      transactions && transactions.length > 5 ? 5 : transactions.length,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1354,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true,
          centerPadding: "100px",
        },
      },

      {
        breakpoint: 379,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true,
          centerPadding: "10px",
        },
      },
    ],
  };

  const thirdSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: partners && partners.length > 4 ? 4 : partners.length,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1360,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 850,
        settings: {
          className: "center",
          centerMode: true,
          infinite: false,
          centerPadding: "60px",
          slidesToShow: 1,
          speed: 500,
          rows: 3,
          slidesPerRow: 1,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 675,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true,
          centerPadding: "130px",
        },
      },
      {
        breakpoint: 427,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 376,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true,
          centerPadding: "10px",
        },
      },
    ],
  };

  const thirdSliderMobile = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    variableWidth: true,
  };

  const newsSlick = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="capitalSolutionContainer">
      <div className="bannerContainer">
        <img src={Banner} alt="" />
        <div className="theContainer">
          <p>{capitalSolution && capitalSolution.title}</p>
          <h3>{capitalSolution && capitalSolution.description}</h3>
        </div>
      </div>

      <div className="nossosDiferenciais">
        <div className="theContainer">
          <div className="top">
            <h4>
              {(capitalSolution && capitalSolution.differential) ||
                `nossos diferenciais`}
            </h4>
          </div>
          <div className="bottom">
            <div className="left">
              <ul>
                {capitalSolution &&
                  capitalSolution.differentials &&
                  capitalSolution.differentials.differential_1 && (
                    <li>
                      <img src={Icon01} alt="" />
                      {capitalSolution &&
                        capitalSolution.differentials &&
                        capitalSolution.differentials.differential_1}
                    </li>
                  )}

                {capitalSolution &&
                  capitalSolution.differentials &&
                  capitalSolution.differentials.differential_3 && (
                    <li>
                      <img src={Icon02} alt="" />
                      {capitalSolution &&
                        capitalSolution.differentials &&
                        capitalSolution.differentials.differential_3}
                    </li>
                  )}
              </ul>
            </div>
            <div className="right">
              <ul>
                {capitalSolution &&
                  capitalSolution.differentials &&
                  capitalSolution.differentials.differential_2 && (
                    <li>
                      <img src={Icon03} alt="" />
                      {capitalSolution &&
                        capitalSolution.differentials &&
                        capitalSolution.differentials.differential_2}
                    </li>
                  )}

                {capitalSolution &&
                  capitalSolution.differentials &&
                  capitalSolution.differentials.differential_2 && (
                    <li>
                      <img src={Icon04} alt="" />
                      {capitalSolution &&
                        capitalSolution.differentials &&
                        capitalSolution.differentials.differential_4}
                    </li>
                  )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="reviewsContainer">
        <div className="theContainer">
          <div className="top">
            <p>depoimentos</p>
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

      <div className="transactionsContainer">
        <div className="theContainer">
          <div className="top">
            <div className="left">
              <h3>
                {(capitalSolution && capitalSolution.transaction) ||
                  `nossas transações:`}
              </h3>
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
                transactions.map((transaction) => (
                  <CardCase
                    key={transaction.id}
                    image={transaction.attributes.image.data.attributes.url}
                  />
                ))}
            </Slider>
          </div>
        </div>
      </div>

      {/* <div className="specialistContainer">
        <div className="theContainer">
          <div className="top">
            <div className="left">
              <h3>
                {(capitalSolution && capitalSolution.partner) ||
                  `fale com nossos sócios especialistas`}
              </h3>
            </div>
            <div className="slicks">
              <button onClick={() => slider3.current.slickPrev()}>
                <img src={arrowLeft} alt="" />
              </button>
              <button onClick={() => slider3.current.slickNext()}>
                <img src={arrowRight} alt="" />
              </button>
            </div>
          </div>
          <div className="bottom">
            <Slider ref={slider3} {...thirdSlider}>
              {partners &&
                partners.map((partner) => (
                  <>
                    <Specialists partner={partner.attributes} />
                  </>
                ))}
            </Slider>
          </div>

          <div className="bottomMobile">
            <Slider ref={slider3Mobile} {...thirdSliderMobile}>
              {partners &&
                partners.map((partner) => (
                  <>
                    <Specialists partner={partner.attributes} />
                  </>
                ))}
            </Slider>
          </div>
        </div>
      </div> */}

      {/* <div className="newsContainer">
        <div className="theContainer">
          <div className="top">
            <div className="left">
              <h3>últimas notícias</h3>
            </div>
            <div className="slicks">
              <button onClick={() => sliderNews.current.slickPrev()}>
                <img src={arrowLeft} alt="" />
              </button>
              <button onClick={() => sliderNews.current.slickNext()}>
                <img src={arrowRight} alt="" />
              </button>
            </div>
          </div>
          <div className="bottom">
            <Slider ref={sliderNews} {...newsSlick}>
              {newsAll &&
                newsAll.map((item, index) => (
                  <TheNews
                    key={index}
                    data={item}
                    postDate={moment(item.attributes.createdAt).format(
                      "DD MMMM, YYYY"
                    )}
                  />
                ))}
            </Slider>
          </div>
        </div>
      </div> */}

      <div className="containerForm">
        <div className="theContainer">
          <div className="leftContainer">
            <h3>{contacts && contacts.title}</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: contacts && contacts.description,
              }}
            ></p>
          </div>
          <div className="form">
            <form action="">
              <div className="form1">
                <div className="form11">
                  <label htmlFor="">Nome*</label>
                  <input
                    placeholder="Digite aqui"
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </div>
                <div className="form11">
                  <label htmlFor="">E-mail*</label>
                  <input
                    placeholder="Digite aqui"
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="form1">
                <div className="form11">
                  <label htmlFor="">Telefone</label>
                  <input
                    placeholder="Digite aqui"
                    type="number"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                  />
                </div>
                <div className="form11">
                  <label htmlFor="">CPF / CNPJ</label>
                  <input
                    placeholder="Digite aqui"
                    type="number"
                    value={formCpfCnpj}
                    onChange={(e) => setFormCpfCnpj(e.target.value)}
                  />
                </div>
              </div>
              <div className="messageForm">
                <label className="messageLabel" htmlFor="">
                  Mensagem*
                </label>
                <textarea
                  className="messageInput"
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                />
              </div>
              {statusMessage && (
                <div className="statusMessage">{statusMessage}</div>
              )}
              <div className="buttonForm">
                <button onClick={(e) => handlerSubmit(e)}>
                  {contacts && contacts.button && contacts.button.label}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CapitalSolution;
