const axios = require("axios");
const { Country, Activity } = require("../db");

const getCountries = async () => {
  // Utiliza Country.findAll() para obtener los registros de la base de datos
  const countriesCharged = await Country.findAll({
    include: [Activity], // Incluye las actividades asociadas a cada país
  });

  if (countriesCharged.length === 0) {
    const { data } = await axios(`http://localhost:5000/countries`);
    const countriesData = data.map((country) => ({
      ID: country.cca3,
      name: country.name.common || "No name",
      flagImage: country.flags.png || "no flag",
      continent: country.continents,
      capital: country.capital,
      subregion: country.subregion || "No subregion",
      capital: country.capital || "No Capital",
      population: country.population || 0,
      area: country.area || 0,
    }));

    // Agrega las actividades asociadas a cada país
    for (const country of countriesData) {
      country.Activities = await Activity.findAll({
        where: { CountryID: country.ID },
      });
    }

    await Country.bulkCreate(countriesData, { ignoreDuplicates: true });
    return countriesData;
  } else {
    return countriesCharged;
  }
};

module.exports = { getCountries };
