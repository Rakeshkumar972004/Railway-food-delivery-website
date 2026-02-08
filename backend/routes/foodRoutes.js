const express = require("express");
const Restaurant = require("../models/Restaurant");
const router = express.Router();

router.get("/:station", async (req, res) => {
  const data = await Restaurant.find({ station: req.params.station });
  res.json(data);
});

module.exports = router;
