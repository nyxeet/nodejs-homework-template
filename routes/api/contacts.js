/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const Controller = require("../../controllers/contacts");
const jwtAuthenticate = require("../../middlewares/auth");
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatusContact,
} = require("../../validation/contacts");

router.get("/", jwtAuthenticate, Controller.list);
router.get("/:contactId", jwtAuthenticate, Controller.getById);
router.post("/", jwtAuthenticate, validateCreateContact, Controller.create);
router.delete("/:contactId", jwtAuthenticate, Controller.remove);
router.put(
  "/:contactId",
  jwtAuthenticate,
  validateUpdateContact,
  Controller.update
);
router.patch(
  "/:contactId/favorite",
  jwtAuthenticate,
  validateUpdateStatusContact,
  Controller.patch
);

module.exports = router;
