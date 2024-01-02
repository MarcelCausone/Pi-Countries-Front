import { Link } from "react-router-dom";
import  style from"./card.module.css";

function Card({ flagImage, name, continent, ID }) {

  return (
    <div className={style.cardcontainer}>
      <Link to={`/home/${ID}`}>
        <img src={flagImage} alt={name} />
        <div className={style.cardText}>
        <h2>{name}</h2>
        <h3>{continent}</h3>
        </div>
        
      </Link>
    </div>
  );
}

export default Card;
