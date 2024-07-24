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
    orderTotalPrice: 50,
    dishes: [
      { dish: "Burger", quantity: 3, unitaryPrice: 10 },
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

function getDishesStatistics(orders, n) {
  const dishesSold = {};

  // Calculate total quantity and amount for each dish
  orders.forEach((order) => {
    order.dishes.forEach((dishItem) => {
      const { dish, quantity, unitaryPrice } = dishItem;
      if (dishesSold[dish]) {
        dishesSold[dish].totalQuantity += quantity;
        dishesSold[dish].totalAmount += quantity * unitaryPrice;
      } else {
        dishesSold[dish] = {
          totalQuantity: quantity,
          totalAmount: quantity * unitaryPrice,
        };
      }
    });
  });

  // Find the top N less sold dishes
  const lessSoldDishes = Object.entries(dishesSold)
    .sort((a, b) => a[1].totalQuantity - b[1].totalQuantity)
    .slice(0, n);

  // Find the top N less sold quantities
  let lessSoldQuantities = {};
  Object.entries(dishesSold).forEach((dish) => {
    lessSoldQuantities[dish[1].totalQuantity] = dish[1].totalQuantity;
  });
  const lessSoldQuantitiesArray = Object.keys(lessSoldQuantities).splice(0, n);

  // Handle the top N less sold dishes including repeated quantities
  const findItemsByQuantities = (items, quantities) => {
    return quantities.map((q) => {
      return Object.entries(items)
        .filter(([key, value]) => value.totalQuantity === +q)
        .map(([key, value]) => ({ [key]: value }));
    });
  };

  const result = findItemsByQuantities(dishesSold, lessSoldQuantitiesArray);
  return {
    dishesSold,
    result: n ? result.flat(1) : null,
  };
}

// Test Cases
console.log("All dishes statistics:", getDishesStatistics(orders));
console.log("Top 2 less sold dishes:", getDishesStatistics(orders, 2));
console.log("Top 1 less sold dish:", getDishesStatistics(orders, 1));
console.log("Empty N parameter:", getDishesStatistics(orders, ""));
