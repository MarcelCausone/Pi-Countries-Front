import { useState, useEffect } from "react";
import { validate } from "../../helpers/validate";
import { useDispatch, useSelector } from "react-redux";
import { addActivity } from "../../redux/actions/index";
import { Link } from "react-router-dom";

import "./form.styles.css";

const Form = () => {
  const initialErrors = {
    nombre: "",
    dificultad: "",
    duracion: "",
    temporada: "",
    paises: [],
  };

  const [errors, setErrors] = useState(initialErrors);

  const [input, setInput] = useState({
    nombre: "",
    dificultad: "",
    duracion: "",
    temporada: "",
    paises: [],
  });

  const [countryList, setCountryList] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Lista de países con nombres e IDs

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "paises") {
      // Si el campo es "paises", verifica si el país ya está en la lista
      const selectedCountry = countryList.find(
        (country) => country.name === value
      );
      if (selectedCountry && !input.paises.includes(selectedCountry.id)) {
        // Agrega el país solo si no está en la lista
        setInput({
          ...input,
          paises: [...input.paises, selectedCountry.id],
        });
      }
    } else {
      // En caso contrario, actualiza otros campos
      setInput({
        ...input,
        [name]: value,
      });
    }

    // Valida el campo modificado
    const validationErrors = validate({ ...input, [name]: value });

    // Actualiza el estado de errores solo para el campo modificado
    setErrors({
      ...errors,
      [name]: validationErrors[name],
    });
  };

  function disableHandler() {
    for (let error in errors) {
      if (errors[error] || !input[error]) {
        return true; // Retorna true si hay errores o algún campo está vacío
      }
    }
    return false; // Retorna false si no hay errores y todos los campos están llenos
  }

  const dispatch = useDispatch();
  const { activities, allCountries } = useSelector((state) => state);

  useEffect(() => {
    // Cuando se carga el componente, crea la lista de países con nombres e IDs
    const countriesWithIds = allCountries.map((country) => ({
      id: country.ID,
      name: country.name,
    }));

    // Ordena la lista alfabéticamente por el nombre del país
    countriesWithIds.sort((a, b) => a.name.localeCompare(b.name));

    setCountryList(countriesWithIds);
  }, [allCountries]);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (
      Object.values(errors).every((error) => !error) &&
      Object.values(input).every(Boolean)
    ) {
      try {
        await dispatch(addActivity(input));
        setInput({
          nombre: "",
          dificultad: "",
          duracion: "",
          temporada: "",
          paises: [],
        });
        setSuccessMessage("Actividad creada exitosamente.");
        setErrorMessage(""); // Limpia cualquier mensaje de error anterior
      } catch (error) {
        setSuccessMessage("");
        setErrorMessage("Error al crear la actividad.");
        console.error("Error al crear la actividad:", error);
      }
    }
  };

  const clearForm = () => {
    setInput({
      nombre: "",
      dificultad: "",
      duracion: "",
      temporada: "",
      paises: [],
    });
    setErrors(initialErrors);
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <div className="form-container">
      <div className="form-section">
        <div>
          <Link to="/home">HOME</Link>
        </div>
        <h2 className="form-title">Crear Actividad</h2>
        <form onSubmit={submitHandler}>
          <div>
            <label className="form-label" htmlFor="nombre">
              Nombre de la Actividad
            </label>
            <input
              className="form-input"
              name="nombre"
              value={input.nombre}
              onChange={handleChange}
            />
            {errors.nombre && <p className="error-message">{errors.nombre}</p>}
          </div>

          <div>
            <label className="form-label" htmlFor="dificultad">
              Dificultad
            </label>
            <input
              className="form-input"
              name="dificultad"
              type="range"
              min="1"
              max="5"
              step="1"
              value={input.dificultad}
              onChange={handleChange}
            />
            {input.dificultad}
            {errors.dificultad && (
              <p className="error-message">{errors.dificultad}</p>
            )}
          </div>
          <div>
            <label className="form-label" htmlFor="duracion">
              Duración (horas)
            </label>
            <input
              className="form-input"
              name="duracion"
              type="number"
              step="0.5"
              min="0.5"
              max="24"
              value={input.duracion}
              onChange={handleChange}
            />
            {errors.duracion && (
              <p className="error-message">{errors.duracion}</p>
            )}
          </div>
          <div>
            <label className="form-label" htmlFor="temporada">
              Temporada
            </label>
            <select
              name="temporada"
              value={input.temporada}
              onChange={handleChange}
            >
              <option value="verano">Verano</option>
              <option value="invierno">Invierno</option>
              <option value="otoño">Otoño</option>
              <option value="primavera">Primavera</option>
            </select>
            {errors.temporada && (
              <p className="error-message">{errors.temporada}</p>
            )}
          </div>
          <div>
            <label className="form-label" htmlFor="paises">
              Países pertenecientes
            </label>
            <select
              name="paises"
              multiple
              value={input.paises.map(
                (id) => countryList.find((country) => country.id === id).name
              )}
              onChange={handleChange}
            >
              {countryList.map((country) => (
                <option value={country.name} key={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.paises && <p className="error-message">{errors.paises}</p>}
          </div>
          <button
            className="form-button"
            disabled={disableHandler()}
            type="submit"
          >
            Crear
          </button>
          <button className="form-button" type="button" onClick={clearForm}>
            Limpiar
          </button>
        </form>
      </div>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Renderiza los países seleccionados */}
      <div className="selected-countries">
        <h3>Países Seleccionados</h3>
        <ul>
          {input.paises.map((id, index) => (
            <li key={index}>
              {countryList.find((country) => country.id === id).name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Form;
