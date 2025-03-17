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
      const brandId = req.body.brand;
      const categoryId = req.body.category;
      await queries.addDevice(device, brandId, categoryId);
      res.redirect("/");
    },
  ],
  delete: async (req, res) => {
    await queries.deleteDevice(req.params.id);
    res.redirect("/");
  },
  update: {
    get: async (req, res) => {
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
    post: [
      formValidator,
      async (req, res) => {
        const deviceId = req.params.deviceId;
        const deviceName = req.body["device-input"];
        const categoryId = req.body.category;
        const brandId = req.body.brand;
        try {
          await queries.updateDevice(deviceId, deviceName, categoryId, brandId);
        } catch (error) {
          throw new Error(error);
        } finally {
          res.redirect("/");
        }
      },
    ],
  },
};

module.exports = formController;
