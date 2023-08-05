// React
import React, { useEffect, useRef, useState } from "react";

// APIs
import { useSelector } from "react-redux";
import {
  api_about_us,
  api_unique,
  api_group,
  api_partners,
  api_principles,
} from "../../api";

// Components
import Partner from "../../components/Partner/Partner";

// Assets
import "./somosUnicos.scss";
import arrowLeft from "../../assets/slider/arrowLeft.svg";
import arrowRight from "../../assets/slider/arrowRight.svg";
import IconPartnership from "../../assets/partnership.png";
import GlobalMap from "../../assets/globalMap.svg";

// Slicker
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function somosUnicos() {
  const locale = useSelector((state) => state.locales.locale);

  const [aboutUs, setAboutUs] = useState({});
  const [unique, setUnique] = useState({});
  const [partners, setPartners] = useState([]);
  const [principles, setPrinciples] = useState([]);
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState(0);
  const [filter, setFilter] = useState({});

  const sliderPartners = useRef(null);
  const sliderPrinciplesContainers = useRef(null);
  const sliderPartnersMobile = useRef(null);

  const handleFilterChange = (event, type) => {
    const filterValue = event.target.value;
    setFilter({ ...filter, [type]: filterValue });
  };

  const handlePrevClick = () => {
    sliderPartners.current.slickPrev();
  };

  const handleNextClick = () => {
    sliderPartners.current.slickNext();
  };

  const sliderPartnerMobile = {
    dots: true,
    className: "center",
    centerMode: true,
    infinite: false,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    variableWidth: true,
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

    api_unique
      .page({ locale })
      .then((response) => {
        setUnique(response.data.data.attributes);
        console.log("Unique:", response.data.data.attributes);
      })
      .catch(() => {
        setUnique({});
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
    <div className="SomosUnicos">
      <div className="topPage">
        <div className="theContainer">
          <p>{unique && unique.title}</p>
        </div>
      </div>

      <div className="FirstSectionContainer">
        <div className="theContainer">
          <div className="right">
            <h4>{unique && unique.label}</h4>
            <p
              dangerouslySetInnerHTML={{
                __html: unique && unique.description,
              }}
            ></p>
          </div>
          <div className="left">
            {unique?.media?.data && (
              <img
                src={`${
                  unique &&
                  unique.media &&
                  unique.media.data &&
                  unique.media.data.attributes &&
                  unique.media.data.attributes.url
                }`}
                alt=""
              />
            )}
          </div>
        </div>
      </div>

      <div className="partnersContainer">
        <div className="theContainer">
          <>
            <div className="top">
              <div className="left">
                <div className="textArea">
                  <h4>
                    {unique &&
                      unique.partners &&
                      String(unique.partners.title).replace(
                        "{partners_count}",
                        partners.length
                      )}
                  </h4>
                  <p>{unique?.partners?.description}</p>
                </div>
                <div className="filters">
                  <select
                    name=""
                    id=""
                    onChange={(e) => {
                      handleFilterChange(e, "group");
                      setGroup(Number(e.target.value));
                    }}
                  >
                    <option value="">Todos</option>
                    {groups &&
                      groups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.attributes.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {partners &&
              partners.filter((partner) => {
                if (!filter.group) {
                  return true;
                }
                return (
                  partner &&
                  partner.attributes &&
                  partner.attributes.grupo &&
                  partner.attributes.grupo.data &&
                  partner.attributes.grupo.data.id === group
                );
              }).length >= 5 ? (
                <div className="slicks">
                  <button onClick={handlePrevClick}>
                    <img src={arrowLeft} alt="" />
                  </button>
                  <button onClick={handleNextClick}>
                    <img src={arrowRight} alt="" />
                  </button>
                </div>
              ) : (
                <div className="slicks"></div>
              )}
            </div>

            <div className="partner-container">
              {partners &&
                partners
                  .filter((partner) => {
                    if (!filter.group) {
                      return true;
                    }
                    return (
                      partner &&
                      partner.attributes &&
                      partner.attributes.grupo &&
                      partner.attributes.grupo.data &&
                      partner.attributes.grupo.data.id === group
                    );
                  })
                  .map((partner) => (
                    <Partner key={partner.id} partner={partner} />
                  ))}
            </div>
          </>

          <div className="slider-mobile">
            {partners &&
            partners.filter((partner) => {
              if (!filter.group) {
                return true;
              }
              return (
                partner &&
                partner.attributes &&
                partner.attributes.grupo &&
                partner.attributes.grupo.data &&
                partner.attributes.grupo.data.id === group
              );
            }).length >= 5 ? (
              <Slider ref={sliderPartnersMobile} {...sliderPartnerMobile}>
                {partners &&
                  partners
                    .filter((partner) => {
                      if (!filter.group) {
                        return true;
                      }
                      return (
                        partner &&
                        partner.attributes &&
                        partner.attributes.grupo &&
                        partner.attributes.grupo.data &&
                        partner.attributes.grupo.data.id === group
                      );
                    })
                    .map((partner) => (
                      <Partner key={partner.id} partner={partner} />
                    ))}
              </Slider>
            ) : (
              <div className="noSlider">
                {partners &&
                  partners
                    .filter((partner) => {
                      if (!filter.group) {
                        return true;
                      }
                      return (
                        partner &&
                        partner.attributes &&
                        partner.attributes.grupo &&
                        partner.attributes.grupo.data &&
                        partner.attributes.grupo.data.id === group
                      );
                    })
                    .map((partner) => (
                      <Partner key={partner.id} partner={partner} />
                    ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="EspecialistContainer">
        <div className="theContainer">
          <div className="left">
            <img
              src={
                unique &&
                unique.icon &&
                unique.icon.data &&
                unique.icon.data.attributes &&
                unique.icon.data.attributes.url
              }
              alt="icon"
            />
          </div>
          <div className="right">
            <h2 className="title">{unique && unique.highlight}</h2>
            <p className="text">{unique && unique.highlight_description}</p>
          </div>
        </div>
      </div>

      <div className="GlobalContainer">
        <div className="theContainer">
          <div className="top">
            <h4>{unique && unique.global_title}</h4>
            <p
              dangerouslySetInnerHTML={{
                __html: unique && unique.global_description,
              }}
            ></p>
          </div>
          <div className="bottom">
            <div className="column">
              <h4 className="yellow">{unique && unique.global_num1}</h4>
              <p>{unique && unique.global_num1_description}</p>
            </div>
            <div className="column">
              <h4 className="yellow">{unique && unique.global_num2}</h4>
              <p>{unique && unique.global_num2_description}</p>
            </div>
            <div className="column">
              <h4 className="yellow">{unique && unique.global_num3}</h4>
              <p>{unique && unique.global_num3_description}</p>
            </div>
          </div>
          <div className="ImageArea">
            <div className="theContainer">
              <img src={GlobalMap} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
