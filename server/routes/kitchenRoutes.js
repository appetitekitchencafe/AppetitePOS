const express = require("express");
const router = express.Router();

const {
  getKitchenOrders,
  updateStatus,
} = require("../controllers/kitchenController");

// GET all kitchen orders
router.get("/", getKitchenOrders);

// UPDATE order status
router.put("/:id", updateStatus);

module.exports = router;