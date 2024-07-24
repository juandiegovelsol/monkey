function findLeastSoldAndProfitable(products) {
  if (products.length < 2) {
    return "Not enough products to compare.";
  }

  // Sort products by sold quantity (ascending)
  products.sort((a, b) => a.soldQuantity - b.soldQuantity);

  let leastSold = products.slice(0, 2);

  // Calculate earnings for each product
  products.forEach((product) => {
    product.earnings = product.soldQuantity * product.price;
  });

  // Sort products by earnings (ascending)
  products.sort((a, b) => a.earnings - b.earnings);

  let leastProfitable = products.slice(0, 2);

  // Combine and remove duplicates
  let result = [...new Set([...leastSold, ...leastProfitable])];

  return result;
}

// Example usage:
const productData = [
  {
    name: "Product A",
    availableQuantity: 10,
    soldQuantity: 2,
    price: 10,
    description: "Description A",
  },
  {
    name: "Product B",
    availableQuantity: 5,
    soldQuantity: 5,
    price: 20,
    description: "Description B",
  },
  {
    name: "Product C",
    availableQuantity: 15,
    soldQuantity: 1,
    price: 15,
    description: "Description C",
  },
  {
    name: "Product D",
    availableQuantity: 8,
    soldQuantity: 1,
    price: 25,
    description: "Description D",
  },
];

const recommendedProducts = findLeastSoldAndProfitable(productData);
console.log(recommendedProducts);
