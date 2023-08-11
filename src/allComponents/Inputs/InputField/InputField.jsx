import React, { useState } from "react";
import PropTypes from "prop-types";
import "./InputField.scss";

const InputField = ({ type, label, toUse, placeholder, disabled, error }) => {
  const isDefaultType = type === "Default";
  const isDefaultUse = toUse === "Text";

  const [hasError, setHasError] = useState(false); // State to track error
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    let inputFieldValue = "";

    if (isDefaultType) {
      inputFieldValue = document.getElementById("inputArea").value.trim();
    } else {
      inputFieldValue = document.getElementById("textArea").value.trim();
    }

    if (inputFieldValue === "") {
      setHasError(true);
      setErrorMessage("This is a hint text to help user.");
    } else {
      setHasError(false);
      setErrorMessage("");
      // Perform form submission logic here
    }
  };

  return (
    <div className={`InputField ${disabled ? "disabled" : ""}`}>
      <form onSubmit={handleSubmit}>
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
                className={`InputText ${hasError ? "error" : ""}`}
              />
              <div className="ErrorMessage">{errorMessage}</div>
            </>
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
        <button type="submit">Submit</button>
      </form>
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
