export function validate(input) {
  let errors = {};

  if (!input.nombre.trim()) {
    errors.nombre = "El nombre es requerido.";
  } else if (/^\d/.test(input.nombre)) {
    errors.nombre = "El nombre no puede comenzar con números.";
  } else if (input.nombre.length > 22) {
    errors.nombre = "Exceso de caracteres";
  }

  if (isNaN(input.duracion) || input.duracion <= 0) {
    errors.duracion = "La duración debe ser un número mayor que 0.";
  }

  return errors;
}
