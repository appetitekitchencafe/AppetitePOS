const pool = require("../config/db");

// Get all customers
exports.getCustomers = async (req, res) => {
  try {
    const [customers] = await pool.query(`
      SELECT *
      FROM customers
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      customers,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// Search customer by phone
exports.getCustomerByPhone = async (req, res) => {
  try {

    const { phone } = req.params;

    const [customers] = await pool.query(
      `
      SELECT *
      FROM customers
      WHERE phone=?
      `,
      [phone]
    );

    if (customers.length === 0) {
      return res.json({
        success: false,
        message: "Customer Not Found",
      });
    }

    res.json({
      success: true,
      customer: customers[0],
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// Add customer
exports.addCustomer = async (req, res) => {
  try {

    const {
      name,
      phone,
      email,
      birthday,
      address,
    } = req.body;

    const [result] = await pool.query(
      `
      INSERT INTO customers
      (
        name,
        phone,
        email,
        birthday,
        address
      )
      VALUES (?,?,?,?,?)
      `,
      [
        name,
        phone,
        email,
        birthday,
        address,
      ]
    );

    res.json({
      success: true,
      customerId: result.insertId,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// Update loyalty points
exports.addPoints = async (customerId, points, connection = pool) => {
  await connection.query(
    `
    UPDATE customers
    SET loyalty_points = loyalty_points + ?
    WHERE id = ?
    `,
    [points, customerId]
  );
};