const { Country } = require("../db");
const { Sequelize } = require("sequelize");

const getCountryByName = async (name) => {
  return await Country.findAll({
    where: {
      name: {
        [Sequelize.Op.iLike]: `%${name}%`, // Búsqueda sin distinción entre mayúsculas y minúsculas
      },
    },
  });
};

module.exports = { getCountryByName };
