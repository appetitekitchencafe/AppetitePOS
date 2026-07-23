const express = require("express");
const router = express.Router();

const {
  createOrder,
  getKitchenOrders,
  updateOrderStatus,
  getAllOrders,
} = require("../controllers/orderController");

// Create new order
router.post("/", createOrder);

// Kitchen orders
router.get("/kitchen", getKitchenOrders);

// All orders
router.get("/", getAllOrders);

// Update order status
router.put("/:id/status", updateOrderStatus);

module.exports = router;