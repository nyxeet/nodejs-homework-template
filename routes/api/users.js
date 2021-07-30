/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const Controller = require("../../controllers/user");
const jwtAuthenticate = require("../../middlewares/auth");

router.get("/current", jwtAuthenticate, Controller.getProfile);

module.exports = router;
