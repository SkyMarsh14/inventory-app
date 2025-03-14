const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.main);
indexRouter.post("/devices/:id/delete", indexController.devices);
module.exports = indexRouter;
