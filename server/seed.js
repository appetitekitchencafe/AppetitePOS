require("dotenv").config();

const bcrypt = require("bcrypt");
const pool = require("./config/db");

async function seed() {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await pool.query(
      `INSERT INTO users (full_name, username, password, role)
       VALUES (?, ?, ?, ?)`,
      [
        "Administrator",
        "admin",
        hashedPassword,
        "admin"
      ]
    );

    console.log("✅ Admin user created successfully!");
    console.log("Username: admin");
    console.log("Password: admin123");
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

seed();