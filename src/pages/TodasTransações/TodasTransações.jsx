import CardCase from "../../components/CardCase/cardCase";
import "./TodasTransações.scss";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { api_transacoes, api_transactions } from "../../api";
import closeButton from "../../assets/closeButton.png";

function TodasTransações() {
  const { locale } = useSelector((state) => state.locales);

  const { getSpecialties, getBasic } = api_transactions;
  const { getTransactionPage } = api_transacoes;

  const [transactions, setTransactions] = useState([]);
  const [banner, setBanner] = useState({});
  const [transactionSpecialties, setTransactionSpecialties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const generateChargeTransactions = (numberOfObjects) => {
    return Array.from({ length: numberOfObjects }, () => ({}));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getTransactionPage({ locale })
      .then((res) => {
        const data = res.data.data.attributes;
        const banner = data?.banner.data.attributes;

        setBanner({
          url: banner.url || "",
          title: data?.title || "",
          description: data?.description || "",
          sectors: data?.sectors || "",
        });

        getSpecialties({ locale }).then((res) => {
          setTransactionSpecialties(res.data.data);
        });

        getBasic({
          locale,
        }).then((res) => {
          const allTransactions = res.data.data;
          const transactionsNames = new Set();
          const filteredTransactions = allTransactions.filter(
            ({ attributes }) => {
              if (!transactionsNames.has(attributes.name)) {
                transactionsNames.add(attributes.name);
                return true;
              }
              return false;
            }
          );

          const sortedTransactions = filteredTransactions.sort((a, b) => {
            const priorityOrder = {
              "Muito alta": 1,
              Alta: 2,
              Normal: 3,
              Baixa: 4,
            };

            const priorityA = priorityOrder[a.attributes.priority];
            const priorityB = priorityOrder[b.attributes.priority];

            return priorityA - priorityB;
          });

          setTransactions(sortedTransactions);
          setIsLoading(false);
        });
      })
      .catch((err) => {
        alert.localeNotFound(locale);
      });
  }, [locale]);

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
      {banner && banner.url && (
        <div className="bannerContainer">
          <img src={`${banner && banner.url}`} alt="Banner" />
          <div className="theContainer">
            <h3>{banner && banner.title}</h3>
            <p>{banner && banner.description}</p>
          </div>
        </div>
      )}

      <div className="caseContainer">
        <div className="theContainer">
          <div className="topCase">
            <h4>{banner && banner.label_transaction}</h4>

            {banner && banner.url && (
              <div className="filterContainer">
                <select name="" id="" onChange={(e) => handleFilterChange(e)}>
                  <option value="" selected disabled>
                    {banner && banner.sectors}
                  </option>
                  {transactionSpecialties.map((specialtie) => (
                    <option
                      key={specialtie.attributes.name}
                      value={specialtie.attributes.name}
                    >
                      {specialtie.attributes.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {isLoading ? (
            <div
              style={{
                margin: "80px 20px",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            />
          ) : (
            <>
              <div className="caseCardsContainer">
                {transactions.map((transaction) => (
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

              <div className="caseCardsContainerMobile">
                {isMobile &&
                  transactions &&
                  transactions.map((transaction) => (
                    <>
                      <a
                        style={{ cursor: "pointer", marginBottom: 20 }}
                        onClick={(e) => openModal(e, transaction)}
                      >
                        <CardCase
                          key={transaction.id}
                          image={`${transaction.attributes.image.data.attributes.url}`}
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
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodasTransações;
