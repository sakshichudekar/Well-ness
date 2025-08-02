const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

router.get('/dashboard', verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: `Welcome to the dashboard, user ID: ${req.user.userId}`,
  });
});

module.exports = router;
