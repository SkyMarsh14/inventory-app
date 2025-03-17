const queries = require("./../db/queries");
const { body, validationResult } = require("express-validator");
const length = { min: 3, max: 15 };
const brandValidator = [
  body("brandname")
    .trim()
    .notEmpty()
    .withMessage("This must not be empty")
    .isLength(length)
    .withMessage("Brand name must be between 3 to 15 letters."),
];
const controller = {
  get: async (req, res) => {
    const brands = await queries.getBrands();
    res.render("index", {
      page: "brand",
      data: brands,
      length: length,
    });
  },
  post: [
    brandValidator,
    async (req, res) => {
      const { brandname } = req.body;
      await queries.addBrand(brandname);
      res.redirect("/brand");
    },
  ],
};

module.exports = controller;
