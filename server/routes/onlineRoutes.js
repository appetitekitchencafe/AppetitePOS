const express = require("express");

const router = express.Router();

const {
  getMenu,
  createOrder,
  getOrderStatus,
} = require("../controllers/onlineController");

router.get("/menu", getMenu);

router.post("/order", createOrder);

router.get("/status/:id", getOrderStatus);

module.exports = router;