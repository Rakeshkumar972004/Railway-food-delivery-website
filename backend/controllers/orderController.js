const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const { items, trainNumber, station, totalAmount } = req.body;

    const order = new Order({
      userId: req.user.id,
      items,
      trainNumber,
      station,
      totalAmount
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: order._id
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
