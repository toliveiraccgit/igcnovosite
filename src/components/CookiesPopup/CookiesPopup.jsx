import React, { useState } from "react";
import { useCookies } from "react-cookie";
import "./CookiesPopup.scss";
import cookieImg from "../../assets/fi-rr-cookie.svg";
// import { api_cookie } from "../../api";

function CookiesPopup() {
  const [cookies, setCookie] = useCookies(["cookiesAccepted"]);
  // const [cookie, setCookies] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);

  const hostname = window.location.origin;
  const isEnglishDefault = hostname.includes("igc-partners");

  const handleAcceptCookies = () => {
    setCookie("cookiesAccepted", true, { path: "/" });
    setShowOverlay(false);
  };

  const handleRejectCookies = () => {
    const messageAlert = isEnglishDefault
      ? "You need to accept cookies to access the page, please accept the cookie policy."
      : "Você precisa aceitar os cookies para ter acesso à página, por favor aceite a política de cookies.";
    alert(messageAlert);
  };

  // useEffect(() => {
  //   api_cookie
  //     .page()
  //     .then((response) => {
  //       setCookies(response.data.data);
  //       console.log(response.data.data);
  //     })
  //     .catch(() => {
  //       setCookies([]);
  //     });
  // }, []);

  return (
    <div className={`cookies-popup ${showOverlay ? "overlay" : ""}`}>
      <div className="cookies-popup-content">
        <img src={cookieImg} alt="cookieImg" />
        <p>
          {isEnglishDefault
            ? "We use third-party cookies to personalize your experience on the website"
            : "Utilizamos cookies de terceiros para personalizar sua experiência no site"}
        </p>
        <div className="buttonArea">
          <button className="accept" onClick={handleAcceptCookies}>
            {isEnglishDefault ? "Accept" : "Aceitar"}
          </button>
          <button className="reject" onClick={handleRejectCookies}>
            {isEnglishDefault ? "Don't accept" : "Não aceitar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookiesPopup;
