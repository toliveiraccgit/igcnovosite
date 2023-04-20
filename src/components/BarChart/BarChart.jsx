import React from "react";
import "./BarChart.css"; // import your CSS file for the component

const BarChart = ({ data }) => {
  const maxVal = Math.max(...data); // find the maximum value in the data

  return (
    <div className="bar-chart">
      {/* <h4>igc partners</h4> */}
      {data.map((value, index) => (
        <div
          key={index}
          className="bar"
          style={{ height: `${(value / maxVal) * 100}%` }}
        >
          <span className="value">{value}</span>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
