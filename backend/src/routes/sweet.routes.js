const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { getSweets, purchaseSweet } = require("../controllers/sweet.controller");

router.get("/", authMiddleware, getSweets);
router.post("/:id/purchase", authMiddleware, purchaseSweet);

module.exports = router;
