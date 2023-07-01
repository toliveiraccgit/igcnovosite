import React from "react";
import "./theNews.scss";

import { useNavigate } from "react-router-dom";

function theNews({ data, postDate }) {
  const navigate = new useNavigate();

  return (
    <div className="containerNews">
      <img
        className="newsImagem"
        src={`${
          data &&
          data.attributes &&
          data.attributes.banner &&
          data.attributes.banner.data.attributes.formats.small.url
        }`}
        alt=""
      />

      <h5>{postDate}</h5>

      <hr />

      <h1>{data.attributes.title}</h1>

      <a href={`/noticias/${data.id}`}>Ler conteúdo</a>
    </div>
  );
}

export default theNews;
