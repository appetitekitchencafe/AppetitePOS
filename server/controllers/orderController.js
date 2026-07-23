const pool = require("../config/db");
const { addPoints } = require("./customerController");

exports.createOrder = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const { cart, paymentMethod, customerId } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    await connection.beginTransaction();

    // Calculate totals
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const gst = subtotal * 0.05;
    const grandTotal = subtotal + gst;

    const orderNumber =
      "ORD-" + Date.now().toString().slice(-6);

    // Save order
    const [orderResult] = await connection.query(
      `
      INSERT INTO orders
      (
        order_number,
        total,
        gst,
        grand_total,
        payment_method,
        status
      )
      VALUES (?,?,?,?,?,?)
      `,
      [
        orderNumber,
        subtotal,
        gst,
        grandTotal,
        paymentMethod,
        "Pending",
      ]
    );

    const orderId = orderResult.insertId;

    // Save items + deduct inventory
    for (const item of cart) {

      await connection.query(
        `
        INSERT INTO order_items
        (
          order_id,
          menu_item_id,
          quantity,
          price
        )
        VALUES (?,?,?,?)
        `,
        [
          orderId,
          item.id,
          item.qty,
          item.price,
        ]
      );

      // Get recipe
      const [recipe] = await connection.query(
        `
        SELECT inventory_id, quantity
        FROM recipes
        WHERE menu_item_id = ?
        `,
        [item.id]
      );

      // Deduct stock
      for (const ingredient of recipe) {

        const deduct =
          Number(ingredient.quantity) *
          Number(item.qty);

        await connection.query(
          `
          UPDATE inventory
          SET stock = stock - ?
          WHERE id = ?
          `,
          [
            deduct,
            ingredient.inventory_id,
          ]
        );
      }
    }

    await connection.commit();

// Award loyalty points
if (customerId) {
  const points = Math.floor(grandTotal / 100);

  await addPoints(customerId, points);
}

res.json({
  success: true,
  orderId,
  orderNumber,
});

  } catch (err) {

    await connection.rollback();

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  } finally {

    connection.release();

  }
};
exports.getKitchenOrders = async (req, res) => {
  try {
    const [orders] = await pool.query(`
      SELECT
        id,
        order_number,
        status,
        created_at
      FROM orders
      ORDER BY id DESC
    `);

    for (const order of orders) {
      const [items] = await pool.query(
        `
        SELECT
          m.name,
          oi.quantity
        FROM order_items oi
        JOIN menu_items m
          ON oi.menu_item_id = m.id
        WHERE oi.order_id = ?
        `,
        [order.id]
      );

      order.items = items;
    }

    res.json({
      success: true,
      orders,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await pool.query(
      `
      UPDATE orders
      SET status = ?
      WHERE id = ?
      `,
      [status, id]
    );

    res.json({
      success: true,
      message: "Order updated",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    const [orders] = await pool.query(`
      SELECT
        id,
        order_number,
        grand_total,
        payment_method,
        status,
        created_at
      FROM orders
      ORDER BY id DESC
    `);

    res.json({
      success: true,
      orders,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};