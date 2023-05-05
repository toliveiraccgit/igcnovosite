import React from "react";
import "./BarChart.css";

const BarChart = ({ data }) => {
  const maxVal = Math.max(...data);

  return (
    <>
      <div className="desktop">
        <div className="bar-chart">
          {/* {data.map((value, index) => (
        <div
          key={index}
          className="bar"
          style={{ height: `${(value / maxVal) * 100}%` }}
        >
          <span className="value">{value}</span>
        </div>
      ))} */}

          <div className="bar" style={{ height: "1rem" }}>
            <span className="value">48</span>
          </div>
          <div className="bar" style={{ height: "3rem" }}>
            <span className="value">48</span>
          </div>
          <div className="bar" style={{ height: "6rem" }}>
            <span className="value">48</span>
          </div>
          <div className="bar" style={{ height: "9rem" }}>
            <span className="value">56</span>
          </div>
          <div className="bar" style={{ height: "13rem" }}>
            <span className="value">65</span>
          </div>
          <div className="bar" style={{ height: "17rem" }}>
            <span className="value">67</span>
          </div>
          <div className="bar" style={{ height: "22rem" }}>
            <span className="value">69</span>
          </div>
        </div>
      </div>

      <div className="mobile">
        <div className="bar-chart">
          <div className="bar" style={{ height: "6rem" }}>
            <span className="value">48</span>
          </div>
          <div className="bar" style={{ height: "9rem" }}>
            <span className="value">56</span>
          </div>
          <div className="bar" style={{ height: "12rem" }}>
            <span className="value">65</span>
          </div>
          <div className="bar" style={{ height: "16rem" }}>
            <span className="value">67</span>
          </div>
          <div className="bar" style={{ height: "19rem" }}>
            <span className="value">69</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BarChart;
