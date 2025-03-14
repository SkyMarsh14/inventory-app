const queries = require("./../db/queries");
const { body, validationResult } = require("express-validator");
const length = { min: 5, max: 25 };
const categoryValidator = [
  body("categoryname")
    .trim()
    .notEmpty()
    .withMessage("Ths field is required.")
    .isString()
    .withMessage("Must be a string.")
    .isLength({ min: 5, max: 25 })
    .withMessage("Category name must be between 5 to 25 letters."),
];
const controller = {
  get: async (req, res) => {
    const categories = await queries.getCategories();
    res.render("categories", { data: categories, page: "category", length });
  },
  post: [
    categoryValidator,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const categories = await queries.getCategories();
        return res.status(400).render("categories", {
          categories,
          errors: errors.array(),
          page: "category",
          length,
        });
      }
      const { categoryname } = req.body;
      await queries.addCategory(categoryname);
      res.redirect("/category");
    },
  ],
};

module.exports = controller;
