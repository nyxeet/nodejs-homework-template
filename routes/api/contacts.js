/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const Controller = require("../../controllers/contacts");
const passport = require("passport");
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatusContact,
} = require("../../validation/contacts");

router.get("/", Controller.list);
router.get("/:contactId", Controller.getById);
router.post("/", validateCreateContact, Controller.create);
router.delete("/:contactId", Controller.remove);
router.put("/:contactId", validateUpdateContact, Controller.update);
router.patch(
  "/:contactId/favorite",
  validateUpdateStatusContact,
  Controller.patch
);

module.exports = router;
