const axios = require("axios");
const calculatePriority = require("../utils/priorityCalculator");

const fetchNotifications = async (token) => {
  try {
    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const notifications = response.data.notifications || [];

    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      priorityScore: calculatePriority(notification),
    }));

    updatedNotifications.sort(
      (a, b) => b.priorityScore - a.priorityScore
    );

    return updatedNotifications.slice(0, 10);
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw new Error("Failed to fetch notifications");
  }
};

module.exports = fetchNotifications;