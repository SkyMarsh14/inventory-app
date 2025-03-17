const queries = require("./../db/queries");

const main = async (req, res) => {
  const devices = await queries.getAllDevices();
  res.render("index", { page: "main", data: devices });
};
const deleteAction = async (req, res) => {
  await queries.deleteDevice(req.params.id);
  res.redirect("/");
};
const updateDeviceGet = async (req, res) => {
  const device = await queries.getDeviceById(req.params.id);
  const categories = await queries.getCategories();
  const brands = await queries.getBrands();
};
module.exports = { main, deleteAction, updateDeviceGet };
