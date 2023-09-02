import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api_policies } from "../../api";
import "./PoliticasETermos.scss";

function PoliticasETermos() {
  const locale = useSelector((state) => state.locales.locale);

  const [policies, setPolicies] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    api_policies
      .page({ locale })
      .then((res) => {
        setPolicies(res.data.data.attributes);
        setSections(res.data.data.attributes.section);
      })
      .catch(() => {
        setPolicies({});
      });
  }, [locale]);

  return (
    <div className="PoliticaPrivacidadeContainer">
      <div className="topPage">
        <div className="theContainer">
          <p>{policies && policies.title}</p>
        </div>
      </div>

      <div className="FirstSectionContainer">
        <div className="theContainer">
          <h4 className="intro_title">{policies && policies.intro_title}</h4>

          <p style={{ whiteSpace: "pre-line" }}>
            {policies && policies.intro_content}
          </p>

          <ul>
            {sections &&
              sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
          </ul>

          <hr />

          <div id="scrollContainer">
            {sections &&
              sections.map((section) => (
                <div key={section.id} id={section.id}>
                  <h4>{section.title}</h4>
                  <p style={{ whiteSpace: "pre-line" }}>
                    {section.description}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PoliticasETermos;
