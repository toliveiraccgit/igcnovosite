import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./M&A.scss";

import Slider from "react-slick";
import arrowLeft from "../../assets/slider/arrowLeft.svg";
import arrowRight from "../../assets/slider/arrowRight.svg";
import rightArrow from "../../assets/homeBanners/arrowRight.png";

import CardCase from "../../components/CardCase/cardCase";
import Reviews from "../../components/Reviews/Review";

import Modal from "react-modal";
import closeButton from "../../assets/closeButton.png";

import { useSelector } from "react-redux";
import {
  api_contact,
  api_services,
  api_testmony,
  api_transactions,
} from "../../api";

function MeA() {
  const locale = useSelector((state) => state.locales.locale);

  const [servicePage, setServicePage] = useState({});
  const [testimony, setTestimony] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [transactionSpecialties, setTransactionSpecialties] = useState([]);

  const [contacts, setContacts] = useState({});

  const [formName, setFormName] = useState(undefined);
  const [formEmail, setFormEmail] = useState(undefined);
  const [formPhone, setFormPhone] = useState(undefined);
  const [formCpfCnpj, setFormCpfCnpj] = useState(undefined);
  const [formMessage, setFormMessage] = useState(undefined);

  const [statusMessage, setStatusMessage] = useState("");

  const [disabledSubmitButton, setDisabledSubmitButton] = useState(false);

  const isMobile = window.innerWidth <= 768;

  const handleFilterChange = (e) => {
    api_transactions
      .getBySpeciality({
        locale,
        speciality: encodeURIComponent(e.target.value),
      })
      .then((res) => {
        setTransactions(res.data.data);
      })
      .catch(() => {
        setServicePage({});
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    api_services
      .page({ locale })
      .then((res) => {
        setServicePage(res.data.data?.attributes);

        api_testmony
          .getByType({ locale, type: encodeURIComponent("M&A") })
          .then((res) => {
            setTestimony(res.data.data);
          })
          .catch(() => {
            setTestimony([]);
          });

        api_transactions.getSpecialties({ locale }).then((res) => {
          setTransactionSpecialties(res.data.data);
        });

        api_transactions
          .getByPriorityAndService({
            locale,
            // priority: encodeURIComponent("Muito alta"),
            service: encodeURIComponent("M&A"),
          })
          .then((res) => {
            const resTransactions = res.data.data;

            const priorityOrder = {
              "Muito alta": 1,
              Alta: 2,
              Normal: 3,
              Baixa: 4,
            };

            resTransactions.sort((a, b) => {
              const priorityA = priorityOrder[a.attributes.priority] || 999;
              const priorityB = priorityOrder[b.attributes.priority] || 999;

              return priorityA - priorityB;
            });

            setTransactions(resTransactions);
          });

        api_contact.page({ locale }).then((res) => {
          setContacts(res.data.data?.attributes);
        });
      })
      .catch(() => {
        setServicePage({});
      });
  }, [locale]);

  const slider = useRef(null);
  const slider2 = useRef(null);
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
          slidesToScroll: 5,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true,
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
          initialSlide: 1,
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

  const handlePrevClick = () => {
    slider2.current.slickPrev();
  };

  const handleNextClick = () => {
    slider2.current.slickNext();
  };

  const [selectedTransaction, setSelectedTransaction] = useState(null);

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
    <div className="serviceContainer">
      <div className="bannerContainer">
        <img
          src={
            servicePage &&
            servicePage.bunner &&
            servicePage.bunner?.data &&
            servicePage.bunner?.data?.attributes &&
            servicePage.bunner?.data?.attributes?.url
          }
          alt=""
        />
        <div className="theContainer">
          <h3>{servicePage && servicePage.title}</h3>
          <p>{servicePage && servicePage.description}</p>
        </div>
      </div>

      <div className="middleContainer">
        <div className="theContainer">
          <div className="titleContainer">
            {/* <h4>{servicePage && servicePage.dif && servicePage.dif.title}</h4> */}
            <h1 className="blue">
              {servicePage && servicePage.dif && servicePage.dif.highlight_1}
            </h1>
            <div className="bottom">
              <p>
                {servicePage &&
                  servicePage.dif &&
                  servicePage.dif.highlight_1_description}
              </p>
            </div>
          </div>
          <div className="highligthsContainer" style={{ width: "100%" }}>
            <div className="top">
              <h1 className="blue">Nossos diferenciais</h1>
              <Link className="buttonContact" to="/fale-conosco">
                {servicePage && servicePage.dif && servicePage.dif.button}
                <img src={rightArrow} alt="" />{" "}
              </Link>
            </div>
            <div className="bottom">
              <div className="bottom">
                {!isMobile && (
                  <div className="cardGrid">
                    <div className="row">
                      <div className="card">
                        <span>
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_1}
                        </span>
                        <h3>
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_1_description}
                        </h3>
                      </div>
                      <div className="card">
                        <span>
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_3}
                        </span>
                        <h3>
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_3_description}
                        </h3>
                      </div>
                      <div className="card">
                        <span>
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_2}
                        </span>
                        <h3>
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_2_description}
                        </h3>
                      </div>
                    </div>
                    <div className="row">
                      <div className="card">
                        <span>
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_5}
                        </span>
                        <h3>
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_5_description}
                        </h3>
                      </div>
                      <div className="card">
                        <span>
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_4}
                        </span>
                        <h3>
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_4_description}
                        </h3>
                      </div>
                      <div className="card">
                        <span>
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_6}
                        </span>
                        <h3>
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_6_description}
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
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_1}
                        </span>
                        <h3>
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_1_description}
                        </h3>
                      </div>
                      <div className="card">
                        <span>
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_3}
                        </span>
                        <h3>
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_3_description}
                        </h3>
                      </div>
                      <div className="card">
                        <span>
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_2}
                        </span>
                        <h3>
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_2_description}
                        </h3>
                      </div>
                      <div className="card">
                        <span>
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_5}
                        </span>
                        <h3>
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_5_description}
                        </h3>
                      </div>
                      <div className="card">
                        <span>
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_4}
                        </span>
                        <h3>
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_4_description}
                        </h3>
                      </div>
                      <div className="card">
                        <span>
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_6}
                        </span>
                        <h3>
                          {servicePage &&
                            servicePage.dif &&
                            servicePage.dif.differential_6_description}
                        </h3>
                      </div>
                    </Slider>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="chartContainer">
        <div className="theContainer">
          <h1 className="blue">
            {servicePage && servicePage.dif && servicePage.dif.highlight_2}
          </h1>
          <div className="imgArea">
            {!isMobile && (
              <img
                src={`${
                  servicePage &&
                  servicePage.chart_img_desk &&
                  servicePage.chart_img_desk.data &&
                  servicePage.chart_img_desk.data.attributes.url
                }`}
                alt="imgDesktop"
              />
            )}
            {isMobile && (
              <img
                src={`${
                  servicePage &&
                  servicePage.chart_img_mobile &&
                  servicePage.chart_img_mobile.data &&
                  servicePage.chart_img_mobile.data.attributes.url
                }`}
                alt="imgMobile"
              />
            )}
          </div>
        </div>
      </div>

      <div className="transactionsContainer">
        <div className="theContainer">
          <div className="top">
            <div className="left">
              <h3>
                {(servicePage &&
                  servicePage.transaction &&
                  servicePage.transaction.transaction) ||
                  "Nossas transações:"}
              </h3>
              <div className="filters">
                <select name="" id="" onChange={(e) => handleFilterChange(e)}>
                  <option value="" selected disabled>
                    {(servicePage &&
                      servicePage.transaction &&
                      servicePage.transaction.sectors) ||
                      "Setores"}
                  </option>
                  {transactionSpecialties &&
                    transactionSpecialties.map((specialtie) => (
                      <option
                        key={specialtie.attributes.name}
                        value={specialtie.attributes.name}
                      >
                        {specialtie.attributes.name}
                      </option>
                    ))}
                </select>
              </div>
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
          <div className={isMobile ? "bottomMobile" : "bottom"}>
            <Slider ref={slider2} {...secondSlider}>
              {!isMobile &&
                transactions &&
                transactions.map((transaction) => (
                  <>
                    <a onClick={(e) => openModal(e, transaction)}>
                      <CardCase
                        key={transaction.id}
                        image={`${transaction?.attributes?.image?.data?.attributes?.url}`}
                      />
                    </a>
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
                                  transaction.attributes.image.data.attributes
                                    .url
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
                  </>
                ))}
              {isMobile &&
                transactions &&
                transactions.map((transaction) => (
                  <>
                    <a onClick={(e) => openModal(e, transaction)}>
                      <CardCase
                        key={transaction.id}
                        image={`${transaction?.attributes?.image?.data?.attributes?.url}`}
                      />
                    </a>
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
            <p>{servicePage && servicePage.customer}</p>
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
              <div className="statusMessage">{statusMessage}</div>
              <div className="buttonForm">
                <button
                  disabled={disabledSubmitButton}
                  onClick={(e) => handlerSubmit(e)}
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

export default MeA;
