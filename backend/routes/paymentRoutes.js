const express = require("express");
const router = express.Router();

// POST /api/payment/create
router.post("/create", (req, res) => {
  try {
    // Demo payment object
    const demoOrder = {
      id: "demo_order_12345", // frontend expects "id"
      amount: 12000,          // ₹120 in paise
      currency: "INR"
    };

    console.log("Demo payment created:", demoOrder);

    // Return JSON
    res.json(demoOrder);
  } catch (err) {
    console.error("Payment route error:", err);
    res.status(500).json({ message: "Payment failed" });
  }
});

module.exports = router;
