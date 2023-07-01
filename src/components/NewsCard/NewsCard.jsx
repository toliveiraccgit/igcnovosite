import React from "react";
import "./NewsCard.scss";

import config from "../../config/env";

function NewsCard({ data, id }) {
  return (
    <div className="newsCardContainer">
      <h4>{data.title}</h4>
      <p
        className="short"
        dangerouslySetInnerHTML={{ __html: data.description }}></p>
      <a href={`/noticias/${id}`}>Continuar lendo</a>
    </div>
  );
}

export default NewsCard;
