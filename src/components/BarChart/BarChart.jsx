import React from "react";
import "./BarChart.css";

const BarChart = ({ data }) => {
  const maxVal = Math.max(...data);

  return (
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
      <div className="bar" style={{ height: "20rem" }}>
        <span className="value">69</span>
      </div>
    </div>
  );
};

export default BarChart;
