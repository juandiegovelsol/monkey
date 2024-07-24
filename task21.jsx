import React from "react";
import { Carousel } from "react-responsive-carousel";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./app.css";

const products = [
  {
    id: 1,
    name: "Product 1",
    description: "This is product 1",
    image: "https://via.placeholder.com/300",
    longDescription: "This is a long description of product 1",
    ingredients: "Ingredient 1, Ingredient 2, Ingredient 3",
    reviews: ["Review 1", "Review 2", "Review 3"],
  },
  {
    id: 2,
    name: "Product 2",
    description: "This is product 2",
    image: "https://via.placeholder.com/300",
    longDescription: "This is a long description of product 2",
    ingredients: "Ingredient 1, Ingredient 2, Ingredient 3",
    reviews: ["Review 1", "Review 2", "Review 3"],
  },
  {
    id: 3,
    name: "Product 3",
    description: "This is product 3",
    image: "https://via.placeholder.com/300",
    longDescription: "This is a long description of product 3",
    ingredients: "Ingredient 1, Ingredient 2, Ingredient 3",
    reviews: ["Review 1", "Review 2", "Review 3"],
  },
];

const ProductCarousel = () => {
  const product = products[0];
  return (
    <Carousel
      autoPlay={true}
      interval={5000}
      infiniteLoop={true}
      showArrows={true}
      showThumbs={false}
      showStatus={false}
    >
      <div key={product.id} className="product-slide">
        <img src={product.image} alt={product.name} />
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <Link to={`/product/${product.id}`} className="learn-more">
            Learn More
          </Link>
        </div>
      </div>
    </Carousel>
  );
};

const ProductPage = () => {
  const { id } = useParams();
  const product = products[id];
  return (
    <div className="product-page">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.longDescription}</p>
      <h2>Ingredients:</h2>
      <p>{product.ingredients}</p>
      <h2>Reviews:</h2>
      <ul>
        {product.reviews.map((review, index) => (
          <li key={index}>{review}</li>
        ))}
      </ul>
      <Link to={`/product/${id + 1}`} className="learn-more">
        Next profuct
      </Link>
      <Link to={""} className="learn-more">
        Return
      </Link>
      <Link to={`/product/${id - 1}`} className="learn-more">
        Next profuct
      </Link>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <h1>Beauty Products</h1>
              <ProductCarousel />
            </div>
          }
        />
        <Route path={"/product/id"} element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
