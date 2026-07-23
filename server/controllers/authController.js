const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username exists
    const [users] = await pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const user = users[0];

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Success response
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        username: user.username,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};