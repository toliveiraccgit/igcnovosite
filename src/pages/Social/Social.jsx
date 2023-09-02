import closeButton from "../../assets/closeButton.png";
import Cards from "../../components/CardSocial/cardSocial";
import "./Social.scss";

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { api_social } from "../../api";

import Modal from "react-modal";

function Social() {
  const locale = useSelector((state) => state.locales.locale);

  const [social, setSocial] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    api_social
      .page({ locale })
      .then((res) => {
        setSocial(res.data.data.attributes);
      })
      .catch(() => {
        setSocial({});
      });
  }, [locale]);

  const [modal, setModalData] = useState({});
  const [modalIsOpen, setIsOpenModal] = useState(false);

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

  function openModal(e, data) {
    e.preventDefault();

    setModalData(data);
    setIsOpenModal(true);
  }

  function closeModal() {
    setIsOpenModal(false);
  }

  return (
    <div className="socialContainer">
      <div className="topPage">
        <div className="theContainer">{social && social.title}</div>
      </div>
      <div className="firstBanner">
        <div className="theContainer">
          <div className="textBanner">
            <h3>{social && social.label}</h3>
            <p>{social && social.description}</p>
          </div>
          <img
            className="SocialBanner"
            src={`${
              social &&
              social.image &&
              social.image.data &&
              social.image.data.attributes &&
              social.image.data.attributes.url
            }`}
            alt=""
          />
        </div>
      </div>

      <div className="cardsContainer">
        <div className="theContainer">
          <h4>{social && social.support}</h4>
          <div className="cards">
            {social &&
              social.supports &&
              social.supports.map((support) => (
                <button key={support.id} onClick={(e) => openModal(e, support)}>
                  <Cards image={support.image.data.attributes.url} />
                </button>
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
            <Cards
              image={
                modal &&
                modal.image &&
                modal.image.data &&
                modal.image.data.attributes &&
                modal.image.data.attributes.url
              }
            />
          </div>
          <div className="rightContainerModal">
            <h2 className="titleModal">{modal && modal.title}</h2>
            <button className="closeButtonModal" onClick={closeModal}>
              <img src={closeButton} alt="" />
            </button>
            <div className="DescriptionContainerModal">
              <p className="Description">{modal && modal.description}</p>
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
                  <Cards
                    image={
                      modal &&
                      modal.image &&
                      modal.image.data &&
                      modal.image.data.attributes &&
                      modal.image.data.attributes.url
                    }
                  />
                </div>
                <h2 className="titleModal">{modal && modal.title}</h2>
                {modal && modal.description}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Social;
