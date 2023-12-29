import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getCountriesByID, cleanDetail } from "../../redux/actions";
import style from "./detail.module.css";

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
        <div>
          <Link to="/home">
            <button className={style.modalclosebutton}>&times;</button>
          </Link>
        </div>
        <div className={style.detailContent}>
          <div className={style.image}>
            {allCountriesDetail?.flagImage && (
              <img
                style={{ borderRadius: "15px" }}
                src={allCountriesDetail.flagImage}
                alt={allCountriesDetail.name}
              />
            )}
          </div>
          <div className={style.text}>
            <h1>{allCountriesDetail?.name}</h1>
            <h2>ID: {allCountriesDetail?.ID}</h2>
            <h2>Continet: {allCountriesDetail?.continent}</h2>
            <h2>Capital: {allCountriesDetail?.capital}</h2>
            <h2>Area: {allCountriesDetail?.area} KM </h2>
            <h2>
              Population: {allCountriesDetail?.population} habitantes
            </h2>
            <h2>Subregion: {allCountriesDetail?.subregion}</h2>
          </div>
        </div>

        <button style={{ margin: "none" }} onClick={toggleActivities}>
          {showActivities ? "Hide Activities" : "Show Activities"}
        </button>
        {showActivities && (
         <div className={style.activities + (showActivities ? ` ${style.active}` : "")}>
      
            <ul>
              {allCountriesDetail?.Activities?.map((activity) => (
                <li key={activity.id}>
                  {activity.nombre} (Difficulty: {activity.dificultad},
                  Duration: {activity.duracion} hs, Season:{" "}
                  {activity.temporada})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
