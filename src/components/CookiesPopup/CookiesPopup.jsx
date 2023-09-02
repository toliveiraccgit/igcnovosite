import React, { useState } from "react";
import { useCookies } from "react-cookie";
import "./CookiesPopup.scss";
import cookieImg from "../../assets/fi-rr-cookie.svg";

function CookiesPopup() {
  const [cookies, setCookie] = useCookies(["cookiesAccepted"]);
  const [showOverlay, setShowOverlay] = useState(false);

  const hostname = window.location.origin;
  const isEnglishDefault = hostname.includes("igc-partners");

  const handleAcceptCookies = () => {
    setCookie("cookiesAccepted", true, { path: "/" });
    setShowOverlay(false);
  };

  return (
    <div className={`cookies-popup ${showOverlay ? "overlay" : ""}`}>
      <div className="cookies-popup-content">
        <p>
          {isEnglishDefault
            ? "We use third-party cookies to personalize your experience on the website"
            : "Utilizamos cookies de terceiros para personalizar sua experiência no site"}
        </p>
        <div className="buttonArea">
          <button className="accept" onClick={handleAcceptCookies}>
            {isEnglishDefault ? "Accept" : "Aceitar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookiesPopup;
