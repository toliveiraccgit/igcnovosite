import React from "react";
import PropTypes from "prop-types";
import "./InputField.scss";

const InputField = ({ type, label, toUse, placeholder }) => {
  const isDefaultType = type === "Default";
  const isDefaultUse = toUse === "Text";

  return (
    <div className="InputField">
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
          />
        ) : (
          <input
            type={type}
            id="inputArea"
            toUse={toUse}
            placeholder={placeholder}
            className="InputEmail"
          />
        )
      ) : (
        <input
          type={type}
          id="inputArea"
          toUse={toUse}
          placeholder={placeholder}
          className="InputTextArea"
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
};

export default InputField;
