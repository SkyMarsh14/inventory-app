const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.main);
indexRouter.post("/devices/:id/delete", indexController.deleteAction);
indexRouter.get("/devices/:id/update", indexController.updateDevice);
module.exports = indexRouter;
