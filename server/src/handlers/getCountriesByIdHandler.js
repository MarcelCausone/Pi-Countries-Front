const { getCountriesById } = require("../controllers/getCountriesById");

const getCountriesByIdHandler = async (req, res) => {
  try {
    const { idPais } = req.params;
    const country = await getCountriesById(idPais);

    if (!country)
      return res.status(404).json({ message: "Pais no encontrado" });

    return res.status(200).json(country);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
module.exports = { getCountriesByIdHandler };
