import Card from "../card/card.component";
import style from "./cards.module.css";
import { useSelector } from "react-redux";

const Cards = ({ nCountries }) => {
  const countryFound = useSelector((state) => state.countryFound);
  return (
    <div className={style.cardlist}>
      {nCountries &&
        nCountries.map((country) => {
          return (
            <Card
              ID={country.ID}
              key={country.ID} // Agrega una propiedad "key" única
              name={country.name}
              flagImage={country.flagImage}
              continent={country.continent}
            />
          );
        })}
 {!countryFound && (
 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
   <p style={{ color: 'red', fontSize: '20px' }}>País no encontrado</p>
 </div>
)}

    </div>
  );
};

export default Cards;
