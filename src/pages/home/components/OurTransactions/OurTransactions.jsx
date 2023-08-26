import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./OurTransactions.scss";
import CardCase from "../../../../components/CardCase/cardCase";
import { useSelector } from "react-redux";
import { api_home } from "../../../../api";
import Modal from "react-modal";
import closeButton from "../../../../assets/closeButton.png";

function OurTransactions() {
  const slider4 = useRef(null);

  const locale = useSelector((state) => state.locales.locale);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactionsTitle, setTransactionsTitle] = useState({
    transaction: "últimas transações",
    more: "ver todas",
  });

  const fourSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow:
      transactions && transactions.length >= 5 ? 5 : transactions.length,
    slidesToScroll: 5,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1315,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1074,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: true,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 690,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 390,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: true,
          centerPadding: "10px",
        },
      },
    ],
  };

  const isMobile = window.innerWidth <= 768;

  const openModal = (e, transaction) => {
    e.preventDefault();
    setSelectedTransaction(transaction.id);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
  };

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

  useEffect(() => {
    api_home.getTransactions({ locale }).then((res) => {
      const limitData =
        res &&
        res.data &&
        res.data.data &&
        res.data.data.attributes &&
        res.data.data.attributes.transaction &&
        res.data.data.attributes.transaction.transactions &&
        res.data.data.attributes.transaction.transactions.data.slice(0, 10);

      setTransactions(limitData);
      setTransactionsTitle(res.data.data.attributes.transaction);
    });
  }, []);

  return (
    <div className="lastTransactions">
      <div className="theContainer">
        <div className="top">
          <h4>{transactionsTitle && transactionsTitle.transaction}</h4>
          <Link to="/transacoes/todas">
            {transactionsTitle && transactionsTitle.more}
          </Link>
        </div>
        <div className="bottom">
          {transactions &&
            transactions.map((transaction) => (
              <div
                onClick={(e) => openModal(e, transaction)}
                key={transaction.id}>
                <CardCase
                  image={transaction.attributes.image.data.attributes.url}
                  key={transaction.index}
                />
              </div>
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
              key={transaction.id}>
              <>
                <div className="ContainerModal">
                  <div className="leftContainerModal">
                    <div className="cardSocial-container">
                      <img
                        className="CardSocialImg"
                        src={transaction.attributes.image.data.attributes.url}
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
                      onClick={closeModal}>
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
          <Slider ref={slider4} {...fourSlider}>
            {isMobile &&
              transactions &&
              transactions.map((transaction) => (
                <>
                  <div
                    onClick={(e) => openModal(e, transaction)}
                    key={transaction.id}>
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
                    key={transaction.id}>
                    <div className="ContainerModalMobile">
                      <div className="rightContainerModal">
                        <button
                          style={customStyles.closeButtonModal}
                          className="closeButtonModal"
                          onClick={closeModal}>
                          <img src={closeButton} alt="" />
                        </button>
                        <div className="DescriptionContainerModal">
                          <p className="Description">
                            <div className="Img">
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
  );
}

export default OurTransactions;
