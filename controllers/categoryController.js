const queries = require("./../db/queries");
const { body, validationResult } = require("express-validator");

const validateCategory = [
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Ths field is required.")
    .isAlpha()
    .withMessage("Must only contain letters.")
    .isLength({ min: 5, max: 25 })
    .withMessage("Category name must be between 5 to 25 letters."),
];
const controller = {
  get: async (req, res) => {
    const categories = await queries.getCategories();
    res.render("categories", { categories });
  },
  post: [
    validateCategory,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const categories = await queries.getCategories();
        return res
          .status(400)
          .render("categories", { categories, errors: errors.array() });
      }
      const { category } = req.body;
      await queries.addCategory(category);
      res.redirect("/");
    },
  ],
};

module.exports = controller;
