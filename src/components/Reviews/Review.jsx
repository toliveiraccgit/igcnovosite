import React from "react";
import aspas from "../../assets/aspas.png";
import "./Review.scss";

// import { Container } from './styles';

function Reviews({ name, company, testimony }) {
  return (
    <div className="commentContainer">
      <div className="image">
        <img src={aspas} alt="" />
      </div>
      <div className="comments">
        <p className="comment">{testimony}</p>
        <p className="person">{name}</p>
        <p className="brand">{company}</p>
      </div>
    </div>
  );
}

export default Reviews;
