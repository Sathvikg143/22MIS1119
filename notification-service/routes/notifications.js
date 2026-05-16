const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const fetchNotifications = require("../services/notificationService");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const notifications = await fetchNotifications(req.token);

    const topNotifications = notifications.slice(0, 10);

    res.status(200).json({
      success: true,
      count: topNotifications.length,
      notifications: topNotifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;