const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === "rakesh@gmail.com" && password === "123") {
      const token = jwt.sign({ email }, "secret123", { expiresIn: "1h" });
      return res.json({ message: "Login success", token });
    }

    return res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
});

module.exports = router;
