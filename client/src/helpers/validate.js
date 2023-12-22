export function validate(input) {
  let errors = {};

  if (!input.nombre.trim()) {
    errors.nombre = "The name is required.";
  } else if (/^\d/.test(input.nombre)) {
    errors.nombre = "The name cannot start with numbers.";
  } else if (input.nombre.length > 22) {
    errors.nombre = "Excess characters.";
  }

  if (isNaN(input.duracion) || input.duracion <= 0) {
    errors.duracion = "Duration must be a number greater than 0.";
  }

  return errors;
}
