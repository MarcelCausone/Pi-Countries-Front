const { getCountryByName } = require("../controllers/getCountriesByName");

const getCountriesByNameHandler = async (req, res) => {
  try {
    const { name } = req.query;
    const country = await getCountryByName(name);

    if (!country) {
      return res.status(404).json({ message: "Pais no encontrado" });
    } else {
      return res.status(200).json(country);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = { getCountriesByNameHandler };
