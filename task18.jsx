import React, { useState } from "react";
import * as ss from "simple-statistics";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productData = [
    {
      name: "Product A",
      price: 25.99,
      dailySales: [
        { date: "2024-07-20", quantity: 12, storageCost: 0.5 },
        { date: "2024-07-19", quantity: 8, storageCost: 0.5 },
        { date: "2024-07-18", quantity: 15, storageCost: 0.5 },
        // ... more days
      ],
    },
    {
      name: "Product B",
      price: 18.5,
      dailySales: [
        { date: "2024-07-20", quantity: 5, storageCost: 0.5 },
        { date: "2024-07-19", quantity: 8, storageCost: 0.5 },
        { date: "2024-07-18", quantity: 6, storageCost: 0.5 },
        // ... more days
      ],
    },
    // ... more products
  ];

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const calculateOptimalInventory = (product) => {
    /* Suggested inventory based on the average plus 3 times the standard deviation
    to ensure the 99.9% of the daily sales are guaranteed */
    const quantities = product.dailySales.map(({ quantity }) => quantity);
    const standardDeviation = ss.standardDeviation(quantities);
    const mean = ss.mean(quantities);
    return Math.ceil(mean + 3 * standardDeviation);
  };

  return (
    <div>
      <h2>Product Sales Management</h2>

      {/* Product Selection */}
      <select
        onChange={(e) => handleProductSelect(productData[e.target.value])}
      >
        <option value="">Select a Product</option>
        {productData.map((product, index) => (
          <option key={index} value={index}>
            {product.name}
          </option>
        ))}
      </select>

      {/* Product Details (if selected) */}
      {selectedProduct && (
        <div>
          <h3>{selectedProduct.name}</h3>
          <p>Price: ${selectedProduct.price}</p>

          {/* Daily Sales Table */}
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Quantity Sold</th>
                <th>Storage Cost</th>
              </tr>
            </thead>
            <tbody>
              {selectedProduct.dailySales.map((sale, index) => (
                <tr key={index}>
                  <td>{sale.date}</td>
                  <td>{sale.quantity}</td>
                  <td>${sale.storageCost}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Optimal Inventory Suggestion */}
          <p>
            Suggested Optimal Inventory:{" "}
            {calculateOptimalInventory(selectedProduct)}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
