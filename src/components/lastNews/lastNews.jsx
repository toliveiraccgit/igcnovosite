import React from "react";
import "./lastNews.scss";

function lastNews({ number, link, title }) {
  return (
    <>
      <div className="news">
        <div className="number">{number}</div>
        <a className="LinkNew" href={link ? link : "/"}>
          <p>{title}</p>
        </a>
      </div>
    </>
  );
}

export default lastNews;
