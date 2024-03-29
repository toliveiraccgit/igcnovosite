import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Slider from "react-slick";

import "moment/dist/locale/es";
import "moment/dist/locale/pt-br";

import arrowLeft from "../../assets/slider/arrowLeft.svg";
import arrowRight from "../../assets/slider/arrowRight.svg";
import rightArrow from "../../assets/homeBanners/arrowRight.png";
import CardCase from "../../components/CardCase/cardCase";
import Reviews from "../../components/Reviews/Review";

import "./CapitalSolution.scss";

import Modal from "react-modal";
import closeButton from "../../assets/closeButton.png";

import { useSelector } from "react-redux";
import {
  api_capital_solution,
  api_contact,
  api_testmony,
  api_transactions,
} from "../../api";

function CapitalSolution() {
  const [capitalSolution, setCapitalSolution] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [testimony, setTestimony] = useState([]);

  const [contacts, setContacts] = useState({});

  const [formName, setFormName] = useState(undefined);
  const [formEmail, setFormEmail] = useState(undefined);
  const [formPhone, setFormPhone] = useState(undefined);
  const [formCpfCnpj, setFormCpfCnpj] = useState(undefined);
  const [formMessage, setFormMessage] = useState(undefined);

  const [statusMessage, setStatusMessage] = useState("");

  const [disabledSubmitButton, setDisabledSubmitButton] = useState(false);

  const locale = useSelector((state) => state.locales.locale);

  useEffect(() => {
    window.scrollTo(0, 0);
    api_capital_solution
      .page({ locale })
      .then((response) => {
        setCapitalSolution(response.data.data.attributes);

        chargeTransactions();

        api_contact.page({ locale }).then((res) => {
          setContacts(res.data.data.attributes);
        });

        api_testmony
          .getByType({ locale, type: encodeURIComponent("Capital Solutions") })
          .then((res) => {
            setTestimony(res.data.data);
          })
          .catch(() => {
            setTestimony([]);
          });
      })
      .catch(() => {
        setCapitalSolution({});
      });
  }, [locale]);

  const handlerSubmit = (e) => {
    e.preventDefault();
    setDisabledSubmitButton(true);

    if (!formName || formName === "") {
      setStatusMessage(contacts && contacts.required_field);
      return;
    }

    if (!formEmail || formEmail === "") {
      setStatusMessage(contacts && contacts.required_field);
      return;
    }

    if (!formMessage || formMessage === "") {
      setStatusMessage(contacts && contacts.required_field);
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
        setStatusMessage(contacts && contacts.aprovado);
        setFormName("");
        setFormEmail("");
        setFormPhone("");
        setFormCpfCnpj("");
        setFormMessage("");
        setDisabledSubmitButton(false);
      })
      .catch(() => {
        setStatusMessage(contacts && contacts.erro);
        setDisabledSubmitButton(false);
      });
  };

  const chargeTransactions = () => {
    api_transactions
      .getByPriorityAndService({
        locale,
        service: encodeURIComponent("Capital Solutions"),
      })
      .then((res) => {
        setTransactions(res.data.data);
      });
  };

  const slider = useRef(null);
  const slider2 = useRef(null);
  const slider2Mobile = useRef(null);
  const highlightsMobile = useRef(null);

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

  const handlePrevClick = () => {
    slider2.current.slickPrev();
  };

  const handleNextClick = () => {
    slider2.current.slickNext();
  };

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
          slidesToShow:
            testimony && testimony.length > 3 ? 3 : testimony.length,
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
          initialSlide: 0,
          dots: true,
          variableWidth: true,
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
    slidesToScroll: 1,
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

  const highlightMobile = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    variableWidth: true,
  };

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const isMobile = window.innerWidth <= 768;

  const openModal = (e, transaction) => {
    e.preventDefault();
    setSelectedTransaction(transaction.id);
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

  return (
    <div className="capitalSolutionContainer">
      <div className="bannerContainer">
        <img
          src={
            capitalSolution &&
            capitalSolution.bunner &&
            capitalSolution.bunner?.data &&
            capitalSolution.bunner?.data?.attributes &&
            capitalSolution.bunner?.data?.attributes?.url
          }
          alt=""
        />
        <div className="theContainer">
          <h3>{capitalSolution && capitalSolution.title}</h3>
          <p>{capitalSolution && capitalSolution.description}</p>
        </div>
      </div>

      <div className="nossosDiferenciais">
        <div className="theContainer">
          <div className="titleContainer">
            {/* <h4>{capitalSolution && capitalSolution.differential}</h4> */}
            <h1 className="blue">
              {capitalSolution &&
                capitalSolution.differentials &&
                capitalSolution.differentials.highlight_1}
            </h1>
            <div className="bottom">
              <p>
                {capitalSolution &&
                  capitalSolution.differentials &&
                  capitalSolution.differentials.highlight_1_description}
              </p>
            </div>
          </div>

          <div className="highligthsContainer" style={{ width: "100%" }}>
            <div className="top">
              <h1 className="blue">
                {capitalSolution && capitalSolution.differential}
              </h1>
              <Link className="buttonContact" to="/fale-conosco">
                {capitalSolution && capitalSolution.button}
                <img src={rightArrow} alt="" />{" "}
              </Link>
            </div>
            <div className="bottom">
              {!isMobile && (
                <div className="cardGrid">
                  <div className="row">
                    <div className="card">
                      <span>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials.differential_1}
                      </span>
                      <h3>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials
                            .differential_1_description}
                      </h3>
                    </div>
                    <div className="card">
                      <span>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials.differential_3}
                      </span>
                      <h3>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials
                            .differential_3_description}
                      </h3>
                    </div>
                    <div className="card">
                      <span>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials.differential_5}
                      </span>
                      <h3>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials
                            .differential_5_description}
                      </h3>
                    </div>
                  </div>
                  <div className="row">
                    <div className="card">
                      <span>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials.differential_2}
                      </span>
                      <h3>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials
                            .differential_2_description}
                      </h3>
                    </div>
                    <div className="card">
                      <span>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials.differential_4}
                      </span>
                      <h3>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials
                            .differential_4_description}
                      </h3>
                    </div>
                    <div className="card">
                      <span>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials.differential_6}
                      </span>
                      <h3>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials
                            .differential_6_description}
                      </h3>
                    </div>
                  </div>
                </div>
              )}
              {isMobile && (
                <div className="cardGrid">
                  <Slider ref={highlightsMobile} {...highlightMobile}>
                    <div className="card">
                      <span>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials.differential_1}
                      </span>
                      <h3>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials
                            .differential_1_description}
                      </h3>
                    </div>
                    <div className="card">
                      <span>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials.differential_3}
                      </span>
                      <h3>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials
                            .differential_3_description}
                      </h3>
                    </div>
                    <div className="card">
                      <span>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials.differential_2}
                      </span>
                      <h3>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials
                            .differential_2_description}
                      </h3>
                    </div>
                    <div className="card">
                      <span>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials.differential_4}
                      </span>
                      <h3>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials
                            .differential_4_description}
                      </h3>
                    </div>
                    <div className="card">
                      <span>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials.differential_5}
                      </span>
                      <h3>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials
                            .differential_5_description}
                      </h3>
                    </div>
                    <div className="card">
                      <span>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials.differential_6}
                      </span>
                      <h3>
                        {capitalSolution &&
                          capitalSolution.differentials &&
                          capitalSolution.differentials
                            .differential_6_description}
                      </h3>
                    </div>
                  </Slider>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="transactionsContainer">
        <div className="theContainer">
          <div className="top">
            <div className="left">
              <h3>
                {(capitalSolution && capitalSolution.transaction) ||
                  `Nossas transações:`}
              </h3>
            </div>
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
            <Slider ref={slider2} {...secondSlider}>
              {transactions &&
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
                  .map((transaction) => (
                    <a onClick={(e) => openModal(e, transaction)}>
                      <CardCase
                        key={transaction.id}
                        image={`${transaction?.attributes?.image?.data?.attributes?.url}`}
                      />
                    </a>
                  ))}
            </Slider>
          </div>

          {!isMobile &&
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
              .map((transaction) => (
                <Modal
                  isOpen={selectedTransaction === transaction.id}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                  key={transaction.id}
                >
                  <>
                    <div className="ContainerModal">
                      <div className="leftContainerModal">
                        <div className="cardSocial-container">
                          <img
                            className="CardSocialImg"
                            src={
                              transaction.attributes.image.data.attributes.url
                            }
                            alt="Logo"
                          />
                        </div>
                      </div>
                      <div className="rightContainerModal">
                        <h2 className="titleModal">
                          {transaction.attributes.name}
                        </h2>
                        <button
                          style={customStyles.closeButtonModal}
                          className="closeButtonModal"
                          onClick={closeModal}
                        >
                          <img src={closeButton} alt="" />
                        </button>
                        <div className="DescriptionContainerModal">
                          <p className="Description">
                            {transaction.attributes.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                </Modal>
              ))}

          <div className="bottomMobile">
            <Slider ref={slider2Mobile} {...secondSlider}>
              {isMobile &&
                transactions &&
                transactions.map((transaction) => (
                  <>
                    <div
                      onClick={(e) => openModal(e, transaction)}
                      key={transaction.id}
                    >
                      <CardCase
                        image={transaction.attributes.image.data.attributes.url}
                        key={transaction.index}
                      />
                    </div>
                    <Modal
                      isOpen={selectedTransaction === transaction.id}
                      onRequestClose={closeModal}
                      style={customMobileStyles}
                      contentLabel="Example Modal"
                      key={transaction.id}
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
                                      transaction.attributes.image.data
                                        .attributes.url
                                    }
                                    alt="Logo"
                                  />
                                </div>
                              </div>
                              <h2 className="titleModal">
                                {transaction.attributes.name}
                              </h2>
                              {transaction.attributes.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </>
                ))}
            </Slider>
          </div>
        </div>
      </div>

      <div className="reviewsContainer">
        <div className="theContainer">
          <div className="top">
            <p>{capitalSolution && capitalSolution.clients}</p>
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

                    const priorityA =
                      priorityOrder[a.attributes.priority ?? "Muito alta"];
                    const priorityB =
                      priorityOrder[b.attributes.priority ?? "Muito alta"];

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

                    const priorityA =
                      priorityOrder[a.attributes.priority ?? "Muito alta"];
                    const priorityB =
                      priorityOrder[b.attributes.priority ?? "Muito alta"];

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
                  <label htmlFor="">{contacts && contacts.nome}</label>
                  <input
                    placeholder={contacts && contacts.campo}
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </div>
                <div className="form11">
                  <label htmlFor="">{contacts && contacts.email}</label>
                  <input
                    placeholder={contacts && contacts.campo}
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="form1">
                <div className="form11">
                  <label htmlFor="">{contacts && contacts.celular}</label>
                  <input
                    placeholder={contacts && contacts.campo}
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                  />
                </div>
                <div className="form11">
                  <label htmlFor="">{contacts && contacts.empresa}</label>
                  <input
                    placeholder={contacts && contacts.campo}
                    type="text"
                    value={formCpfCnpj}
                    onChange={(e) => setFormCpfCnpj(e.target.value)}
                  />
                </div>
              </div>
              <div className="messageForm">
                <label className="messageLabel" htmlFor="">
                  {contacts && contacts.mensagem}
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
                <button
                  onClick={(e) => handlerSubmit(e)}
                  disabled={disabledSubmitButton}
                >
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
