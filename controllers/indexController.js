const queries = require("./../db/queries");

const main = async (req, res) => {
  const devices = await queries.getAllDevices();
  res.render("index", { page: "main", data: devices });
};

module.exports = { main };
