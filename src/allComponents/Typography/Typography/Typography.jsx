import React from "react";
import "./Typography.scss";

const Typography = ({ text, FontStyle }) => {
  return <h1 className={`${FontStyle}`}>{text}</h1>;
};

export default Typography;
