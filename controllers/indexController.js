const queries = require("./../db/queries");

const indexController = async (req, res) => {
  const devices = await queries.getAllDevices();
  res.render("index", { data: devices });
};

module.exports = indexController;
