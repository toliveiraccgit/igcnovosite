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

  const [isLoading, setIsLoading] = useState(true);

  const handleFilterChange = (event, type) => {
    const filterValue = event.target.value;
    setFilter({ ...filter, [type]: filterValue });
  };

  useEffect(() => {
    APITransaction.page({ locale })
      .then((response) => {
        setTransactionPage(response.data.data.attributes);
        console.log(response.data.attributes);
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

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [locale, filter]);

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
    <div className="transactionsContainer">
      {isLoading ? (
        <div className="noData">
          <div class="loading-icon"></div>
          <span>Loading...</span>
        </div>
      ) : (
        <>
          <div className="bannerContainer">
            <img
              src={`${config.api.BASE}${
                transactionPage &&
                transactionPage.banner &&
                transactionPage.banner.data &&
                transactionPage.banner.data.attributes.url
              }`}
              alt="Banner"
            />
            <div className="bannerText">
              <div className="theContainer">
                <h3>{transactionPage && transactionPage.title}</h3>
                <p>{transactionPage && transactionPage.description}</p>
              </div>
            </div>
          </div>

          <div className="caseContainer">
            <div className="theContainer">
              <div className="topCase">
                <h4>Transações</h4>
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

                  {/* V Filtro de origem V */}

                  {/* <select
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
              </select> */}

                  {/* V Filtro de perfil V */}

                  {/* <select
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
              </select> */}
                </div>
              </div>
              <div className="caseCardsContainer">
                {transactions
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
                    <a
                      style={{ cursor: "pointer", marginBottom: 20 }}
                      onClick={(e) => openModal(e, transaction)}
                    >
                      <CardCase
                        key={transaction.id}
                        image={`${transaction.attributes.image.data.attributes.url}`}
                      />
                    </a>
                  ))}
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

              <div className="caseCardsContainerMobile">
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
                    .map((transaction) => (
                      <>
                        <div
                          onClick={(e) => openModal(e, transaction)}
                          key={transaction.id}
                        >
                          <CardCase
                            image={
                              transaction.attributes.image.data.attributes.url
                            }
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
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default transactions;
