const pool = require("./pool");

async function getAllDevices() {
  const { rows } = await pool.query(
    "select devices.id,name,categoryname,brandname from devices join brands on brands.id=brandid join categories on categoryid=categories.id"
  );
  return rows;
}

async function getCategories() {
  const { rows } = await pool.query("select * from categories");
  return rows;
}

async function addCategory(category) {
  await pool.query("INSERT INTO categories (categoryName) VALUES ($1)", [
    category,
  ]);
}
async function getBrands() {
  const { rows } = await pool.query("SELECT * from brands");
  return rows;
}

async function addBrand(brand) {
  await pool.query("INSERT INTO brands (brandName) VALUES ($1)", [brand]);
}

async function addDevice(device, categoryId, brandId) {
  await pool.query(
    "INSERT INTO devices(name,brandid,categoryid) VALUES($1,$2,$3)",
    [device, categoryId, brandId]
  );
}
async function deleteDevice(deviceId) {
  await pool.query(`DELETE FROM devices WHERE id=${deviceId}`);
}
async function getDeviceById(deviceId) {
  return (
    await pool.query(
      `select devices.id, name, categoryname,brandname from devices join brands on brands.id=brandid join categories on categoryid=categories.id
    where devices.id=${deviceId}`
    )
  ).rows;
}
module.exports = {
  getAllDevices,
  getCategories,
  addCategory,
  getBrands,
  addBrand,
  addDevice,
  deleteDevice,
  getDeviceById,
};
