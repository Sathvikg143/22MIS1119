const typeWeights = {
  Placement: 10,
  Result: 7,
  Event: 5,
};

function calculatePriority(notification) {
  const typeScore = typeWeights[notification.Type] || 1;

  const messageLengthScore = notification.Message.length;

  const totalScore = typeScore * 10 + messageLengthScore;

  return totalScore;
}

module.exports = calculatePriority;