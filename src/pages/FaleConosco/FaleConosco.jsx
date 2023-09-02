import faleConosco from "../../assets/faleConosco.png";
import logo from "../../assets/logo.png";
import "./FaleConosco.scss";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api_contact, api_partners } from "../../api";

function FaleConosco() {
  const { locale } = useSelector((state) => state.locales);

  const [pageContact, setPageContact] = useState({});
  const [partners, setPartners] = useState([]);

  const [formName, setFormName] = useState(undefined);
  const [formEmail, setFormEmail] = useState(undefined);
  const [formPhone, setFormPhone] = useState(undefined);
  const [formCpfCnpj, setFormCpfCnpj] = useState(undefined);
  const [formMessage, setFormMessage] = useState(undefined);
  const [formPartner, setFormPartner] = useState(undefined);

  const [statusMessage, setStatusMessage] = useState("");

  const [disabledSubmitButton, setDisabledSubmitButton] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    api_contact
      .page({ locale })
      .then((response) => {
        setPageContact(response.data.data.attributes);
      })
      .catch(() => {
        setPageContact({});
      });

    api_partners.getBasic({ locale }).then((response) => {
      setPartners(response.data.data);
    });
  }, [locale]);

  const handlerSubmit = (e) => {
    e.preventDefault();
    setDisabledSubmitButton(true);

    if (!formName || formName === "") {
      setStatusMessage(pageContact.required_field);
      return;
    }

    if (!formEmail || formEmail === "") {
      setStatusMessage(pageContact.required_field);
      return;
    }

    if (!formMessage || formMessage === "") {
      setStatusMessage(pageContact.required_field);
      return;
    }

    const data = {
      logo: logo,
      name: formName,
      email: formEmail,
      phone: formPhone || "",
      cpf_cnpj: formCpfCnpj || "",
      message: formMessage,
      parceiro:
        formPartner ||
        (partners && partners.length > 0
          ? partners[0].attributes.name
          : undefined),
    };

    api_contact
      .send({ data })
      .then((response) => {
        setStatusMessage(pageContact.aprovado);
        setFormName("");
        setFormEmail("");
        setFormPhone("");
        setFormCpfCnpj("");
        setFormMessage("");
        setDisabledSubmitButton(false);
      })
      .catch((error) => {
        setStatusMessage(pageContact.erro);
        setDisabledSubmitButton(false);
      });
  };

  return (
    <div className="faleConoscoContainer">
      <div className="topPage">
        <div className="theContainer">{pageContact.title}</div>
      </div>

      <div className="formContainer">
        <div className="theContainer">
          <img className="FormImg" src={faleConosco} alt="" />
          <div className="faleConosco">
            <h3>{pageContact.subtitle}</h3>
            <div className="choosePatner">
              <p>{pageContact.socios}</p>
              <select
                className="partner"
                onChange={(e) => setFormPartner(e.target.value)}
                value={formPartner || ""}
              >
                {!formPartner && (
                  <option value="" selected disabled>
                    {pageContact.socios_label}
                  </option>
                )}
                {partners &&
                  partners.map((partner, index) => (
                    <option key={index} value={partner.attributes.name}>
                      {partner.attributes.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form">
              <form action="">
                <div className="form1">
                  <div className="form11">
                    <label htmlFor="">{pageContact.nome}</label>
                    <input
                      placeholder={pageContact.campo}
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                    />
                  </div>
                  <div className="form11">
                    <label htmlFor="">{pageContact.email}</label>
                    <input
                      placeholder={pageContact.campo}
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form1">
                  <div className="form11">
                    <label htmlFor="">{pageContact.celular}</label>
                    <input
                      placeholder={pageContact.campo}
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                    />
                  </div>
                  <div className="form11">
                    <label htmlFor="">{pageContact.empresa}</label>
                    <input
                      placeholder={pageContact.campo}
                      type="text"
                      value={formCpfCnpj}
                      onChange={(e) => setFormCpfCnpj(e.target.value)}
                    />
                  </div>
                </div>
                <div className="messageForm">
                  <label className="messageLabel" htmlFor="">
                    {pageContact.mensagem}
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
                    {pageContact &&
                      pageContact.button &&
                      pageContact.button.label}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaleConosco;
