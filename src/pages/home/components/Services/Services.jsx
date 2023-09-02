import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Services.scss";
import { api_services_home } from "../../../../api";
import { useSelector } from "react-redux";
import rightArrow from "../../../../assets/homeBanners/arrowRight.png";

function Services({ servicesTitle }) {
  const locale = useSelector((state) => state.locales.locale);
  const [services, setServices] = useState([]);

  useEffect(() => {
    api_services_home.get({ locale }).then((res) => {
      const limitData = res.data.data.slice(0, 3);
      setServices(limitData);
    });
  }, []);

  return (
    <div className="servicesContainer">
      <div className="theContainer">
        <div className="top">
          <h4>{servicesTitle}</h4>
        </div>
        <div className="bottom">
          {services.map((service, index) => (
            <div
              key={index}
              className={
                index === 0
                  ? "lineOne"
                  : index === 1
                  ? "lineSecond"
                  : "lineThrd"
              }
            >
              {index !== 1 && (
                <img
                  className="banner"
                  src={service.attributes.image.data.attributes.url}
                  alt=""
                />
              )}
              <div className={index === 1 ? "left" : "right"}>
                <h4 className="title">{service.attributes.name}</h4>
                <p className="paragraph">{service.attributes.description}</p>
                <Link to={service.attributes.button.link}>
                  {service.attributes.button.label}{" "}
                  <img src={rightArrow} alt="" />{" "}
                </Link>
              </div>
              {index === 1 && (
                <img
                  className="banner"
                  src={service.attributes.image.data.attributes.url}
                  alt=""
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
