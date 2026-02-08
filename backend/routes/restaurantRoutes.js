const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Annapoorna Veg Hotel",
      station: "Bangalore"
    },
    {
      id: 2,
      name: "SS Hyderabad Biryani",
      station: "Bangalore"
    },
    {
      id: 3,
      name: "A2B Veg Restaurant",
      station: "Bangalore"
    }
  ]);
});

module.exports = router;
