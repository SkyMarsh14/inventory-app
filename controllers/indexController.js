const queries = require("./../db/queries");

const indexController = async (req, res) => {
  const devices = await queries.getAllDevices();
  res.render("index", { devices });
};

module.exports = indexController;
