const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const pool = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// Home Route
app.get("/", async (req, res) => {
  try {
    const [db] = await pool.query("SELECT DATABASE() AS db");

    res.json({
      success: true,
      message: "🚀 Appetite POS API is running!",
      database: db[0].db,
      envDatabase: process.env.MYSQLDATABASE,
      serverTime: new Date(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start Server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});