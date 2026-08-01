const express = require("express");

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API v1 is working",
    timestamp: new Date().toISOString()
  });
});

module.exports = router;