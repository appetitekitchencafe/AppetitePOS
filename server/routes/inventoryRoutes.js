const express = require("express");
const router = express.Router();

const {
  getInventory,
  addStock,
} = require("../controllers/inventoryController");

// Get all inventory
router.get("/", getInventory);

// Add stock
router.put("/:id", addStock);

module.exports = router;