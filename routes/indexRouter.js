const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.main);
indexRouter.get("/devices/:id/delete", indexController.deleteAction);
indexRouter.post("/devices/:id/update", indexController.updateDeviceGet);
module.exports = indexRouter;
