import React from "react";
import "./Button.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = ({
  buttonType,
  text,
  size,
  background,
  disabled,
  link,
  onClick,
}) => {
  const padding =
    buttonType === "Arrow" && size === "Small"
      ? "8px 8px"
      : buttonType === "Arrow" && size === "Medium"
      ? "12px 12px"
      : buttonType === "Arrow" && size === "Large"
      ? "16px 16px"
      : "";

  const additionalStyles = {
    padding: padding,
    opacity: disabled ? 0.2 : 1,
  };

  const getArrowIcon = () => {
    if (
      background === "BackgroundBlue" ||
      background === "BackgroundBlueHover" ||
      background === "BackgroundBlueFocus"
    ) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.5805 11.0058L12.2904 6.71885C11.8904 6.31915 11.8904 5.68961 12.2894 5.2999C12.6794 4.9002 13.3094 4.9002 13.7094 5.2989L19.7094 11.2945C19.9603 11.5388 20.0498 11.8907 19.9778 12.2144C19.9264 12.453 19.789 12.6607 19.6 12.8032L13.6995 18.6992C13.5095 18.8791 13.2495 18.989 12.9895 18.989L12.9995 19C12.7295 19 12.4695 18.8901 12.2895 18.7102C11.8895 18.3205 11.8895 17.681 12.2795 17.2913V17.2813L16.5596 13.0043H5C4.44 13.0043 4 12.5547 4 12.0051C4 11.4455 4.44 11.0058 5 11.0058H16.5805Z"
            fill="white"
          />
        </svg>
      );
    } else if (
      background === "BackgroundWhite" ||
      background === "BackgroundWhiteHover" ||
      background === "BackgroundWhiteFocus"
    ) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.5805 11.0058L12.2904 6.71885C11.8904 6.31915 11.8904 5.68961 12.2894 5.2999C12.6794 4.9002 13.3094 4.9002 13.7094 5.2989L19.7094 11.2945C19.9603 11.5388 20.0498 11.8907 19.9778 12.2144C19.9264 12.453 19.789 12.6607 19.6 12.8032L13.6995 18.6992C13.5095 18.8791 13.2495 18.989 12.9895 18.989L12.9995 19C12.7295 19 12.4695 18.8901 12.2895 18.7102C11.8895 18.3205 11.8895 17.681 12.2795 17.2913V17.2813L16.5596 13.0043H5C4.44 13.0043 4 12.5547 4 12.0051C4 11.4455 4.44 11.0058 5 11.0058H16.5805Z"
            fill="#222F43"
          />
        </svg>
      );
    }
  };

  return (
    <Link to={link}>
      <button
        className={`Button ${size} ${background} ${disabled ? "disabled" : ""}`}
        disabled={disabled}
        style={additionalStyles}
        onClick={onClick}
      >
        {buttonType === "Text" && text}
        {buttonType === "Arrow" && getArrowIcon()}
      </button>
    </Link>
  );
};

Button.propTypes = {
  buttonType: PropTypes.oneOf(["Text", "Arrow"]).isRequired,
  text: PropTypes.string,
  size: PropTypes.oneOf(["Small", "Medium", "Large"]),
  background: PropTypes.oneOf(["BackgroundBlue", "BackgroundWhite"]),
  disabled: PropTypes.bool,
  link: PropTypes.string,
};

Button.defaultProps = {
  size: "Medium",
  background: "BackgroundBlue",
  disabled: false,
};

export default Button;
