const queries = require("./../db/queries");

const main = async (req, res) => {
  const devices = await queries.getAllDevices();
  res.render("index", { data: devices });
};
const devices = async (req, res) => {
  await queries.deleteDevice(req.params.id);
  res.redirect("/");
};
module.exports = { main, devices };
