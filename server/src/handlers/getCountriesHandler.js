const { getCountries } = require("../controllers/getCountries");

const getCountriesHandler = async (req, res) => {
  try {
    const country = await getCountries();
    return res.status(200).json(country);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { getCountriesHandler };
