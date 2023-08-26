import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api_unique } from "../../../../api";
import "./GlobalAtuation.scss";

function GlobalAtuation() {
  const locale = useSelector((state) => state.locales.locale);

  const [content, setContent] = useState({});

  useEffect(() => {
    api_unique
      .getGlobalAtuation({ locale })
      .then((response) => {
        setContent(response.data.data.attributes);
      })
      .catch(() => {
        setContent({});
      });
  }, [locale]);

  return (
    <div className="GlobalContainer">
      <div className="theContainer">
        <div className="top">
          <h4>{content && content.global_title}</h4>
          <p
            dangerouslySetInnerHTML={{
              __html: content && content.global_description,
            }}></p>
        </div>
        <div className="bottom">
          <div className="column">
            <h4 className="yellow">{content && content.global_num1}</h4>
            <p>{content && content.global_num1_description}</p>
          </div>
          <div className="column">
            <h4 className="yellow">{content && content.global_num2}</h4>
            <p>{content && content.global_num2_description}</p>
          </div>
          <div className="column">
            <h4 className="yellow">{content && content.global_num3}</h4>
            <p>{content && content.global_num3_description}</p>
          </div>
        </div>
        <div className="ImageArea">
          <div className="theContainer">
            <img src={content && content.global_map} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlobalAtuation;
