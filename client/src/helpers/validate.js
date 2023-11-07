export function validate(input) {
  let errors = {};

  if (!input.nombre.trim()) {
    errors.nombre = "El nombre es requerido.";
  } else if (/^\d/.test(input.nombre)) {
    errors.nombre = "El nombre no puede comenzar con números.";
  }

  if (isNaN(input.dificultad) || input.dificultad < 1 || input.dificultad > 5) {
    errors.dificultad = "La dificultad debe estar en el rango de 1 a 5.";
  }

  if (isNaN(input.duracion) || input.duracion <= 0) {
    errors.duracion = "La duración debe ser un número mayor que 0.";
  }

  // // Validar que paises sea una cadena de 3 letras en mayúscula
  // const countryCodes = input.paises.split(",").map((code) => code.trim());
  // for (const code of countryCodes) {
  //   if (!/^[A-Z]{3}$/.test(code)) {
  //     errors.paises =
  //       "Los países deben ser códigos de 3 letras en mayúscula separados por comas (por ejemplo, ARG, USA, BRA).";
  //     break; // Detener la validación en el primer error
  //   }
  // }
  return errors;
}
