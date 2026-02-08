const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: String,
  food: String,
  coach: String,
  seat: String,
  status: { type: String, default: "Preparing" }
});

module.exports = mongoose.model("Order", orderSchema);
