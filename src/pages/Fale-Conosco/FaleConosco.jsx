import faleConosco from "../../assets/faleConosco.png";
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

  useEffect(() => {
    api_contact
      .page({ locale })
      .then((response) => {
        setPageContact(response.data.data.attributes);
      })
      .catch(() => {
        setPageContact({});
      });

    api_partners.get({ locale }).then((response) => {
      setPartners(response.data.data);
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
      parceiro: formPartner || (partners && partners[0].id) || undefined,
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
      })
      .catch((error) => {
        setStatusMessage("Ocorreu um erro ao enviar a mensagem");
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
              <p>Fale com o nosso sócio</p>
              <select
                className="partner"
                onChange={(e) => setFormPartner(e.target.value)}
                value={formPartner || ""}
              >
                {!formPartner && (
                  <option value="" selected disabled>
                    Selecione um sócio
                  </option>
                )}
                {partners &&
                  partners.map((partner, index) => (
                    <option key={index} value={partner.id}>
                      {partner.attributes.name}
                    </option>
                  ))}
              </select>
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
                    <label htmlFor="">Celular</label>
                    <input
                      placeholder="Digite aqui"
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                    />
                  </div>
                  <div className="form11">
                    <label htmlFor="">Nome da sua empresa</label>
                    <input
                      placeholder="Digite aqui"
                      type="text"
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
                  <button onClick={(e) => handlerSubmit(e)}>Enviar</button>
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
