const { Activity } = require("../db");

const createActivity = async ({
  nombre,
  dificultad,
  duracion,
  temporada,
  paises,
 }) => {
  // ... validación ...
 
  // Crea la actividad
  const NewActivity = await Activity.create({
   nombre,
   dificultad,
   duracion,
   temporada,
  });
 
  // Asocia la actividad con los países
  await NewActivity.setCountries(paises);
 
  return NewActivity;
 };

module.exports = { createActivity };
