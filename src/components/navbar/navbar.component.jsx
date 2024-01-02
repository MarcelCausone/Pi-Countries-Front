import React from "react";
import { Link } from "react-router-dom";
import Filters from "../Filters/Filters";
import style from "./navbar.module.css";

const Navbar = ({ handleChange, handleSubmit,setCurrentPage}) => {
  return (
    <div className={style.container}>
      {/* Botón para redireccionar a /form */}
      <div>
        <button>
        <Link to="/form" style={{ textDecoration: 'none', color: 'inherit' }}>
          Create activity
          </Link>
        </button>
      </div>
 
      {/* Filtros */}
      <div className={style.filtersContainer}>
        <Filters setCurrentPage={setCurrentPage} />
      </div>
 
      {/* Formulario de búsqueda */}
      <form onSubmit={handleSubmit} className={style.searchForm}>
        <input
          placeholder="Search for a country"
          type="search"
          onChange={handleChange}
          className={style.searchInput}
        />
        <button type="submit" className={style.searchButton}>
          Search
        </button>
      </form>
    </div>
  );
 };

export default Navbar;


