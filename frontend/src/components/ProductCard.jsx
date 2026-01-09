import React from "react";

function ProductCard({ product, addEcoPoints }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>
        <strong>Brand:</strong> {product.brand}
      </p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Eco Score:</strong> {product.ecoScore}
      </p>
      <p>
        {product.isEcoFriendly ? "✅ Eco Friendly" : "❌ Not Eco Friendly"}
      </p>

      <button
        onClick={() => addEcoPoints(product.ecoScore)}
        disabled={!product.isEcoFriendly}
      >
        Buy & Earn Eco Points
      </button>
    </div>
  );
}

export default ProductCard;
