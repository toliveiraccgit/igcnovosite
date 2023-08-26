import React, { useEffect, useState } from "react";
import Banner from "../../assets/IpoAdivisor/BannerIpo.png";

import Accordion from "react-bootstrap/Accordion";
import CardWhite from "../../components/CardWhite/CardWhite";

import { useSelector } from "react-redux";
import { api_contact, api_ipo } from "../../api";

import "./IpoAdivisor.scss";

function IpoAdivisor() {
  const locale = useSelector((state) => state.locales.locale);

  const [page, setPage] = useState({});
  const [contact, setContact] = useState({});

  const [formName, setFormName] = useState(undefined);
  const [formEmail, setFormEmail] = useState(undefined);
  const [formPhone, setFormPhone] = useState(undefined);
  const [formCpfCnpj, setFormCpfCnpj] = useState(undefined);
  const [formMessage, setFormMessage] = useState(undefined);

  const [statusMessage, setStatusMessage] = useState("");

  const [disabledSubmitButton, setDisabledSubmitButton] = useState(false);

  useEffect(() => {
    api_ipo
      .page({ locale })
      .then((res) => {
        setPage(res.data.data.attributes);
      })
      .catch((err) => {
        console.log(err);
      });

    api_contact
      .page({ locale })
      .then((response) => {
        setContact(response.data.data.attributes);
      })
      .catch(() => {
        setContact({});
      });
  }, [locale]);

  const handlerSubmit = (e) => {
    e.preventDefault();
    setDisabledSubmitButton(true);

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
      .then((response) => {
        setStatusMessage("Mensagem enviada com sucesso");
        setFormName("");
        setFormEmail("");
        setFormPhone("");
        setFormCpfCnpj("");
        setFormMessage("");
        setDisabledSubmitButton(false);
      })
      .catch((error) => {
        setStatusMessage("Ocorreu um erro ao enviar a mensagem");
        setDisabledSubmitButton(false);
      });
  };

  return (
    <div className="IpoAdivisorContainer">
      <div className="bannerContainer">
        <img src={Banner} alt="" />
        <div className="theContainer">
          <p>{page && page.title}</p>
          <h3>{page && page.description}</h3>
        </div>
      </div>

      <div className="whyAdivisorContainer">
        <div className="theContainer">
          <div className="top">
            <h2 className="title">{page && page.about && page.about.title}</h2>
            <p className="p1">{page && page.about && page.about.description}</p>
          </div>
          <div className="bottom">
            {page &&
              page.about &&
              page.about.cards &&
              page.about.cards.map((card, index) => (
                <CardWhite
                  key={index}
                  title={card.title}
                  description={card.description}
                />
              ))}
          </div>

          <div className="bottomMobile">
            <Accordion flush>
              {page &&
                page.about &&
                page.about.mobile.map((item, index) => (
                  <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>{item.title}</Accordion.Header>
                    <Accordion.Body>{item.description}</Accordion.Body>
                  </Accordion.Item>
                ))}
            </Accordion>
          </div>
        </div>
      </div>

      <div className="GraphicContainer">
        <div className="theContainer">
          <div className="top">
            <h2 className="title">{page && page.chart && page.chart.title}</h2>
            <p className="p1">{page && page.chart && page.chart.description}</p>
          </div>
          <div className="bottom">
            <img
              className="BannerGraphic"
              src={`${
                page &&
                page.chart &&
                page.chart.image &&
                page.chart.image.data &&
                page.chart.image.data.attributes &&
                page.chart.image.data.attributes.url
              }`}
              alt="chart-image"
            />
          </div>
        </div>
      </div>

      <div className="whyAdivisorContainer">
        <div className="theContainer">
          <div className="top">
            <h2 className="title">{page && page.more && page.more.title}</h2>
          </div>
          <div className="bottom">
            {page &&
              page.more &&
              page.more.cards &&
              page.more.cards.map((card, index) => (
                <CardWhite
                  key={index}
                  title={card.title}
                  description={card.description}
                />
              ))}
          </div>

          <div className="bottomMobile">
            <Accordion flush>
              {page &&
                page.more &&
                page.more.mobile.map((item, index) => (
                  <Accordion.Item eventKey={index} key={index} s>
                    <Accordion.Header>{item.title}</Accordion.Header>
                    <Accordion.Body>{item.description}</Accordion.Body>
                  </Accordion.Item>
                ))}
            </Accordion>
          </div>
        </div>
      </div>

      <div className="containerForm">
        <div className="theContainer">
          <div className="leftContainer">
            <h3>{contact && contact.title}</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: contact && contact.description,
              }}></p>
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
                <button
                  disabled={disabledSubmitButton}
                  onClick={(e) => handlerSubmit(e)}>
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IpoAdivisor;
