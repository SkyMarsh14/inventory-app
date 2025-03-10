const pool = require("./pool");

async function getAllDevices() {
  const { rows } = await pool.query(
    "select * from devices join brands on brands.id=brandid join categories on categoryid=categories.id"
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
async function getBrands() {
  const { rows } = await pool.query("SELECT brandName from brands");
  return rows;
}

async function addBrand(brand) {
  await pool.query("INSERT INTO brands (brandName) VALUES ($1)", [brand]);
}
module.exports = {
  getAllDevices,
  getCategories,
  addCategory,
  getBrands,
  addBrand,
};
