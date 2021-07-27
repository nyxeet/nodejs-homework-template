/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const Controller = require("../../controllers/user");

router.get("/profile", Controller.getProfile);

module.exports = router;
