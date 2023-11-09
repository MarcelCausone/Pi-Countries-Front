const { Router } = require("express");
const { getCountriesHandler } = require("../handlers/getCountriesHandler");
const {
  getCountriesByIdHandler,
} = require("../handlers/getCountriesByIdHandler");
const {
  getCountriesByNameHandler,
} = require("../handlers/getCountriesByNameHandler");

const { postActivitiesHandler } = require("../handlers/postActivitiesHandler");

const { getActivitiesHandler } = require("../handlers/getActivitiesHandler");

const router = Router();

router.get("/countries", getCountriesHandler);
router.get("/countries/name", getCountriesByNameHandler);
router.get("/countries/:idPais", getCountriesByIdHandler);
router.post("/activities", postActivitiesHandler);
router.get("/activities", getActivitiesHandler);

module.exports = router;
