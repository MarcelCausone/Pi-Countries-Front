const { createActivity } = require("../controllers/postActivities");

const postActivitiesHandler = async (req, res) => {
  try {
    const { nombre, dificultad, duracion, temporada, paises } = req.body;

    const newActivity = await createActivity({
      nombre,
      dificultad,
      duracion,
      temporada,
      paises,
    });

    return res.status(200).json(newActivity);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { postActivitiesHandler };
