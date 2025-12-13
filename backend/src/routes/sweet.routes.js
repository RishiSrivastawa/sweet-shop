const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { getSweets } = require("../controllers/sweet.controller");

router.get("/", authMiddleware, getSweets);

module.exports = router;
