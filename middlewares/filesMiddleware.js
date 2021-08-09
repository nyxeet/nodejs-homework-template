const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "/public/temp");

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 300000,
  },
});

const uploadMiddleWare = multer({
  storage: storageConfig,
});

module.exports = uploadMiddleWare;
