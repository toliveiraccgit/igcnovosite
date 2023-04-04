import banner from "../../assets/bannertransactions.jpg";
import CardCase from "../../components/CardCase/cardCase";
import "./transactions.scss";

import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import APITransaction from "../../api/transactions";
import closeButton from "../../assets/closeButton.png";

import config from "../../config/env";

function transactions() {
  const { locale } = useSelector((state) => state.locales);
  const [transactionPage, setTransactionPage] = useState({});
  const [transactions, setTransactions] = useState([]);

  const [transactionSpecialties, setTransactionSpecialties] = useState([]);
  const [transactionOrigen, setTransactionOrigen] = useState([]);
  const [transactionPerfil, setTransactionPerfil] = useState([]);

  const [filter, setFilter] = useState({});

  const handleFilterChange = (event, type) => {
    const filterValue = event.target.value;
    setFilter({ ...filter, [type]: filterValue });
  };

  useEffect(() => {
    APITransaction.page({ locale })
      .then((response) => {
        setTransactionPage(response.data.data.attributes);
      })
      .catch((error) => {
        setTransactionPage({});
      });

    APITransaction.get({ locale, filter }).then((res) => {
      setTransactions(res.data.data);
    });

    APITransaction.get_origem({ locale }).then((res) => {
      setTransactionOrigen(res.data.data);
    });

    APITransaction.get_specialtie({ locale }).then((res) => {
      setTransactionSpecialties(res.data.data);
    });

    APITransaction.get_perfil({ locale }).then((res) => {
      setTransactionPerfil(res.data.data);
    });
  }, [locale, filter]);

  const [modal, setModalData] = useState({});
  const [modalIsOpen, setIsOpenModal] = useState(false);

  function openModal(e, data) {
    e.preventDefault();

    setModalData(data);
    setIsOpenModal(true);
  }

  function closeModal() {
    setIsOpenModal(false);
  }

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
    },
  };

  return (
    <div className="transactionsContainer">
      <div className="bannerContainer">
        <img src={banner} alt="" />
        <div className="bannerText">
          <div className="theContainer">
            <h2>{transactionPage && transactionPage.title}</h2>
            <p>{transactionPage && transactionPage.description}</p>
          </div>
        </div>
      </div>

      <div className="caseContainer">
        <div className="theContainer">
          <div className="topCase">
            <h4>cases</h4>
            <div className="filterContainer">
              <p>Filtros:</p>
              <select
                name=""
                id=""
                onChange={(e) => handleFilterChange(e, "specialtie")}
              >
                <option value="" selected disabled>
                  {transactionPage && transactionPage.sectors}
                </option>
                {transactionSpecialties.map((specialtie) => (
                  <option value={specialtie.id}>
                    {specialtie.attributes.name}
                  </option>
                ))}
              </select>
              <select
                name=""
                id=""
                onChange={(e) => handleFilterChange(e, "origen")}
              >
                <option value="" selected disabled>
                  {transactionPage && transactionPage.source}
                </option>
                {transactionOrigen.map((origen) => (
                  <option value={origen.id}>{origen.attributes.origem}</option>
                ))}
              </select>
              <select
                name=""
                id=""
                onChange={(e) => handleFilterChange(e, "perfil")}
              >
                <option value="" selected disabled>
                  {transactionPage && transactionPage.profile}
                </option>
                {transactionPerfil.map((perfil) => (
                  <option value={perfil.id}>{perfil.attributes.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="caseCardsContainer">
            {transactions.map((transaction) => (
              <a
                style={{ cursor: "pointer", marginBottom: 20 }}
                onClick={(e) => openModal(e, transaction)}
              >
                <CardCase
                  image={`${transaction.attributes.image.data.attributes.url}`}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="ContainerModal">
          <div className="leftContainerModal">
            <img
              src={`${config.api.BASE}${
                modal &&
                modal.attributes &&
                modal.attributes.image &&
                modal.attributes.image.data &&
                modal.attributes.image.data.attributes &&
                modal.attributes.image.data.attributes.url
              }`}
              alt=""
            />
          </div>
          <div className="rightContainerModal">
            <h2 className="titleModal">
              {modal && modal.attributes && modal.attributes.name}
            </h2>
            <button className="closeButtonModal" onClick={closeModal}>
              <img src={closeButton} alt="" />
            </button>
            <div className="DescriptionContainerModal">
              <p className="Description">
                {modal && modal.attributes && modal.attributes.description}
              </p>
            </div>
          </div>
        </div>

        <div className="ContainerModalMobile">
          <div className="rightContainerModal">
            <button className="closeButtonModal" onClick={closeModal}>
              <img src={closeButton} alt="" />
            </button>
            <div className="DescriptionContainerModal">
              <p className="Description">
                <div className="Img">
                  <img
                    className="SocialMobile"
                    src={`${config.api.BASE}${
                      modal &&
                      modal.attributes &&
                      modal.attributes.image &&
                      modal.attributes.image.data &&
                      modal.attributes.image.data.attributes &&
                      modal.attributes.image.data.attributes.url
                    }`}
                    alt=""
                  />
                </div>
                <h2 className="titleModal">
                  {modal && modal.attributes && modal.attributes.name}
                </h2>
                {modal && modal.attributes && modal.attributes.description}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default transactions;
