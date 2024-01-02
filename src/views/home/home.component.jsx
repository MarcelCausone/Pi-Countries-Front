import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getCountries,
  getCountriesByName,
  getActivities,
} from "../../redux/actions";

import Navbar from "../../components/navbar/navbar.component";
import Cards from "../../components/cards/cards.component";

import Pagination from "../../components/Pagination/Pagination.component";



const Home = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);

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

  const handleSubmit =  (event) => {
    event.preventDefault();
     dispatch(getCountriesByName(searchString));

    setCurrentPage(1);
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

 
  return (
    <div>
      <Navbar  setCurrentPage={setCurrentPage} handleChange={handleChange} handleSubmit={handleSubmit}/>
      <Cards  nCountries={nCountries} />
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        nPages={nPages}
      />
    </div>
  );
};
export default Home;
