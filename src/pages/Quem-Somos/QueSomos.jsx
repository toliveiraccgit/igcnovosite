import { useEffect, useRef, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { isMobile } from "react-device-detect";
import Modal from "react-modal";
import closeButton from "../../assets/closeButton.png";
import Partner from "../../components/Partner/Partner";
import PartnerCardWhite from "../../components/PartnerCardWhite/PartnerCardWhite";
import emailQuemSomos from "./assets/emailQuemSomos.png";
import linkedinQuemSomos from "./assets/linkedinQuemSomos.png";
import arrowLeft from "../../assets/slider/arrowLeft.svg";
import arrowRight from "../../assets/slider/arrowRight.svg";
import "./QuemSomos.scss";

import { useSelector } from "react-redux";
import {
  api_about_us,
  api_group,
  api_partners,
  api_principles,
} from "../../api";

import config from "../../config/env";

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

  const [modal, setModalData] = useState({});
  const [modalIsOpen, setIsOpenModal] = useState(false);

  const sliderPartners = useRef(null);
  const sliderPartnersMobile = useRef(null);
  const sliderPrinciplesContainers = useRef(null);

  function openModal(e, data) {
    e.preventDefault();

    setModalData(data);
    setIsOpenModal(true);
  }

  function closeModal() {
    setIsOpenModal(false);
  }

  const handlePrevClick = () => {
    sliderPartners.current.slickPrev();
  };

  const handleNextClick = () => {
    sliderPartners.current.slickNext();
  };

  const sliderPartner = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const sliderPartnerMobile = {
    className: "center",
    centerMode: true,
    infinite: false,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    rows: 3,
    slidesPerRow: 1,
  };

  const sliderPrinciplesContainer = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  useEffect(() => {
    api_about_us
      .page({ locale })
      .then((response) => {
        setAboutUs(response.data.data.attributes);
      })
      .catch(() => {
        setAboutUs({});
      });

    api_partners
      .get({ locale })
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
    console.log(partners);

    api_group
      .get({ locale })
      .then((response) => {
        setGroups(response.data.data);
      })
      .catch(() => {
        setGroups([]);
      });
    console.log(groups);
  }, [locale]);

  const unMute = () => {
    refVideo.current.muted = !refVideo.current.muted;
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      clique para ativar o áudio
    </Tooltip>
  );

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
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <video
                  ref={refVideo}
                  autoPlay
                  muted
                  playsInline
                  loop
                  className="video"
                  onClick={unMute}
                >
                  <source
                    src={`${config.api.BASE}${
                      aboutUs &&
                      aboutUs.media &&
                      aboutUs.media.data &&
                      aboutUs.media.data.attributes &&
                      aboutUs.media.data.attributes.url
                    }`}
                    type={
                      aboutUs &&
                      aboutUs.media &&
                      aboutUs.media.data &&
                      aboutUs.media.data.attributes &&
                      aboutUs.media.data.attributes.mime
                    }
                  ></source>
                  Your browser does not support HTML5 video.
                </video>
              </OverlayTrigger>
            )}
          </div>
        </div>
      </div>

      <div className="partnersContainer">
        <div className="theContainer">
          <div className="top">
            <h4>
              {aboutUs &&
                aboutUs.partners &&
                String(aboutUs.partners.title).replace(
                  "{partners_count}",
                  partners.length
                )}
            </h4>
            <p>{aboutUs?.partners?.description}</p>
            <div className="slicks">
              <button onClick={handlePrevClick}>
                <img src={arrowLeft} alt="" />
              </button>
              <button onClick={handleNextClick}>
                <img src={arrowRight} alt="" />
              </button>
            </div>
          </div>

          <div className="slider">
            <Slider ref={sliderPartners} {...sliderPartner}>
              {partners &&
                partners.map((partner) => (
                  <>
                    <Partner key={partner.id} partner={partner} />
                  </>
                ))}
            </Slider>
          </div>

          <div className="slider-mobile">
            <Slider ref={sliderPartnersMobile} {...sliderPartnerMobile}>
              {partners &&
                partners.map((partner) => (
                  <>
                    <Partner key={partner.id} partner={partner} />
                  </>
                ))}
            </Slider>
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
                <PartnerCardWhite
                  key={principle.id}
                  principle={principle.attributes}
                />
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
            {/* <Accordion flush>
              {principles &&
                principles.map((item, index) => (
                  <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>
                      {item?.attributes?.title}
                    </Accordion.Header>
                    <Accordion.Body>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item?.attributes?.description,
                        }}
                      ></p>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
            </Accordion> */}
          </div>
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
                    src={`${config.api.BASE}${modal?.attributes?.photo?.data?.attributes?.url}`}
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
