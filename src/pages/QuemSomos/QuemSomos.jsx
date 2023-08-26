import { useEffect, useState, lazy, Suspense } from "react";
// import "./QuemSomos.scss";
import { useSelector } from "react-redux";
import { api_about_us } from "../../api";
import TopPage from "./components/TopPage/TopPage";
const Principles = lazy(() => import("./components/Principles/Principles"));
const Video = lazy(() => import("./components/Video/Video"));

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     width: "100%",
//     height: "100%",
//     padding: "0px",
//     background: "#D3A93D",
//   },
// };

function QuemSomos() {
  const locale = useSelector((state) => state.locales.locale);

  const [aboutUs, setAboutUs] = useState({});
  const [showPrinciples, setShowPrinciples] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // const [modal, setModalData] = useState({});
  // const [modalIsOpen, setIsOpenModal] = useState(false);

  // const sliderPartners = useRef(null);
  // const sliderPartnersMobile = useRef(null);

  // const handleFilterChange = (event, type) => {
  //   const filterValue = event.target.value;
  //   setFilter({ ...filter, [type]: filterValue });
  // };

  // function closeModal() {
  //   setIsOpenModal(false);
  // }

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

  useEffect(() => {
    api_about_us
      .page({ locale })
      .then((response) => setAboutUs(response.data.data.attributes))
      .catch(() => {
        setAboutUs({});
      });
  }, [locale]);

  useEffect(() => {
    // Time to wait first image
    setTimeout(() => {
      setShowPrinciples(true);
      setShowVideo(true);
    }, 500);
  }, [aboutUs]);

  return (
    <div className="QuemSomosContainer">
      <TopPage aboutUs={aboutUs} />
      <Suspense fallback={<div style={{ margin: "80px 20px" }} />}>
        {showPrinciples && (
          <Principles principlesTitle={aboutUs && aboutUs.principles} />
        )}
      </Suspense>
      <Suspense fallback={<div style={{ margin: "80px 20px" }} />}>
        {showVideo && <Video video={aboutUs && aboutUs.video} />}
      </Suspense>

      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className={"ModalQuemSomos"}>
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
      </Modal> */}
    </div>
  );
}

export default QuemSomos;
