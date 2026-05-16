const axios = require("axios");
const calculatePriority = require("../utils/priorityCalculator");
const fetchNotifications = async (token) => {
  try {
    const response = {
  data: {
    notifications: [
      {
        ID: "1",
        Type: "Placement",
        Message: "Google hiring drive",
        Timestamp: "2026-04-22 17:51:18",
      },
      {
        ID: "2",
        Type: "Event",
        Message: "Hackathon tomorrow",
        Timestamp: "2026-04-22 18:00:00",
      },
      {
        ID: "3",
        Type: "Result",
        Message: "Mid sem results published",
        Timestamp: "2026-04-22 19:00:00",
      },
    ],
  },
};
    const notifications = response.data.notifications || [];
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      priorityScore: calculatePriority(notification),
    }));
    updatedNotifications.sort(
      (a, b) => b.priorityScore - a.priorityScore
    );
    return updatedNotifications;
  } catch (error) {
    throw new Error("Failed to fetch notifications");
  }
};
module.exports = fetchNotifications;