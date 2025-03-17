const { Router } = require("express");
const brandRouter = Router();
const brandController = require("./../controllers/brandController");

brandRouter.get("/:brandId/delete", brandController.delete);
brandRouter.get("/", brandController.get);
brandRouter.post("/", brandController.post);

module.exports = brandRouter;
