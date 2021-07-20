/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const Controller = require("../../controllers/contacts");
const {
  validateCreateContact,
  validateUpdateContact,
} = require("../../validation/contacts");

router.get("/", Controller.list);
router.get("/:contactId", Controller.getById);
router.post("/", validateCreateContact, Controller.create);
router.delete("/:contactId", Controller.remove);
router.put("/:contactId", validateUpdateContact, Controller.update);

module.exports = router;
