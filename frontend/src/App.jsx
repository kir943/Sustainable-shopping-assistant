// frontend/src/App.jsx
import { useEffect, useState } from 'react';
import "./App.css";
import ProductCard from "./components/ProductCard";
import Gamification from "./components/Gamification";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ecoPoints, setEcoPoints] = useState(() => {
    const saved = localStorage.getItem("ecoPoints");
    return saved ? Number(saved) : 0;
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log("Fetching products from API...");
      
      const response = await fetch("http://localhost:5000/api/products");
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("API Response data:", data);
      
      // Handle response format
      let productsArray = [];
      if (Array.isArray(data)) {
        productsArray = data;
      } else if (data.products && Array.isArray(data.products)) {
        productsArray = data.products;
      } else if (data.data && Array.isArray(data.data)) {
        productsArray = data.data;
      } else {
        console.warn("Unexpected API format, using empty array");
        productsArray = [];
      }
      
      console.log("Products to display:", productsArray.length);
      setProducts(productsArray);
      
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(`API Error: ${err.message}`);
      // Use mock data as fallback
      setProducts(getMockProducts());
    } finally {
      setLoading(false);
    }
  };

  const getMockProducts = () => {
    console.log("Using mock products as fallback");
    return [
      {
        _id: "1",
        name: "Organic Cotton T-Shirt",
        brand: "Patagonia",
        category: "Clothing",
        price: 29.99,
        ecoScore: 85,
        isEcoFriendly: true,
        sustainabilityScores: { environmental: 9, social: 8, health: 9, packaging: 7 },
        pointsReward: 25,
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300"
      },
      {
        _id: "2",
        name: "Reusable Bamboo Utensils",
        brand: "EcoRoots",
        category: "Home",
        price: 14.99,
        ecoScore: 92,
        isEcoFriendly: true,
        sustainabilityScores: { environmental: 9, social: 7, health: 8, packaging: 9 },
        pointsReward: 20,
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300"
      },
      {
        _id: "3",
        name: "LED Light Bulb",
        brand: "Philips",
        category: "Electronics",
        price: 8.99,
        ecoScore: 72,
        isEcoFriendly: true,
        sustainabilityScores: { environmental: 8, social: 6, health: 7, packaging: 5 },
        pointsReward: 15,
        imageUrl: "https://images.unsplash.com/photo-1506803903005-9f56b0c4b7c5?w=300"
      }
    ];
  };

  const addEcoPoints = (points) => {
    const updated = ecoPoints + points;
    setEcoPoints(updated);
    localStorage.setItem("ecoPoints", updated.toString());
    console.log(`Added ${points} points. Total: ${updated}`);
  };

  const getBadge = () => {
    if (ecoPoints >= 500) return "🌍 Planet Protector";
    if (ecoPoints >= 300) return "🛡️ Eco Warrior";
    if (ecoPoints >= 100) return "🌱 Eco Beginner";
    return "🌿 Newcomer";
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading sustainable products...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>🌱 Sustainable Shopping Assistant</h1>
          <p className="tagline">Make eco-friendly choices, earn rewards!</p>
        </div>
        
        <div className="user-stats">
          <div className="stat-card">
            <span className="stat-label">Eco Points</span>
            <span className="stat-value">{ecoPoints}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Current Badge</span>
            <span className="badge">{getBadge()}</span>
          </div>
        </div>
      </header>

      <main>
        <Gamification ecoPoints={ecoPoints} addEcoPoints={addEcoPoints} />
        
        <section className="products-section">
          <div className="section-header">
            <h2>🛍️ Sustainable Products</h2>
            <p className="section-subtitle">Choose eco-friendly options to earn points</p>
            <button className="refresh-btn" onClick={fetchProducts}>
              🔄 Refresh Products
            </button>
          </div>
          
          {error && (
            <div className="error-message">
              ⚠️ {error} - Using sample data
            </div>
          )}
          
          {products.length === 0 ? (
            <div className="empty-state">
              <p>No products found. Make sure backend is running!</p>
              <button className="retry-btn" onClick={fetchProducts}>
                Try Again
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {products.map(product => (
                <ProductCard 
                  key={product._id || product.id} 
                  product={product} 
                  addEcoPoints={addEcoPoints}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>🌍 Every sustainable choice makes a difference!</p>
        <p className="footer-note">Backend: {error ? '❌ Not connected' : '✅ Connected'}</p>
      </footer>
    </div>
  );
}

export default App;
