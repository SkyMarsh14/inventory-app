const queries = require("./../db/queries");

const controller = {
  get: async (req, res) => {
    const brands = await queries.getBrands();
    res.render("brands", { brands });
  },
  post: (req, res) => res.send("Post test"),
};

module.exports = controller;
