import "./cardCase.scss";

function cardCase({ image }) {
  return (
    <div className="cardCase-container">
      <img src={image} alt="" />
    </div>
  );
}

export default cardCase;
