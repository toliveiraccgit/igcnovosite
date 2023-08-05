import React from "react";
import PropTypes from "prop-types";
import "./ColoredRectangle.scss";

const ColoredRectangle = ({ backgroundColorClass, text, label }) => {
  return (
    <div className={`colored-rectangle ${backgroundColorClass}`}>
      <div className="content">
        <p className="text">{text}</p>
        <label className="label">{label}</label>
      </div>
    </div>
  );
};

ColoredRectangle.propTypes = {
  backgroundColorClass: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default ColoredRectangle;
