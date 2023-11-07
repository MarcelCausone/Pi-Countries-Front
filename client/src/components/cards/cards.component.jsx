import Card from "../card/card.component";
import "./cards.styles.css";

const Cards = ({ nCountries }) => {
  return (
    <div className="card-list">
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
    </div>
  );
};

export default Cards;
