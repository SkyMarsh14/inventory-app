const queries = require("./../db/queries");

const controller = {
  get: async (req, res) => {
    const categories = await queries.getCategories();
    res.render("categories", { categories });
  },
  post: async (req, res) => {},
};

module.exports = controller;
