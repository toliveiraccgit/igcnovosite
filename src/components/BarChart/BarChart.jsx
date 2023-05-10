import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { api_services } from "../../api";
import "./BarChart.css";

const BarChart = ({ data }) => {
  const locale = useSelector((state) => state.locales.locale);
  const [servicePage, setServicePage] = useState({});

  useEffect(() => {
    api_services
      .page({ locale })
      .then((res) => {
        setServicePage(
          res.data.data?.attributes && res.data.data?.attributes.chart
        );
      })
      .catch(() => {
        setServicePage({});
      });
  });

  return (
    <>
      <div className="desktop">
        <div className="bar-chart">
          <div className="bar" style={{ height: "1rem" }}>
            {Array.isArray(servicePage) &&
              servicePage
                .slice(6, 7)
                .map((service) => (
                  <span className="value">{service.value}</span>
                ))}
          </div>
          <div className="bar" style={{ height: "3rem" }}>
            {Array.isArray(servicePage) &&
              servicePage
                .slice(5, 6)
                .map((service) => (
                  <span className="value">{service.value}</span>
                ))}
          </div>
          <div className="bar" style={{ height: "6rem" }}>
            {Array.isArray(servicePage) &&
              servicePage
                .slice(4, 5)
                .map((service) => (
                  <span className="value">{service.value}</span>
                ))}
          </div>
          <div className="bar" style={{ height: "9rem" }}>
            {Array.isArray(servicePage) &&
              servicePage
                .slice(3, 4)
                .map((service) => (
                  <span className="value">{service.value}</span>
                ))}
          </div>
          <div className="bar" style={{ height: "13rem" }}>
            {Array.isArray(servicePage) &&
              servicePage
                .slice(2, 3)
                .map((service) => (
                  <span className="value">{service.value}</span>
                ))}
          </div>
          <div className="bar" style={{ height: "17rem" }}>
            {Array.isArray(servicePage) &&
              servicePage
                .slice(1, 2)
                .map((service) => (
                  <span className="value">{service.value}</span>
                ))}
          </div>
          <div className="bar" style={{ height: "22rem" }}>
            {Array.isArray(servicePage) &&
              servicePage
                .slice(0, 1)
                .map((service) => (
                  <span className="value">{service.value}</span>
                ))}
          </div>
        </div>
      </div>

      <div className="mobile">
        <div className="bar-chart">
          <div className="bar" style={{ height: "6rem" }}>
            {Array.isArray(servicePage) &&
              servicePage
                .slice(4, 5)
                .map((service) => (
                  <span className="value">{service.value}</span>
                ))}
          </div>
          <div className="bar" style={{ height: "9rem" }}>
            {Array.isArray(servicePage) &&
              servicePage
                .slice(3, 4)
                .map((service) => (
                  <span className="value">{service.value}</span>
                ))}
          </div>
          <div className="bar" style={{ height: "12rem" }}>
            {Array.isArray(servicePage) &&
              servicePage
                .slice(2, 3)
                .map((service) => (
                  <span className="value">{service.value}</span>
                ))}
          </div>
          <div className="bar" style={{ height: "16rem" }}>
            {Array.isArray(servicePage) &&
              servicePage
                .slice(1, 2)
                .map((service) => (
                  <span className="value">{service.value}</span>
                ))}
          </div>
          <div className="bar" style={{ height: "19rem" }}>
            {Array.isArray(servicePage) &&
              servicePage
                .slice(0, 1)
                .map((service) => (
                  <span className="value">{service.value}</span>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BarChart;
