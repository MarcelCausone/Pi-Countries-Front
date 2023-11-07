import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"; // Importa tu archivo CSS para estilos específicos de la Landing Page

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <Link to="/home">
          <button>Ingresar</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
