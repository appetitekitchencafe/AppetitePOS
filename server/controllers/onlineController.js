const pool = require("../config/db");

exports.getMenu = async (req, res) => {
  try {
    const [menu] = await pool.query(
  "SELECT * FROM menu_items WHERE available = 1 ORDER BY category, name"
);

    res.json({
      success: true,
      menu,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      orderType,
      cart,
    } = req.body;
    console.log("===== ONLINE ORDER =====");
console.log(req.body);
console.log("Customer:", customerName);
console.log("Phone:", phone);
console.log("Order Type:", orderType);

    let total = 0;

    cart.forEach((item) => {
      total += item.price * item.qty;
    });

    const pool = require("../config/db");

exports.getMenu = async (req, res) => {
  try {
    const [menu] = await pool.query(
  "SELECT * FROM menu_items WHERE available = 1 ORDER BY category, name"
);

    res.json({
      success: true,
      menu,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      orderType,
      cart,
    } = req.body;
    console.log("===== ONLINE ORDER =====");
console.log(req.body);
console.log("Customer:", customerName);
console.log("Phone:", phone);
console.log("Order Type:", orderType);

    let total = 0;

    cart.forEach((item) => {
      total += item.price * item.qty;
    });

    const [order] = await pool.query(
      `INSERT INTO online_orders
      (customer_name,phone,order_type,status,total)
      VALUES (?,?,?,?,?)`,
      [
        customerName,
        phone,
        orderType,
        "Pending",
        total,
      ]
    );

    for (const item of cart) {
      await pool.query(
        `INSERT INTO online_order_items
        (order_id,menu_id,qty,price)
        VALUES (?,?,?,?)`,
        [
          order.insertId,
          item.id,
          item.qty,
          item.price,
        ]
      );
    }

    res.json({
      success: true,
      orderId: order.insertId,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getOrderStatus = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM online_orders WHERE id=?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
      });
    }

    res.json({
      success: true,
      order: rows[0],
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


    for (const item of cart) {
      await pool.query(
        `INSERT INTO online_order_items
        (order_id,menu_id,qty,price)
        VALUES (?,?,?,?)`,
        [
          order.insertId,
          item.id,
          item.qty,
          item.price,
        ]
      );
    }

    res.json({
      success: true,
      orderId: order.insertId,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getOrderStatus = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM online_orders WHERE id=?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
      });
    }

    res.json({
      success: true,
      order: rows[0],
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
