const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware, (req, res) => {
  res.json([]);
});

module.exports = router;
