import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import "./CookiesPopup.scss";
import cookieImg from "../../assets/fi-rr-cookie.svg";

function CookiesPopup() {
  const [cookies, setCookie] = useCookies(["cookiesAccepted"]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [previousPage, setPreviousPage] = useState(null);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      setPreviousPage(window.location.pathname);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleAcceptCookies = () => {
    setCookie("cookiesAccepted", true, { path: "/" });

    if (previousPage) {
      window.location.href = previousPage;
    } else {
      window.location.href = "/"; // Replace "/" with the default page URL
    }
  };

  const handleRejectCookies = () => {
    setShowOverlay(true);
    alert(
      "Você precisa aceitar os cookies para ter acesso à página, por favor aceite a política de cookies."
    );
  };

  return (
    <div className={`cookies-popup ${showOverlay ? "overlay" : ""}`}>
      <div className="cookies-popup-content">
        <img src={cookieImg} alt="cookieImg" />
        <p>
          Utilizamos cookies de terceiros para personalizar sua experiência no
          site
        </p>
        <div className="buttonArea">
          <button className="accept" onClick={handleAcceptCookies}>
            Aceitar
          </button>
          <button className="reject" onClick={handleRejectCookies}>
            Não aceitar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookiesPopup;
