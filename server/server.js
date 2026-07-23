require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const pool = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const kitchenRoutes = require("./routes/kitchenRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const orderManagementRoutes = require("./routes/orderManagementRoutes");
const receiptRoutes = require("./routes/receiptRoutes");
const customerRoutes = require("./routes/customerRoutes");
const reportRoutes = require("./routes/reportRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

// =========================
// Middleware
// =========================

app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// =========================
// API Routes
// =========================

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/kitchen", kitchenRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/order-management", orderManagementRoutes);
app.use("/api/receipt", receiptRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/employees", employeeRoutes);

// =========================
// Test Route
// =========================

app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT NOW() AS serverTime"
    );

    res.json({
      success: true,
      message: "🚀 Appetite POS API is running!",
      serverTime: rows[0].serverTime,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// =========================
// Start Server
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});