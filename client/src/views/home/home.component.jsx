import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getCountries,
  getCountriesByName,
  filterByContinent,
  reset,
  sort,
  addActivityToCountry,
  filterByActivity,
} from "../../redux/actions";

import Navbar from "../../components/navbar/navbar.component";
import Cards from "../../components/cards/cards.component";
import "./home.styles.css";
import Pagination from "../../components/Pagination/Pagination.component";

const Home = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);

  //traigo todos los paises
  useEffect(() => {
    dispatch(getCountries());
    // return(()=>{
    //   clearDetail()
    // })
  }, [dispatch]);

  //Filtro con el back

  const [searchString, setSearchString] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setSearchString(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getCountriesByName(searchString));
  };

  //paginado

  const [dataQt, setDataQt] = useState(10); //10 paises x pagina
  const [currentPage, setCurrentPage] = useState(1); // pagina actual = 1

  const indexFin = currentPage * dataQt; // ultimo pais de mi pagina es por ejemplo pagina 10*10 paises = pais 100
  const indexIn = indexFin - dataQt; // primer pais de mi pagina es el pais final - la canitdad de paises por pagina

  const nCountries = allCountries.slice(indexIn, indexFin); // recorto mis allCountries
  const nPages = Math.ceil(allCountries.length / dataQt); // numero de paginas en total es cantidad de paises divido a paises por pagina que quiero mostrar

  //filtros
  function filterHandler(event) {
    dispatch(filterByContinent(event.target.value));
  }

  //ordenamiento
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

  function filterByActivityHandler(event) {
    const selectedActivity = event.target.value;
    dispatch(filterByActivity(selectedActivity));
  }

  //reset
  function resetHandler() {
    dispatch(reset());
  }

  return (
    <div className="home-container">
      <h2 className="home-title"></h2>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      <div className="filters">
        <div className="sort-filter">
          <select onChange={sortHandler}>
            <option value="nameAsc">Nombre (Ascendente)</option>
            <option value="nameDesc">Nombre (Descendente)</option>
            <option value="populationAsc">Población (Ascendente)</option>
            <option value="populationDesc">Población (Descendente)</option>
          </select>
          <button className="reset-button" onClick={resetHandler}>
            RESET
          </button>
        </div>
        <div className="continent-filter">
          <select placeholder="Continent" onChange={filterHandler}>
            {[
              "{Africa}",
              "{Europe}",
              "{Oceania}",
              "{Asia}",
              '{"South America"}',
              '{"North America"}',
              "{Antarctica}",
            ].map((continent) => (
              <option key={continent} value={continent}>
                {continent}
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
