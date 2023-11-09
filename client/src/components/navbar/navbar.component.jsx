import "./navbar.styles.css";
import { Link } from "react-router-dom";

const Navbar = ({ handleChange, handleSubmit }) => {
  return (
    <div className="navbar-container">
      <div className="navbar-links">
        <Link to="/form" className="navbar-link">
          Crear actividad
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          placeholder="Busca un país"
          type="search"
          onChange={handleChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>
    </div>
  );
};

export default Navbar;
