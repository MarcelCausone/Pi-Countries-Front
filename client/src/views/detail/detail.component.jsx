import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getCountriesByID, cleanDetail } from "../../redux/actions";
import  style from  "./detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const allCountriesDetail = useSelector((state) => state.allCountriesDetail);
  const { id } = useParams();

  const [showActivities, setShowActivities] = useState(false);

  useEffect(() => {
    dispatch(getCountriesByID(id));
    return () => dispatch(cleanDetail());
  }, [dispatch, id]);

  const toggleActivities = () => {
    setShowActivities(!showActivities);
  };

  return (
    <div className={style.modalbackground}>
      <div className={style.modalcontainer}>
        <div >
        <Link to="/home">
          <button className={style.modalclosebutton}>&times;</button>
        </Link>
        </div>
        <div className={style.image}>
        {allCountriesDetail?.flagImage && (
          <img
          style={{borderRadius:"15px"}}
            src={allCountriesDetail.flagImage}
            alt={allCountriesDetail.name}
          />
        )}
        </div>
      <div className={style.text}>
      <h1>{allCountriesDetail?.name}</h1>
        <h2>ID: {allCountriesDetail?.ID}</h2>
        <h2>Continente: {allCountriesDetail?.continent}</h2>
        <h2>Capital: {allCountriesDetail?.capital}</h2>
        <h2>Área: {allCountriesDetail?.area} KM </h2>
        <h2>Población: {allCountriesDetail?.population} habitantes</h2>
        <h2>Subregión: {allCountriesDetail?.subregion}</h2>
      </div>

        <button style={{margin:"none"}} onClick={toggleActivities}>
          {showActivities ? "Ocultar Actividades" : "Mostrar Actividades"}
        </button>
        {showActivities && (
          <>
            <h2>Actividades:</h2>
            <ul>
              {allCountriesDetail?.Activities?.map((activity) => (
                <li key={activity.id}>
                  {activity.nombre} (Dificultad: {activity.dificultad},
                  Duración: {activity.duracion} hs, Temporada:{" "}
                  {activity.temporada})
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Detail;
