const historicalData = [
  {
    products: [
      { item: "Mousepad", quantity: 2 },
      { item: "Keyboard", quantity: 2 },
    ],
    orderDate: "23-05-10",
    orderValue: 75.98,
    buyerEmail: "john.doe@example.com",
  },
  {
    products: [{ item: "Monitor", quantity: 1 }],
    orderDate: "23-05-12",
    orderValue: 249.99,
    buyerEmail: "jane.smith@example.com",
  },
  {
    products: [
      { item: "Mousepad", quantity: 1 },
      { item: "Keyboard", quantity: 1 },
      { item: "Headset", quantity: 1 },
    ],
    orderDate: "23-05-13",
    orderValue: 179.97,
    buyerEmail: "peter.jones@example.com",
  },
  {
    products: [{ item: "Gaming Chair", quantity: 1 }],
    orderDate: "23-06-01",
    orderValue: 349.99,
    buyerEmail: "alice.johnson@example.com",
  },
  {
    products: [
      { item: "Mousepad", quantity: 4 },
      { item: "Webcam", quantity: 2 },
    ],
    orderDate: "23-06-05",
    orderValue: 124.98,
    buyerEmail: "bob.williams@example.com",
  },
];

function getTopProducts(
  historicalData,
  initialDate,
  finalDate,
  topProductCount
) {
  // Validate input dates
  if (!isValidDate(initialDate) || !isValidDate(finalDate)) {
    return "Invalid date format. Please use yy-mm-dd.";
  }

  const initialDateTime = +initialDate.split("-").join("");
  const finalDateTime = +finalDate.split("-").join("");

  if (finalDateTime < initialDateTime) {
    return "Invalid dates. Final date must be more recent than initial date";
  }

  const productCount = {};

  historicalData.forEach((order) => {
    const orderDateTime = +order.orderDate.split("-").join("");

    if (orderDateTime >= initialDateTime && orderDateTime <= finalDateTime) {
      order.products.forEach((product) => {
        if (productCount[product.item]) {
          productCount[product.item] += product.quantity;
        } else {
          productCount[product.item] = product.quantity;
        }
      });
    }
  });

  // Sort products by quantity sold in descending order
  const sortedProducts = Object.entries(productCount).sort(
    (a, b) => b[1] - a[1]
  );

  // Return the top products
  return sortedProducts
    .slice(0, topProductCount)
    .map((product) => ({ item: product[0], quantity: product[1] }));
}

// Helper function to validate date format (yy-mm-dd)
function isValidDate(dateString) {
  const regex = /^\d{2}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}

// Example usage:
const topProducts = getTopProducts(historicalData, "23-05-01", "23-06-30", 2);
const topProducts2 = getTopProducts(historicalData, "23-05-11", "23-06-30", 3);
console.log(topProducts, topProducts2);
