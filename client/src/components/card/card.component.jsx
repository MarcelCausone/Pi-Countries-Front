import { Link } from "react-router-dom";
import "./card.styles.css";

function Card({ flagImage, name, continent, ID }) {
  // console.log(country);
  const cleanContinent = continent.slice(1, -1);

  return (
    <div className="card-container">
      <Link to={`/home/${ID}`}>
        <img src={flagImage} alt={name} />
        <h2>{name}</h2>
        <h2>{cleanContinent}</h2>
      </Link>
    </div>
  );
}

export default Card;
