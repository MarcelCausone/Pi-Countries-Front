import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getCountries,
  getCountriesByName,
  filterByContinent,
  reset,
  sort,
  getActivities,
  filterByActivity,
  cleanDetail,
} from "../../redux/actions";

import Navbar from "../../components/navbar/navbar.component";
import Cards from "../../components/cards/cards.component";
import "./home.styles.css";
import Pagination from "../../components/Pagination/Pagination.component";

const Home = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);
  const activities = useSelector((state) => state.activities);

  //traigo todos los paises Y actividades
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, []);


  //--------------------------------------------------------------------------

  //FILTRO CON EL BACK (navBar)

  const [searchString, setSearchString] = useState("");

  const handleChange = (event) => {
    setSearchString(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getCountriesByName(searchString));
  };
  //-------------------------------------------------------------------------

  //PAGINADO

  const [dataQt, setDataQt] = useState(10); //10 paises x pagina
  const [currentPage, setCurrentPage] = useState(1); // pagina actual = 1

  const indexFin = currentPage * dataQt; // ultimo pais de mi pagina es por ejemplo pagina 10*10 paises = pais 100
  const indexIn = indexFin - dataQt; // primer pais de mi pagina es el pais final - la canitdad de paises por pagina

  const nCountries = allCountries.slice(indexIn, indexFin); // recorto mis allCountries
  const nPages = Math.ceil(allCountries.length / dataQt); // numero de paginas en total es cantidad de paises divido a paises por pagina que quiero mostrar
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //FILTRO CONTINENTE
  function filterHandler(event) {
    dispatch(filterByContinent(event.target.value));
  }
  //-----------------------------------------------------------------------
  //FILTRO ACTIVIDADES
  // Convierte el array de actividades en un conjunto (Set) para eliminar duplicados
  //new Set(...) se utiliza para crear un conjunto a partir de este nuevo array.
  //Un conjunto es una estructura de datos en JavaScript que no permite duplicados,
  // por lo que cualquier actividad duplicada se eliminará automáticamente.
  const uniqueActivities = new Set(
    activities.map((activity) => activity.nombre)
  );
  //console.log(uniqueActivities) Set(2) {'caminata por el desierto ', 'sonrquel'}
  // Convierte el conjunto nuevamente en un array para usarlo en el filtro
  //Array.from(...) se utiliza para convertir el conjunto uniqueActivities
  //nuevamente en un array. A pesar de que se eliminaron duplicados en
  // uniqueActivities, se convierte en un array nuevamente para que sea más
  //fácil de usar en el filtro.

  const activityList = Array.from(uniqueActivities);
  //console.log(activityList)  ['caminata por el desierto ', 'sonrquel']

  function filterByActivityHandler(event) {
    dispatch(filterByActivity(event.target.value));
  }
  //-------------------------------------------------------------------------
  //ORDENAMIENTO
  function sortHandler(event) {
    const selectedOption = event.target.value;
    if (selectedOption === "nameAsc") {
      dispatch(sort("Ascendente", "name"));
    } else if (selectedOption === "nameDesc") {
      dispatch(sort("Descendente", "name"));
    } else if (selectedOption === "populationAsc") {
      dispatch(sort("Ascendente", "population"));
    } else if (selectedOption === "populationDesc") {
      dispatch(sort("Descendente", "population"));
    }
  }

  //------------------------------------------------------------------------------

  //reset
  function resetHandler() {
    dispatch(reset());
  }
  //------------------------------------------------------------------------------

  return (
    <div className="home-container">
      <h2 className="home-title"></h2>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />

      <div className="filters">
        <div className="sort-filter">
        <select onChange={sortHandler}>
 <option value="" disabled selected>Ordenamiento</option>
 <option value="nameAsc">Nombre ↑</option>
 <option value="nameDesc">Nombre ↓</option>
 <option value="populationAsc">Población ↑</option>
 <option value="populationDesc">Población ↓</option>
</select>
          <button className="reset-button" onClick={resetHandler}>
            RESET
          </button>
        </div>

        <div className="continent-filter">
          <select placeholder="Continent" onChange={filterHandler}>
          <option value="" disabled selected>Continentes</option>
            {[
              "Africa",
              "Europe",
              "Oceania",
              "Asia",
              'South America',
              'North America',
              "Antarctica",
            ].map((continent) => (
              <option key={continent} value={continent}>
                {continent}
              </option>
            ))}
          </select>
        </div>
        <div className="activity-filter">
          <select onChange={filterByActivityHandler}>
          <option value="" disabled selected>Actividades</option>
            {activityList.map((activity) => (
              <option key={activity} value={activity}>
                {activity}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Cards nCountries={nCountries} />
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        nPages={nPages}
      />
    </div>
  );
};
export default Home;
