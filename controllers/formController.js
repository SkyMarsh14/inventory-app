const queries = require("../db/queries");
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
const formController = {
  get: async (req, res) => {
    const categories = await queries.getCategories();
    const brands = await queries.getBrands();
    res.render("index", {
      title: "Add a new device!",
      page: "new",
      categories,
      brands,
      length,
      url: req.originalUrl,
    });
  },
  post: [
    formValidator,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const categories = await queries.getCategories();
        const brands = await queries.getBrands();
        return res.status(400).render("index", {
          title: "Add a new device!",
          categories,
          brands,
          length,
          errors,
        });
      }
      const device = req.body["device-input"];
      const categoryId = req.body.category;
      const brandId = req.body.brand;
      await queries.addDevice(device, categoryId, brandId);
      res.redirect("/");
    },
  ],
  delete: async (req, res) => {
    await queries.deleteDevice(req.params.id);
    res.redirect("/");
  },
  update: async (req, res) => {
    const device = await queries.getDeviceById(req.params.deviceId);
    const categories = await queries.getCategories();
    const brands = await queries.getBrands();
    res.render("index", {
      title: "Update device info.",
      page: "update",
      categories,
      brands,
      length,
      device: device[0],
      url: req.originalUrl,
    });
  },
};

module.exports = formController;
