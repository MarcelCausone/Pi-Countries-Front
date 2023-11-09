import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom"; // Importa Link desde react-router-dom
import { getCountriesByID, cleanDetail } from "../../redux/actions";
import "./detail.styles.css";

const Detail = () => {
  const dispatch = useDispatch();
  const allCountriesDetail = useSelector((state) => state.allCountriesDetail);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getCountriesByID(id));
    return () => dispatch(cleanDetail());
  }, [dispatch, id]);
  return (
    <div className="modal-background">
      <div className="modal-container">
        <Link to="/home">
          {" "}
          {/* Agrega un enlace a la página /home */}
          <button className="modal-close-button">&times;</button>
        </Link>
        {allCountriesDetail?.flagImage && (
          <img
            src={allCountriesDetail.flagImage}
            alt={allCountriesDetail.name}
          />
        )}
        <h1>{allCountriesDetail?.name}</h1>
        <h2>ID:{allCountriesDetail?.ID}</h2>
        <h2>Continente:{allCountriesDetail?.continent}</h2>
        <h2>Área: {allCountriesDetail?.area} </h2>
        <h2>Población: {allCountriesDetail?.population} habitantes</h2>
        <h2>Subregión: {allCountriesDetail?.subregion}</h2>
        <h2>Actividades:</h2>
        <ul>
          {allCountriesDetail?.Activities?.map((activity) => (
            <li key={activity.id}>
              {activity.nombre} (Dificultad: {activity.dificultad}, Duración:{" "}
              {activity.duracion} hs, Temporada: {activity.temporada})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Detail;
