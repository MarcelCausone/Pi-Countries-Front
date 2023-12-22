
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import  style from "../../components/navbar/navbar.module.css";
import {

  filterByContinent,
  reset,
  sort,
  filterByActivity,
} from "../../redux/actions";

const Filters = () => {
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.allCountries);
    const activities = useSelector((state) => state.activities);
  
 
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
    <div className={style.filters}>
          <button className={`${style.resetButton} ${style.navbarButton}`} onClick={resetHandler}>
              RESET
            </button>
          <div className={style.sortFilter}>
            <select onChange={sortHandler} className={style.selectBox}>
              <option value="" disabled selected>
                Ordenamiento
              </option>
              <option value="nameAsc">Nombre ↑</option>
              <option value="nameDesc">Nombre ↓</option>
              <option value="populationAsc">Población ↑</option>
              <option value="populationDesc">Población ↓</option>
            </select>
          
          </div>

          <div className={style.continentFilter}>
            <select placeholder="Continent" onChange={filterHandler} className={style.selectBox}>
              <option value="" disabled selected>
                Continentes
              </option>
              {[
                "Africa",
                "Europe",
                "Oceania",
                "Asia",
                "South America",
                "North America",
                "Antarctica",
              ].map((continent) => (
                <option key={continent} value={continent}>
                  {continent}
                </option>
              ))}
            </select>
          </div>

          <div className={style.activityFilter}>
            <select onChange={filterByActivityHandler} className={style.selectBox}>
              <option value="" disabled selected>
                Actividades
              </option>
              {activityList.map((activity) => (
                <option key={activity} value={activity}>
                  {activity}
                </option>
              ))}
            </select>
          </div>
        </div>
      
  );
};

export default Filters;
