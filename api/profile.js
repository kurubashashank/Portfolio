const { profile } = require("../server/src/data/fallbackData");

module.exports = async function handler(_req, res) {
  return res.status(200).json(profile);
};
