import { useState, useEffect } from "react";
import { validate } from "../../helpers/validate";
import { useDispatch, useSelector } from "react-redux";
import { addActivity } from "../../redux/actions/index";
import { Link } from "react-router-dom";

import "./form.styles.css";

//INICIALIZACIÓN DE ESTADOS

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
  //---------------------------------------------------------------

  //MANEJO DE CAMBIOS DE ENTRADA

  const [countryList, setCountryList] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    //para seleccionar mas de un pais por actvidad
    if (name === "paises") {
      // Si el campo es "paises", verifica si el país ya fue seleccionado
      const selectedCountry = countryList.find(
        (country) => country.name === value
      );
      if (selectedCountry && !input.paises.includes(selectedCountry.id)) {
        // Agrega el país solo si no está en la lista de paises seleecionados
        setInput({
          ...input,
          paises: [...input.paises, selectedCountry.id],
        });
      }
    } else {
      //seteo los demas inputs
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

  //------------------------------------------------------------------------------------------------------

  //CARGA DE PAISES

  //Cuando se carga el componente, se obtienen todos los países de la BD y
  // se almacenan en el estado de countryList. Esta lista se utiliza luego para
  //llenar el campo de selección de países en el formulario.
  const dispatch = useDispatch();
  const { allCountries } = useSelector((state) => state);

  //Al cargar el form se trae una lista con el id y nombre de todos los paises
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

  //------------------------------------------------------------------------------

  //ENVIO DEL FORMULARIO

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Lista de países con nombres e IDs

  const submitHandler = (event) => {
    // cuando realizo el submit
    event.preventDefault();

    if (
      Object.values(errors).every((error) => !error) && // Object.values(errors) deberia ser un array
      //vacio(no tiene errores) y devuelve false , si los hay devuelve true

      Object.values(input).every(Boolean) //Si todos los campos de entrada tienen valores,
      //every(Boolean) devuelve true. Si al menos uno de los campos de entrada no tiene valor
      //(es decir, es falsy), every(Boolean) devuelve false
    ) {
      try {
        dispatch(addActivity(input));
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
  //-------------------------------------------------------------------------------------------------

  //LIMPIEZA DEL FORMULARIO
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
  //-------------------------------------------------------------------

  //Boton desabilitado

  function disableHandler() {
    for (let error in errors) {
      if (errors[error] || !input[error]) {
        return true; // Retorna true si hay errores o algún campo está vacío
      }
    }
    return false; // Retorna false si no hay errores y todos los campos están llenos
  }

  //-------------------------------------------------------------------------------------------------
  return (
    <div className="form-container">
      <div>
        <button className="header">
          <Link to="/home">HOME</Link>
        </button>
      </div>

      <div className="form-section">
        <form onSubmit={submitHandler}>
          <div>
            <label className="form-label" htmlFor="nombre">
              Nombre de la Actividad
            </label>
            <input
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
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
              className="form-input-paises"
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

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Form;
