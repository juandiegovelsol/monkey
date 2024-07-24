// Sample order data (You can replace this with your actual data)
const orders = [
  {
    orderId: 1,
    userEmail: "john.doe@example.com",
    orderTotalPrice: 25,
    dishes: [
      { dish: "Pizza", quantity: 1, unitaryPrice: 15 },
      { dish: "Coke", quantity: 2, unitaryPrice: 5 },
    ],
  },
  {
    orderId: 2,
    userEmail: "jane.doe@example.com",
    orderTotalPrice: 30,
    dishes: [
      { dish: "Burger", quantity: 1, unitaryPrice: 10 },
      { dish: "Fries", quantity: 3, unitaryPrice: 5 },
      { dish: "Coke", quantity: 1, unitaryPrice: 5 },
    ],
  },
  {
    orderId: 3,
    userEmail: "peter.pan@example.com",
    orderTotalPrice: 45,
    dishes: [
      { dish: "Pizza", quantity: 1, unitaryPrice: 15 },
      { dish: "Burger", quantity: 1, unitaryPrice: 10 },
      { dish: "Fries", quantity: 2, unitaryPrice: 5 },
      { dish: "Beer", quantity: 3, unitaryPrice: 5 },
    ],
  },
];

/**
 * Analyzes the orders data to calculate dish statistics.
 *
 * @param {Array} orders An array of order objects.
 * @param {number} [n] Optional. The number of least sold dishes to return.
 * @returns {object} An object containing dish statistics.
 */
function analyzeOrders(orders, n = 0) {
  const dishStats = {};
  if (n < 0) {
    return "Invalid least sold dishes, must be greater than 0";
  }
  if (typeof n !== "number") {
    return "Invalid least sold dishes, must be a number";
  }

  // Calculate total quantity and amount for each dish
  orders.forEach((order) => {
    order.dishes.forEach((dishItem) => {
      const { dish, quantity, unitaryPrice } = dishItem;
      if (!dishStats[dish]) {
        dishStats[dish] = {
          totalQuantity: 0,
          totalAmount: 0,
        };
      }
      dishStats[dish].totalQuantity += quantity;
      dishStats[dish].totalAmount += quantity * unitaryPrice;
    });
  });

  // N parameter validation, can't be less than available dishes
  if (n > Object.keys(dishStats).length) {
    return `Invalid least sold dishes, must be less than the available dishes: ${
      Object.keys(dishStats).length
    }`;
  }

  // Find the top N least sold dishes
  let leastSoldDishes = [];
  if (n) {
    const sortedDishes = Object.entries(dishStats).sort(
      ([, a], [, b]) => a.totalQuantity - b.totalQuantity
    );

    const leastSoldQuantity = sortedDishes[n - 1][1].totalQuantity;

    leastSoldDishes = sortedDishes
      .filter(([, dishData]) => dishData.totalQuantity <= leastSoldQuantity)
      .map(([dish]) => dish);
  }

  return {
    dishStats,
    leastSoldDishes,
  };
}

// Test Cases
console.log("All Data Analysis:", analyzeOrders(orders));
console.log("Top 2 Least Sold Dishes:", analyzeOrders(orders, 3));
console.log("Top 1 Least Sold Dish:", analyzeOrders(orders, 1));
console.log("Empty N parameter:", analyzeOrders(orders, ""));
