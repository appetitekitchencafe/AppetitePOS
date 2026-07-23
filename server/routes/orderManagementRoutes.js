const express = require("express");
const router = express.Router();

const {
  getOrders,
  cancelOrder,
} = require("../controllers/orderManagementController");

// Get all orders
router.get("/", getOrders);

// Cancel order
router.put("/:id/cancel", cancelOrder);

module.exports = router;