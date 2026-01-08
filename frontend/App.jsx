import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [ecoPoints, setEcoPoints] = useState(
    Number(localStorage.getItem("ecoPoints")) || 0
  );

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addEcoPoints = (points) => {
    const updated = ecoPoints + points;
    setEcoPoints(updated);
    localStorage.setItem("ecoPoints", updated);
  };

  const getBadge = () => {
    if (ecoPoints >= 500) return "🌳 Planet Protector";
    if (ecoPoints >= 300) return "🌿 Eco Warrior";
    if (ecoPoints >= 100) return "🌱 Eco Beginner";
    return "No badge yet";
  };

  return (
    <div className="container">
      <h1>🌍 Sustainable Shopping Assistant</h1>

      <div className="gamification">
        <p><strong>Eco Points:</strong> {ecoPoints}</p>
        <p><strong>Badge:</strong> {getBadge()}</p>
      </div>

      <div className="products">
        {products.map((product) => (
          <div
            key={product._id}
            className={`card ${
              product.isEcoFriendly ? "eco" : "normal"
            }`}
            onClick={() =>
              product.isEcoFriendly && addEcoPoints(10)
            }
          >
            <h3>{product.name}</h3>
            <p>Brand: {product.brand}</p>
            <p>Category: {product.category}</p>
            <p>
              Eco Score: <strong>{product.ecoScore}</strong>
            </p>
            {product.isEcoFriendly && (
              <span className="badge">🌱 Eco Friendly</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
