const express = require("express");
const router = express.Router();

const {
  getReceipt,
} = require("../controllers/receiptController");

// Get receipt by order id
router.get("/:id", getReceipt);

module.exports = router;