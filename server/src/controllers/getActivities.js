const { Activity } = require("../db");

const getActivities = async () => {
  return await Activity.findAll();
};

module.exports = { getActivities };
