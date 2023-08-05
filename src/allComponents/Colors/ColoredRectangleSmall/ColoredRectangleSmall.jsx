import React from "react";
import PropTypes from "prop-types";
import "./ColoredRectangleSmall.scss";

const ColoredRectangleSmall = ({ backgroundColorClass }) => {
  return (
    <div className={`colored-rectangle-small ${backgroundColorClass}`}>
      <div className="content"></div>
    </div>
  );
};

ColoredRectangleSmall.propTypes = {
  backgroundColorClass: PropTypes.string.isRequired,
};

export default ColoredRectangleSmall;
