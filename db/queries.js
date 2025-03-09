const pool = require("./pool");

async function getAllDevices() {
  const { rows } = await pool.query(
    "select * from devices join brands on brands.id=brandId"
  );
  return rows;
}

async function getCategories() {
  const { rows } = await pool.query("select categoryName from categories");
  return rows;
}

async function addCategory(category) {
  await pool.query("INSERT INTO categories (categoryName) VALUES ($1)", [
    category,
  ]);
}
module.exports = {
  getAllDevices,
  getCategories,
  addCategory,
};
