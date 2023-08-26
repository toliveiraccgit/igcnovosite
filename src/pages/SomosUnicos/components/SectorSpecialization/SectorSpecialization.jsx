import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api_unique } from "../../../../api";
import "./SectorSpecialization.scss";

function SectorSpecialization() {
  const locale = useSelector((state) => state.locales.locale);

  const [highlight, setHighlight] = useState("");
  const [highlightDescription, setHighlightDescription] = useState("");
  const [specializationIcon, setSpecializationIcon] = useState({});

  useEffect(() => {
    api_unique
      .getSpecialization({ locale })
      .then((response) => {
        setHighlight(response.data.data.attributes.highlight);
        setHighlightDescription(
          response.data.data.attributes.highlight_description
        );
        setSpecializationIcon(response.data.data.attributes.icon);
      })
      .catch(() => {
        setUnique({});
      });
  }, [locale]);

  return (
    <div className="EspecialistContainer">
      <div className="theContainer">
        <div className="left">
          <img
            src={
              specializationIcon &&
              specializationIcon.data &&
              specializationIcon.data.attributes &&
              specializationIcon.data.attributes.url
            }
            alt="icon"
          />
        </div>
        <div className="right">
          <h2 className="title">{highlight}</h2>
          <p className="text">{highlightDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default SectorSpecialization;
