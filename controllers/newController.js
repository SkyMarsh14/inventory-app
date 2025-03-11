const queries = require("./../db/queries");

const newController = {
  get: async (req, res) => {
    const categories = await queries.getCategories();
    const brands = await queries.getBrands();
    res.render("new", { categories, brands });
  },
  post: async (req, res) => {
    res.redirect("/");
  },
};

module.exports = newController;
