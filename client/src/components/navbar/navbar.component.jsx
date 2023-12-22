import React from "react";
import { Link } from "react-router-dom";
import Filters from "../Filters/Filters";
import style from "./navbar.module.css";

const Navbar = ({ handleChange, handleSubmit}) => {
  return (
    <div className={style.container}>
      {/* Botón para redireccionar a /form */}
      <div>
        <button>
        <Link to="/form" style={{ textDecoration: 'none', color: 'inherit' }}>
            Crear actividad
          </Link>
        </button>
      </div>
 
      {/* Filtros */}
      <div className={style.filtersContainer}>
        <Filters />
      </div>
 
      {/* Formulario de búsqueda */}
      <form onSubmit={handleSubmit} className={style.searchForm}>
        <input
          placeholder="Busca un país"
          type="search"
          onChange={handleChange}
          className={style.searchInput}
        />
        <button type="submit" className={style.searchButton}>
          Buscar
        </button>
      </form>
    </div>
  );
 };

export default Navbar;


