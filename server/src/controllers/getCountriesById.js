const { Country, Activity } = require("../db");

const getCountriesById = async (idPais) => {
  return await Country.findAll({
    where: { ID: idPais },
    include: Activity,
  });
};

module.exports = { getCountriesById };
