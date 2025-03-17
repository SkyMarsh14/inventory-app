const { Router } = require("express");
const formRouter = Router();
const formController = require("../controllers/formController");
formRouter.get("/:id/delete", formController.delete);
formRouter.get("/:deviceId/update", formController.update.get);
formRouter.post("/:deviceId/udpate", formController.update.post);
formRouter.get("/", formController.get);
formRouter.post("/", formController.post);
module.exports = formRouter;
