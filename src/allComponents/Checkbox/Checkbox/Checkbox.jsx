import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Checkbox.scss";

const Checkbox = ({ checked, onChange, format, disabled }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = () => {
    if (!disabled) {
      const newCheckedValue = !isChecked;
      setIsChecked(newCheckedValue);

      if (onChange) {
        onChange(newCheckedValue);
      }
    }
  };

  return (
    <label
      className={`Checkbox ${format} ${isChecked ? "checked" : ""} ${
        disabled ? "disabled" : ""
      }`}
      style={disabled ? { pointerEvents: "none" } : {}}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="CheckboxInput"
        disabled={disabled}
      />
      <span className="CheckboxCustom"></span>
    </label>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  format: PropTypes.oneOf(["square", "circle"]),
  disabled: PropTypes.bool,
};

export default Checkbox;
