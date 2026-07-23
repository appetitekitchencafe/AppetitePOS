const express = require("express");
const router = express.Router();

const {
  getPurchases,
  getSuppliers,
  addSupplier,
  createPurchase,
} = require("../controllers/purchaseController");

router.get("/", getPurchases);

router.get("/suppliers", getSuppliers);

router.post("/suppliers", addSupplier);

router.post("/", createPurchase);

module.exports = router;