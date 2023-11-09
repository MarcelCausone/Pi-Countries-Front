const { Activity } = require("../db");

const createActivity = async ({
  nombre,
  dificultad,
  duracion,
  temporada,
  paises,
}) => {
  if (
    !nombre ||
    !dificultad ||
    !duracion ||
    !temporada ||
    !paises ||
    paises.length === 0
  ) {
    throw new Error(
      "Todos los campos son obligatorios, y debes seleccionar al menos un país."
    );
  }

  // Crea la actividad
  const NewActivity = await Activity.create({
    nombre,
    dificultad,
    duracion,
    temporada,
  });

  // Asocia la actividad con los países seleccionados
  await NewActivity.setCountries(paises);

  return NewActivity;
};

module.exports = { createActivity };
