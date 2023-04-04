import React from "react";
import { Link } from "react-router-dom";
import rightArrow from "../../assets/services/rightarrow.svg";
import homeBanner from "../../assets/homeBanner.png";

import "./BannerHome.scss";

import { useSelector, useDispatch } from "react-redux";
import APIHome from "./../../api/home";
import { useEffect, useState } from "react";

function BannerHome({ title, image, label, link }) {
  return (
    <div className="bannerContainerr">
      <img src={image} alt="" />
      <div className="theContainer">
        <h1>{title}</h1>
        {label && (
          <Link to={link}>
            {label} <img src={rightArrow} alt="" />{" "}
          </Link>
        )}
      </div>
    </div>
  );
}

export default BannerHome;
