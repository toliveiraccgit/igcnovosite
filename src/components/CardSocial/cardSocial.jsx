import "./cardSocial.scss";

function cardCase({ image }) {
  return (
    <div className="cardSocial-container">
      <img className="CardSocialImg" src={image} alt="" />
    </div>
  );
}

export default cardCase;
