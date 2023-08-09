import React from "react";
import PropTypes from "prop-types";
import "./InputField.scss";

const InputField = ({ type, label, toUse, placeholder, disabled }) => {
  const isDefaultType = type === "Default";
  const isDefaultUse = toUse === "Text";

  return (
    <div className={`InputField ${disabled ? "disabled" : ""} `}>
      <label className="InputLabel" htmlFor="inputArea">
        {label}
      </label>
      {isDefaultType ? (
        isDefaultUse ? (
          <input
            type={type}
            id="inputArea"
            toUse={toUse}
            placeholder={placeholder}
            className="InputText"
            disabled={disabled}
          />
        ) : (
          <input
            type={type}
            id="inputArea"
            toUse={toUse}
            placeholder={placeholder}
            className="InputEmail"
            disabled={disabled}
          />
        )
      ) : (
        <textarea
          type={type}
          id="textArea"
          placeholder={placeholder}
          className="InputTextArea"
          disabled={disabled}
        />
      )}
    </div>
  );
};

InputField.propTypes = {
  type: PropTypes.oneOf(["Default", "TextArea"]).isRequired,
  label: PropTypes.string.isRequired,
  toUse: PropTypes.oneOf(["Text", "Email"]).isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default InputField;
