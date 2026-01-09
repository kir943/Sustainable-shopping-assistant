import React from "react";

function Gamification({ ecoPoints }) {
  const getBadge = () => {
    if (ecoPoints >= 500) return "🌍 Planet Protector";
    if (ecoPoints >= 300) return "🌿 Eco Warrior";
    if (ecoPoints >= 100) return "🌱 Eco Beginner";
    return "No badge yet";
  };

  return (
    <div className="gamification">
      <h2>🎮 Gamification</h2>
      <p>
        <strong>Eco Points:</strong> {ecoPoints}
      </p>
      <p>
        <strong>Badge:</strong> {getBadge()}
      </p>
    </div>
  );
}

export default Gamification;
