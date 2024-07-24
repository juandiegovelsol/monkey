function analyzeProductSales(productData) {
  const retailProducts = [];
  const wholesaleProducts = [];
  const warningProducts = [];

  for (const product of productData) {
    const retailProfit =
      (product.retailPrice - product.productionCost) *
      product.retailSoldQuantity;
    const wholesaleProfit =
      (product.wholesalePrice - product.productionCost) *
      product.wholesaleSoldQuantity;

    if (retailProfit >= wholesaleProfit) {
      retailProducts.push({ ...product, profit: retailProfit });
    } else {
      wholesaleProducts.push({ ...product, profit: wholesaleProfit });
    }

    if (
      (product.retailSoldQuantity * product.retailPrice) /
        (product.wholesaleSoldQuantity * product.wholesalePrice) <
        0.1 ||
      (product.wholesaleSoldQuantity * product.wholesalePrice) /
        (product.retailSoldQuantity * product.retailPrice) <
        0.1
    ) {
      warningProducts.push(product);
    }
  }

  retailProducts.sort((a, b) => b.profit - a.profit);
  wholesaleProducts.sort((a, b) => b.profit - a.profit);

  return { retailProducts, wholesaleProducts, warningProducts };
}

const productData = [
  {
    name: "Apples",
    productionCost: 0.5,
    retailPrice: 1.2,
    retailSoldQuantity: 500,
    wholesalePrice: 0.8,
    wholesaleSoldQuantity: 1000,
  },
  {
    name: "Bananas",
    productionCost: 0.3,
    retailPrice: 0.8,
    retailSoldQuantity: 800,
    wholesalePrice: 0.5,
    wholesaleSoldQuantity: 1200,
  },
  {
    name: "Carrots",
    productionCost: 0.2,
    retailPrice: 0.6,
    retailSoldQuantity: 200,
    wholesalePrice: 0.3,
    wholesaleSoldQuantity: 1800,
  },
  {
    name: "Dates",
    productionCost: 1.0,
    retailPrice: 2.5,
    retailSoldQuantity: 100,
    wholesalePrice: 1.5,
    wholesaleSoldQuantity: 15,
  }, // Warning
];

const result = analyzeProductSales(productData);
console.log("Retail Focus:", result.retailProducts);
console.log("Wholesale Focus:", result.wholesaleProducts);
console.log("Warning Products:", result.warningProducts);
