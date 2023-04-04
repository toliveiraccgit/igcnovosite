import "./cardCase.scss";

import config from "../../config/env";

function cardCase({ image }) {
  return (
    <div className="cardCase-container">
      <img src={`${config.api.BASE}${image}`} alt="" />
    </div>
  );
}

export default cardCase;
