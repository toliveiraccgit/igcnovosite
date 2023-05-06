import React, { useEffect, useRef, useState } from "react";
import Banner from "../../assets/servicesBanner.png";
import "./Services.scss";

import icon07 from "../../assets/services/icon07.png";
import icon08 from "../../assets/services/icon08.png";

import Slider from "react-slick";
import arrowLeft from "../../assets/slider/arrowLeft.svg";
import arrowRight from "../../assets/slider/arrowRight.svg";

import CardCase from "../../components/CardCase/cardCase";
import Reviews from "../../components/Reviews/Review";
import BarChart from "../../components/BarChart/BarChart";

import Modal from "react-modal";
import closeButton from "../../assets/closeButton.png";
import config from "../../config/env";

import { useSelector } from "react-redux";
import {
  api_contact,
  api_services,
  api_testmony,
  api_transactions,
} from "../../api";

function Services() {
  const locale = useSelector((state) => state.locales.locale);

  const [servicePage, setServicePage] = useState({});
  const [testimony, setTestimony] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [filter, setFilter] = useState({});

  const [transactionSpecialties, setTransactionSpecialties] = useState([]);
  const [transactionOrigen, setTransactionOrigen] = useState([]);
  const [transactionPerfil, setTransactionPerfil] = useState([]);

  const [contacts, setContacts] = useState({});

  const [formName, setFormName] = useState(undefined);
  const [formEmail, setFormEmail] = useState(undefined);
  const [formPhone, setFormPhone] = useState(undefined);
  const [formCpfCnpj, setFormCpfCnpj] = useState(undefined);
  const [formMessage, setFormMessage] = useState(undefined);

  const [statusMessage, setStatusMessage] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const data = [48, 48, 48, 56, 65, 67, 69];

  const handleFilterChange = (event, type) => {
    const filterValue = event.target.value;
    setFilter({ ...filter, [type]: filterValue });
  };

  useEffect(() => {
    api_services
      .page({ locale })
      .then((res) => {
        setServicePage(res.data.data?.attributes);
      })
      .catch(() => {
        setServicePage({});
      });

    api_testmony
      .get({ locale })
      .then((res) => {
        setTestimony(res.data.data);
      })
      .catch(() => {
        setTestimony([]);
      });

    api_transactions.get_origem({ locale }).then((res) => {
      setTransactionOrigen(res.data.data);
    });

    api_transactions.get_specialtie({ locale }).then((res) => {
      setTransactionSpecialties(res.data.data);
    });

    api_transactions.get_perfil({ locale }).then((res) => {
      setTransactionPerfil(res.data.data);
    });

    api_transactions
      .get({ locale, filter })
      .then((res) => {
        setTransactions(res.data.data);
      })
      .catch(() => {
        setTransactions([]);
      });

    api_contact.page({ locale }).then((res) => {
      setContacts(res.data.data?.attributes);
    });
  }, [locale, filter]);

  const slider = useRef(null);
  const slider2 = useRef(null);

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
    slidesToShow: 3,
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
    slidesToShow: transactions.length > 5 ? 5 : transactions.length,
    slidesToScroll: 5,
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
    <div className="serviceContainer">
      <div className="bannerContainer">
        <img src={Banner} alt="" />
        <div className="theContainer">
          <p>{servicePage && servicePage.title}</p>
          <h3>{servicePage && servicePage.description}</h3>
        </div>
      </div>

      <div className="middleContainer">
        <div className="theContainer">
          <div className="rightContainer">
            <h4>
              {(servicePage && servicePage.dif && servicePage.dif.title) ||
                `nossos diferenciais`}
            </h4>
            <h1 className="yellow">Melhor transação possível</h1>
            <div className="bottom">
              <h1 className="blue">Maior taxa de conversão do mercado.</h1>
            </div>
          </div>
          <div className="leftContainer">
            <div className="bottom">
              <div className="left">
                <ul>
                  <div className="container">
                    <li className="firstLine">
                      <h3>De dono para dono</h3>
                      <span>28 sócios</span>
                    </li>
                    <li className="firstLine">
                      <h3>Alta perfomance</h3>
                      <span>+330 transações realizadas em M&A </span>
                    </li>
                    <li className="firstLine">
                      <h3>Global</h3>
                      <span>
                        +50% das transações com players internacionais
                      </span>
                    </li>
                  </div>
                </ul>
              </div>
              <div className="right">
                <ul>
                  <div className="container">
                    <li className="firstLine">
                      <h3>Sem conflito de interesse</h3>
                      <span>sempre no sell-side</span>
                    </li>
                    <li className="firstLine">
                      <h3>Especialização setorial</h3>
                      <span>sócios dedicados setorialmente</span>
                    </li>
                    <li className="firstLine">
                      <h3>Time de suporte</h3>
                      <span>antecipação dos problemas de sua transação.</span>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="chartContainer">
        <div className="theContainer">
          <div className="desktop">
            <div className="brandsArea">
              <h4 style={{ color: "#cbaa58" }}>igc partners</h4>
              <h4>
                BTG
                <br /> Pactual
              </h4>
              <h4>Itaú BBA</h4>
              <h4>
                Boutiques
                <br /> de M&A
              </h4>
              <h4>
                Bradesco
                <br /> BBI
              </h4>
              <h4>
                Bradesco
                <br /> BBI
              </h4>
              <h4>
                Bradesco
                <br /> BBI
              </h4>
            </div>
          </div>
          <div className="mobile">
            <div className="brandsArea">
              <h4 style={{ color: "#cbaa58" }}>igc partners</h4>
              <h4>
                BTG
                <br /> Pactual
              </h4>
              <h4>Itaú BBA</h4>
              <h4>
                Boutiques
                <br /> de M&A
              </h4>
              <h4>
                Bradesco
                <br /> BBI
              </h4>
            </div>
          </div>
          <BarChart data={data} />
          <p className="font">
            A igc é líder em número de transações M&A sell-side*
          </p>
          <p className="dataFont">*Últimos 36 meses. Fonte: TTR Data.</p>
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
                  "nossas transações:"}
              </h3>
              <div className="filters">
                <select
                  name=""
                  id=""
                  onChange={(e) => handleFilterChange(e, "specialtie")}
                >
                  <option value="" selected disabled>
                    {(servicePage &&
                      servicePage.transaction &&
                      servicePage.transaction.sectors) ||
                      "Setores"}
                  </option>
                  {transactionSpecialties &&
                    transactionSpecialties.map((specialtie) => (
                      <option key={specialtie.id} value={specialtie.id}>
                        {specialtie.attributes.name}
                      </option>
                    ))}
                </select>
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
                transactions.map((transaction) => (
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
            transactions.map((transaction) => (
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
                          src={`${config.api.BASE}${transaction.attributes.image.data.attributes.url}`}
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
            <Slider ref={slider2} {...secondSlider}>
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
                                    src={`${config.api.BASE}${transaction.attributes.image.data.attributes.url}`}
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
            <p>{(servicePage && servicePage.customer) || "nossos clientes"}</p>
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
              <div className="statusMessage">{statusMessage}</div>
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

export default Services;
