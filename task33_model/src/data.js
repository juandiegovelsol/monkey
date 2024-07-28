// src/data.js
const dishes = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    image: "/images/carbonara.jpg", // Replace with actual image paths
    shortDescription: "Classic creamy pasta with pancetta and egg yolk.",
    fullDescription: "...", // Add detailed description
    ingredients: [
      "Spaghetti",
      "Pancetta",
      "Egg Yolks",
      "Parmesan Cheese",
      "Black Pepper",
    ],
    reviews: [
      { rating: 5, comment: "Amazingly authentic!" },
      // ... more reviews
    ],
  },
  {
    id: 2,
    name: "Margherita Pizza",
    image: "/images/margherita.jpg",
    shortDescription:
      "Simple and delicious with tomato, mozzarella, and basil.",
    fullDescription: "...",
    ingredients: ["Pizza Dough", "Tomato Sauce", "Mozzarella Cheese", "Basil"],
    reviews: [
      // ... reviews
    ],
  },
  // ... more dishes
];

export default dishes;
