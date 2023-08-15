import React from "react";
import PropTypes from "prop-types";
import "./InputField.scss";

const InputField = ({
  type,
  label,
  toUse,
  placeholder,
  disabled,
  value,
  onChange,
  error,
  errorMessage,
}) => {
  const isDefaultType = type === "Default";
  const isDefaultUse = toUse === "Text";

  return (
    <div className={`InputField ${disabled ? "disabled" : ""}`}>
      <label
        className="InputLabel"
        htmlFor={isDefaultType ? "inputArea" : "textArea"}
      >
        {label}
      </label>
      {isDefaultType ? (
        isDefaultUse ? (
          <>
            <input
              type={type}
              id="inputArea"
              toUse={toUse}
              placeholder={placeholder}
              disabled={disabled}
              className={`InputText ${error ? "error" : ""}`}
              value={value}
              onChange={onChange}
            />
            <div className="ErrorMessage">{error && errorMessage}</div>
          </>
        ) : (
          <>
            <input
              type={type}
              id="inputArea"
              toUse={toUse}
              placeholder={placeholder}
              className={`InputEmail ${error ? "error" : ""}`}
              disabled={disabled}
              value={value}
              onChange={onChange}
            />
            <div className="ErrorMessage">{error && errorMessage}</div>
          </>
        )
      ) : (
        <>
          <textarea
            type={type}
            id="textArea"
            placeholder={placeholder}
            className={`InputTextArea ${error ? "error" : ""}`}
            disabled={disabled}
            value={value}
            onChange={onChange}
          />
          <div className="ErrorMessage">{error && errorMessage}</div>
        </>
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
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default InputField;
