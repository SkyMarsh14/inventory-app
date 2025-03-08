const pool = require("./pool");

async function getAllDevices() {
  const { rows } = await pool.query(
    "select * from devices join brands on brands.id=brandId"
  );
  return rows;
}

async function getCategories() {
  const { rows } = await pool.query("select distinct category from devices");
  return rows;
}
module.exports = {
  getAllDevices,
  getCategories,
};
