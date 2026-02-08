const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    res.json({ message: "Veg meal ordered" });
  } catch {
    res.status(500).json({ message: "Order failed" });
  }
});

module.exports = router;
