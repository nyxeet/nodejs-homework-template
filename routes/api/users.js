/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const Controller = require("../../controllers/user");
const jwtAuthenticate = require("../../middlewares/auth");
const uploadMiddleWare = require("../../middlewares/filesMiddleware");

router.get("/current", jwtAuthenticate, Controller.getProfile);
router.patch(
  "/avatar",
  jwtAuthenticate,
  uploadMiddleWare.single("avatar"),
  Controller.updateAvatar
);

module.exports = router;
