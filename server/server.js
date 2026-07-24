const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
require("./services/whatsappService");
const { sendWhatsApp } = require("./services/whatsappService");

dotenv.config();

const app = express();

const pool = require("./config/db");

// ===================== ROUTES =====================
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const menuRoutes = require("./routes/menuRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const kitchenRoutes = require("./routes/kitchenRoutes");
const orderRoutes = require("./routes/orderRoutes");
const orderManagementRoutes = require("./routes/orderManagementRoutes");
const customerRoutes = require("./routes/customerRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const receiptRoutes = require("./routes/receiptRoutes");
const reportRoutes = require("./routes/reportRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const onlineRoutes = require("./routes/onlineRoutes");

// ===================== MIDDLEWARE =====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===================== API ROUTES =====================
app.use("/api/auth", authRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/menu", menuRoutes);

app.use("/api/inventory", inventoryRoutes);

app.use("/api/kitchen", kitchenRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/order-management", orderManagementRoutes);

app.use("/api/customers", customerRoutes);

app.use("/api/purchases", purchaseRoutes);

app.use("/api/receipts", receiptRoutes);

app.use("/api/reports", reportRoutes);

app.use("/api/employees", employeeRoutes);

app.use("/api/expenses", expenseRoutes);
app.use("/api/online", onlineRoutes);

// ===================== HOME =====================
app.get("/", async (req, res) => {
  try {
    const [db] = await pool.query("SELECT DATABASE() AS db");

    res.json({
      success: true,
      message: "🚀 Appetite POS API is running!",
      database: db[0].db,
      serverTime: new Date(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// ===================== TEST =====================
app.get("/api/test", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS time");

    res.json({
      success: true,
      databaseTime: rows[0].time,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// ===================== 404 =====================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// ===================== START =====================
const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {

  console.log(`🚀 Server running on port ${PORT}`);

  setTimeout(async () => {

    await sendWhatsApp(
      "8499908891",
      `🍔 Appetite Kitchen

Congratulations!

WhatsApp Automation is Working.

Your POS is now connected successfully. 🎉`
    );

  }, 8000);

});