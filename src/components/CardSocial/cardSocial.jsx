import "./cardSocial.scss";

import config from "../../config/env";

function cardCase({ image }) {
  return (
    <div className="cardSocial-container">
      <img
        className="CardSocialImg"
        src={`${config.api.BASE}${image}`}
        alt=""
      />
    </div>
  );
}

export default cardCase;
