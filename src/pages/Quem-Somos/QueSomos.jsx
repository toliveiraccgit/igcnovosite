import { useEffect, useRef, useState } from "react";
// import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-modal";
import closeButton from "../../assets/closeButton.png";
// import Partner from "../../components/Partner/Partner";
import PartnerCardWhite from "../../components/PartnerCardWhite/PartnerCardWhite";
import emailQuemSomos from "./assets/emailQuemSomos.png";
import linkedinQuemSomos from "./assets/linkedinQuemSomos.png";
// import arrowLeft from "../../assets/slider/arrowLeft.svg";
// import arrowRight from "../../assets/slider/arrowRight.svg";
import "./QuemSomos.scss";

import { useSelector } from "react-redux";
import {
  api_about_us,
  api_group,
  api_partners,
  api_principles,
} from "../../api";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    padding: "0px",
    background: "#D3A93D",
  },
};

function QuemSomos() {
  const refVideo = useRef(null);

  const locale = useSelector((state) => state.locales.locale);

  const [aboutUs, setAboutUs] = useState({});
  const [partners, setPartners] = useState([]);
  const [principles, setPrinciples] = useState([]);

  const [groups, setGroups] = useState([]);
  // const [group, setGroup] = useState(0);

  const [modal, setModalData] = useState({});
  const [modalIsOpen, setIsOpenModal] = useState(false);

  // const sliderPartners = useRef(null);
  // const sliderPartnersMobile = useRef(null);
  const sliderPrinciplesContainers = useRef(null);

  const [filter, setFilter] = useState({});

  // const handleFilterChange = (event, type) => {
  //   const filterValue = event.target.value;
  //   setFilter({ ...filter, [type]: filterValue });
  // };

  function closeModal() {
    setIsOpenModal(false);
  }

  // const handlePrevClick = () => {
  //   sliderPartners.current.slickPrev();
  // };

  // const handleNextClick = () => {
  //   sliderPartners.current.slickNext();
  // };

  // const sliderPartnerMobile = {
  //   dots: true,
  //   className: "center",
  //   centerMode: true,
  //   infinite: false,
  //   centerPadding: "60px",
  //   slidesToShow: 1,
  //   speed: 500,
  //   rows: 3,
  //   slidesPerRow: 1,
  //   variableWidth: true,
  // };

  const sliderPrinciplesContainer = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    variableWidth: true,
  };

  useEffect(() => {
    api_about_us
      .page({ locale })
      .then((response) => {
        setAboutUs(response.data.data.attributes);
        console.log(response.data.data.attributes);
      })
      .catch(() => {
        setAboutUs({});
      });

    api_partners
      .get({ locale, filter })
      .then((response) => {
        setPartners(response.data.data);
      })
      .catch(() => {
        setPartners([]);
      });

    api_principles
      .get({ locale })
      .then((response) => {
        setPrinciples(response.data.data);
      })
      .catch(() => {
        setPrinciples([]);
      });

    api_group
      .get({ locale })
      .then((response) => {
        setGroups(response.data.data);
      })
      .catch(() => {
        setGroups([]);
      });
  }, [locale, filter]);

  return (
    <div className="QuemSomosContainer">
      <div className="topPage">
        <div className="theContainer">
          <p>{aboutUs && aboutUs.title}</p>
        </div>
      </div>

      <div className="FirstSectionContainer">
        <div className="theContainer">
          <div className="right">
            <h4>{aboutUs && aboutUs.label}</h4>
            <p
              dangerouslySetInnerHTML={{
                __html: aboutUs && aboutUs.description,
              }}
            ></p>
          </div>
          <div className="left">
            {aboutUs?.media?.data && (
              <img
                src={`${
                  aboutUs &&
                  aboutUs.media &&
                  aboutUs.media.data &&
                  aboutUs.media.data.attributes &&
                  aboutUs.media.data.attributes.url
                }`}
                alt=""
              />
            )}
          </div>
        </div>
      </div>

      <div className="PrinciplesContainer">
        <div className="theContainer">
          <div className="top">
            <h4>{aboutUs && aboutUs.principles}</h4>
          </div>

          <div className="bottom">
            {principles &&
              principles.map((principle) => (
                <>
                  <PartnerCardWhite
                    key={principle.id}
                    principle={principle.attributes}
                  />
                </>
              ))}
          </div>

          <div className="bottomMobile">
            <Slider
              ref={sliderPrinciplesContainers}
              {...sliderPrinciplesContainer}
            >
              {principles &&
                principles.map((principle) => (
                  <PartnerCardWhite
                    key={principle.id}
                    principle={principle.attributes}
                  />
                ))}
            </Slider>
          </div>
        </div>
      </div>

      <div className="VideoArea">
        <div className="theContainer">
          {/* {aboutUs?.media?.data && (
            <img
              src={`${
                aboutUs &&
                aboutUs.media &&
                aboutUs.media.data &&
                aboutUs.media.data.attributes &&
                aboutUs.media.data.attributes.url
              }`}
              alt=""
            />
          )} */}
          <video controls>
            <source
              src={
                aboutUs &&
                aboutUs.video &&
                aboutUs.video.data &&
                aboutUs.video.data.attributes &&
                aboutUs.video.data.attributes.url
              }
              type="video/mp4"
            />
          </video>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className={"ModalQuemSomos"}
      >
        <div className="ContainerModalMobileQuemSomos">
          <div className="rightContainerModal">
            <button className="closeButtonModalQuemSomos" onClick={closeModal}>
              <img src={closeButton} alt="" />
            </button>
            <h2 className="titleModal">{modal?.attributes?.name}</h2>
            <div className="DescriptionContainerModal">
              <p className="Description">
                <div className="Img">
                  <img
                    className="QuemSomosImage"
                    src={modal?.attributes?.photo?.data?.attributes?.url}
                    alt=""
                  />
                </div>
                <div className="bottomModal">
                  <div className="DataContainer">
                    <img src={emailQuemSomos} alt="" />
                    <p className="description">{modal?.attributes?.email}</p>
                  </div>
                  <div className="DataContainer">
                    <img src={linkedinQuemSomos} alt="" />
                    <p className="description">{modal?.attributes?.linkedin}</p>
                  </div>
                </div>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default QuemSomos;
