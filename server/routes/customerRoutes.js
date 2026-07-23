const express = require("express");
const router = express.Router();

const {
  getCustomers,
  getCustomerByPhone,
  addCustomer,
} = require("../controllers/customerController");

// Get all customers
router.get("/", getCustomers);

// Search customer by phone
router.get("/phone/:phone", getCustomerByPhone);

// Add customer
router.post("/", addCustomer);

module.exports = router;