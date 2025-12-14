const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const {
  addSweet,
  getSweets,
  purchaseSweet,
  updateSweet,
  deleteSweet,
} = require("../controllers/sweet.controller");
router.get("/", authMiddleware, getSweets);
router.post("/", authMiddleware, adminMiddleware, addSweet);
router.post("/:id/purchase", authMiddleware, purchaseSweet);
router.put("/:id", authMiddleware, adminMiddleware, updateSweet);
router.delete("/:id", authMiddleware, adminMiddleware, deleteSweet);
module.exports = router;
