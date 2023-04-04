import "./CardWhite.scss";

function cardWhite({ title, description }) {
  return (
    <div className="CardWhitecontainer">
      <div className="inside">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default cardWhite;
