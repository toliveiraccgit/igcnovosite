import React, { useState } from "react";
import Modal from "react-modal";
import "./PartnerCardWhite.scss";
import closeButton from "../../assets/closeButton.png";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "400px",
    height: "auto",
    padding: "30px",
  },
  title: {
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#9c9c9c",
    marginTop: "20px",
    marginBottom: "45px",
  },
  subtitle: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "24px",
    color: "#222f44",
    marginBottom: "45px",
  },
  text: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "21px",
    color: "#7c8390",
  },
};

function PartnerCardWhite({ principle }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  return (
    <div className="PartnerCardWhiteContainer">
      <div className="Texts">
        <h4 className="title">{principle.title}</h4>
        <p className="subtitle">{principle.label}</p>

        <p
          style={customStyles.text}
          dangerouslySetInnerHTML={{ __html: principle.description }}
        ></p>
        {/* <button onClick={openModal}>{principle.button}</button> */}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <h4 style={customStyles.title}>{principle.title}</h4>

        <button
          className="closeButtonModal"
          onClick={() => setModalIsOpen(false)}
        >
          <img src={closeButton} alt="" />
        </button>

        <p style={customStyles.subtitle}>{principle.label}</p>

        <p
          style={customStyles.text}
          dangerouslySetInnerHTML={{ __html: principle.description }}
        ></p>
      </Modal>
    </div>
  );
}

export default PartnerCardWhite;
