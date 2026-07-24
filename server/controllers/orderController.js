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

    // Find matching online order
    const [online] = await pool.query(
      `
      SELECT customer_name, phone
      FROM online_orders
      WHERE id = ?
      `,
      [id]
    );

    if (online.length > 0) {
      const customer = online[0];

      let message = "";

      switch (status) {
        case "Preparing":
          message = `👨‍🍳 Appetite Kitchen

Hi ${customer.customer_name},

Your order is now being prepared.

We'll notify you again when it's ready.

Thank you ❤️`;
          break;

        case "Ready":
          message = `✅ Appetite Kitchen

Hi ${customer.customer_name},

Your order is READY for pickup!

Please collect it at your convenience.

Thank you ❤️`;
          break;

        case "Completed":
          message = `🎉 Appetite Kitchen

Hi ${customer.customer_name},

Thank you for ordering with us!

We hope you enjoyed your meal.

See you again ❤️`;
          break;
      }

      if (message !== "") {
        const { sendWhatsApp } = require("../services/whatsappService");
        await sendWhatsApp(customer.phone, message);
      }
    }

    res.json({
      success: true,
      message: "Order updated",
    });

  } catch (err) {
    console.error("UPDATE ORDER ERROR:");
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};