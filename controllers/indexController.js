const queries = require("./../db/queries");

const main = async (req, res) => {
  const devices = await queries.getAllDevices();
  res.render("index", { data: devices });
};
const deleteAction = async (req, res) => {
  await queries.deleteDevice(req.params.id);
  res.redirect("/");
};
const updateDevice = async (req, res) => {};
module.exports = { main, deleteAction, updateDevice };
