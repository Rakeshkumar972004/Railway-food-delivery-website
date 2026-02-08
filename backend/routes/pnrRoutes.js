const express = require("express");
const router = express.Router();

router.get("/:pnr", async (req, res) => {
  try {
    res.json({
      trainName: "Chennai Express",
      status: "Confirmed",
      boarding: "MAS",
      destination: "SBC",
    });
  } catch {
    res.status(500).json({ message: "PNR error" });
  }
});

module.exports = router;
