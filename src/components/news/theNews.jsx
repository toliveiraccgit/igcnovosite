import React from "react";
import Calendar from "../../assets/icon-calendario.png";
import "./theNews.scss";

import { useNavigate } from "react-router-dom";
import config from "../../config/env";

function theNews({ data, postDate }) {
  const navigate = new useNavigate();
  return (
    <div
      className="containerNews"
      onClick={() => navigate(`/noticias/${data.id}`)}
    >
      <img
        className="newsImagem"
        src={`${config.api.BASE}${
          data &&
          data.attributes &&
          data.attributes.banner &&
          data.attributes.banner.data.attributes.formats.small.url
        }`}
        alt=""
      />
      <div className="rightContainer">
        <p className="date">
          <img src={Calendar} alt="" />
          {postDate}
        </p>
        <h3>{data.attributes.title}</h3>
        <p className="description">
          <div
            className="short"
            dangerouslySetInnerHTML={{ __html: data.attributes.description }}
          ></div>
          <a href={`/noticias/${data.id}`}>continuar lendo</a>
        </p>
      </div>
    </div>
  );
}

export default theNews;
