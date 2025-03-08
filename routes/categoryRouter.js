const { Router } = require("express");
const categoryRouter = Router();
const categoryController = require("./../controllers/categoryController");

categoryRouter.get("/", categoryController.get);
categoryRouter.post("/", categoryController.post);

module.exports = categoryRouter;
