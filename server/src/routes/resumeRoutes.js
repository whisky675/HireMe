const express = require("express");
const multer = require("multer");
const { analyze } = require("../controllers/resumeController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, "src/uploads"),
  filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });
router.post("/analyze", (req, res, next) => {
  if (req.is("multipart/form-data")) {
    upload.single("resume")(req, res, next);
  } else {
    next();
  }
}, analyze);

module.exports = router;
