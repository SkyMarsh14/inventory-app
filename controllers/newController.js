const queries = require("./../db/queries");
const { body, validationResult } = require("express-validator");
const length = { min: 3, max: 20 };
const formValidator = [
  body("device-input")
    .trim()
    .notEmpty()
    .withMessage("This field is requied.")
    .isString()
    .withMessage("Invalid input type."),
  body("category").notEmpty().withMessage("This field is required.").toInt(),
  body("brand").notEmpty().withMessage("This field is requied.").toInt(),
];
const newController = {
  get: async (req, res) => {
    const categories = await queries.getCategories();
    const brands = await queries.getBrands();
    res.render("index", { page: "new", categories, brands, length });
  },
  post: [
    formValidator,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const categories = await queries.getCategories();
        const brands = await queries.getBrands();
        return res
          .status(400)
          .render("new", { categories, brands, length, errors });
      }
      const device = req.body["device-input"];
      const categoryId = req.body.category;
      const brandId = req.body.brand;
      await queries.addDevice(device, categoryId, brandId);
      res.redirect("/");
    },
  ],
};

module.exports = newController;
